const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Listing = require('../models/Listing');
const Rating = require('../models/Rating');
const Category = require('../models/Category');
const Event = require('../models/Event');
const { verifySuperAdmin } = require('../middleware/auth');

// Helper to clear categories cache in Redis
const clearCategoriesCache = async (req) => {
  const redis = req.app.locals.redisClient;
  if (redis && redis.isReady) {
    try {
      const keys = await redis.keys('categories:*');
      if (keys.length > 0) {
        await redis.del(keys);
        console.log(`Cleared ${keys.length} categories cache keys from Redis`);
      }
    } catch (err) {
      console.warn('Failed to clear categories cache:', err.message);
    }
  }
};

// GET PLATFORM STATISTICS
router.get('/stats', verifySuperAdmin, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalListings = await Listing.countDocuments();
    const totalCategories = await Category.countDocuments();
    const totalRatings = await Rating.countDocuments();
    const totalEvents = await Event.countDocuments();
    
    // Role breakdown
    const individualCount = await User.countDocuments({ role: 'individual' });
    const handymanCount = await User.countDocuments({ role: 'handyman' });
    const storeCount = await User.countDocuments({ role: 'business' });

    res.json({
      totalUsers,
      totalListings,
      totalCategories,
      totalRatings,
      totalEvents,
      roles: {
        individual: individualCount,
        handyman: handymanCount,
        store: storeCount
      }
    });
  } catch (error) {
    console.error('[STATS]', error.stack);
    res.status(500).json({ message: 'Error fetching admin stats', error: error.message });
  }
});

// GET ALL USERS FOR MANAGEMENT
router.get('/users', verifySuperAdmin, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = Math.min(parseInt(req.query.limit) || 20, 100);
    const skip = (page - 1) * limit;

    const totalUsers = await User.countDocuments();
    const users = await User.find()
      .select('-password')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.setHeader('X-Total-Count', totalUsers);
    res.setHeader('X-Total-Pages', Math.ceil(totalUsers / limit));
    res.setHeader('X-Current-Page', page);
    res.setHeader('X-Limit', limit);

    res.json(users);
  } catch (error) {
    console.error('[USERS]', error.stack);
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
});

// TOGGLE VERIFICATION BADGE FOR HANDYMAN OR STORE
router.patch('/users/:id/verify', verifySuperAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    user.verificationBadge = !user.verificationBadge;
    await user.save();
    
    res.json({ message: `Verification status updated to ${user.verificationBadge}`, user });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user verification', error: error.message });
  }
});

// TOGGLE USER STATUS (ACTIVATE / DEACTIVATE)
router.patch('/users/:id/toggle-status', verifySuperAdmin, async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.role === 'super_admin') {
      return res.status(400).json({ message: 'Cannot deactivate the Super Admin' });
    }

    // Toggle status
    user.status = user.status === 'inactive' ? 'active' : 'inactive';
    await user.save();
    
    // If deactivated, we could optionally hide their listings, but for now we just prevent login.

    res.json({ message: `User successfully ${user.status === 'active' ? 'activated' : 'deactivated'}`, user });
  } catch (error) {
    res.status(500).json({ message: 'Error toggling user status', error: error.message });
  }
});

// CREATE A PLATFORM CATEGORY
router.post('/categories', verifySuperAdmin, async (req, res) => {
  try {
    const { name, description, type } = req.body;
    if (!name) {
      return res.status(400).json({ message: 'Category name is required' });
    }
    if (!type) {
      return res.status(400).json({ message: 'Category type classification is required' });
    }

    const categoryExists = await Category.findOne({ name });
    if (categoryExists) {
      return res.status(400).json({ message: 'Category already exists' });
    }

    const newCategory = new Category({ name, description, type });
    await newCategory.save();
    await clearCategoriesCache(req);
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ message: 'Error creating category', error: error.message });
  }
});

// UPDATE A PLATFORM CATEGORY
router.put('/categories/:id', verifySuperAdmin, async (req, res) => {
  try {
    const { name, description, type } = req.body;
    let category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    if (name) {
      const nameConflict = await Category.findOne({ name, _id: { $ne: req.params.id } });
      if (nameConflict) {
        return res.status(400).json({ message: 'A category with this name already exists' });
      }
      category.name = name;
    }
    
    if (description !== undefined) category.description = description;
    if (type) category.type = type;

    await category.save();
    await clearCategoriesCache(req);
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: 'Error updating category', error: error.message });
  }
});

// DELETE A PLATFORM CATEGORY
router.delete('/categories/:id', verifySuperAdmin, async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    await clearCategoriesCache(req);
    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting category', error: error.message });
  }
});

// GET ALL LISTINGS FOR MODERATION
router.get('/listings', verifySuperAdmin, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = Math.min(parseInt(req.query.limit) || 20, 100);
    const skip = (page - 1) * limit;

    const totalListings = await Listing.countDocuments();
    const listings = await Listing.find()
      .populate('ownerId', 'username email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.setHeader('X-Total-Count', totalListings);
    res.setHeader('X-Total-Pages', Math.ceil(totalListings / limit));
    res.setHeader('X-Current-Page', page);
    res.setHeader('X-Limit', limit);

    res.json(listings);
  } catch (error) {
    console.error('[LISTINGS]', error.stack);
    res.status(500).json({ message: 'Error fetching listings', error: error.message });
  }
});

// SUPER ADMIN DIRECT CREATION: STORE / SERVICE PROVIDER / USER
router.post('/create-user', verifySuperAdmin, async (req, res) => {
  try {
    const { username, email, password, phone, role, storeName, businessType, category, description, address, verificationBadge } = req.body;
    
    if (!username || !email || !password || !phone) {
      return res.status(400).json({ message: 'Username, email, password, and phone are required.' });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'User with this email already exists.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      phone,
      role: role || 'business',
      storeName: storeName || username,
      businessType: businessType || 'store',
      category: category || 'General',
      description: description || '',
      address: address || '',
      verificationBadge: Boolean(verificationBadge),
      isVerified: true,
      emailVerified: true,
      phoneVerified: true,
      isOnline: true
    });

    await newUser.save();
    res.status(201).json({ message: 'Entity created successfully', user: newUser });
  } catch (error) {
    console.error('[CREATE_USER_ADMIN]', error.stack);
    res.status(500).json({ message: 'Error creating user/store', error: error.message });
  }
});

// SUPER ADMIN DIRECT CREATION: EVENT
router.post('/create-event', verifySuperAdmin, async (req, res) => {
  try {
    const { 
      title, description, category, subCategory, eventDate, eventTime, 
      location, address, price, images, 
      organizerName, organizerPhone, organizerEmail 
    } = req.body;
    
    if (!title || !category || !eventDate || !eventTime || !location) {
      return res.status(400).json({ message: 'Title, category, date, time, and location are required.' });
    }

    if (!organizerPhone) {
      return res.status(400).json({ message: 'Organizer Phone Number is required.' });
    }

    const cleanPhone = organizerPhone.trim();
    const cleanEmail = (organizerEmail || '').toLowerCase().trim();
    const cleanName = (organizerName || '').trim();

    // Check if user exists by phone or email or automatically create a NEW user in the database
    let eventUser = null;
    if (cleanEmail) {
      eventUser = await User.findOne({ email: cleanEmail });
    }
    if (!eventUser && cleanPhone) {
      eventUser = await User.findOne({ phone: cleanPhone });
    }

    if (!eventUser) {
      const generatedEmail = cleanEmail || `event_${cleanPhone.replace(/\D/g, '') || Date.now()}@ethizone.com`;
      const generatedUsername = cleanName || `Organizer_${cleanPhone.slice(-4)}`;
      const hashedPassword = await bcrypt.hash('Ethizone@Ethiopia.2019', 10);

      eventUser = new User({
        username: generatedUsername,
        email: generatedEmail,
        password: hashedPassword,
        phone: cleanPhone,
        role: 'organization',
        businessType: 'organization',
        category: category || 'Entertainment',
        isVerified: true,
        verificationBadge: true
      });
      await eventUser.save();
    }

    const newEvent = new Event({
      ownerId: eventUser._id,
      ownerName: cleanName || eventUser.username,
      ownerPhone: cleanPhone || eventUser.phone,
      ownerEmail: cleanEmail || eventUser.email,
      organizerName: cleanName || eventUser.username,
      organizerPhone: cleanPhone || eventUser.phone,
      organizerEmail: cleanEmail || eventUser.email,
      title,
      description: description || title,
      category,
      subCategory: subCategory || '',
      eventDate: new Date(eventDate),
      eventTime,
      location,
      address: address || location,
      price: price ? Number(price) : 0,
      images: images && Array.isArray(images) ? images : (images ? [images] : [])
    });

    await newEvent.save();
    res.status(201).json({ message: 'Event published successfully', event: newEvent, user: eventUser });
  } catch (error) {
    console.error('[CREATE_EVENT_ADMIN]', error.stack);
    res.status(500).json({ message: 'Error creating event', error: error.message });
  }
});

// SUPER ADMIN DIRECT CREATION: MARKETPLACE LISTING / ITEM / SERVICE
router.post('/create-listing', verifySuperAdmin, async (req, res) => {
  try {
    const { title, description, type, category, price, images, isOnSale, salePrice, metadata } = req.body;
    
    if (!title || !type) {
      return res.status(400).json({ message: 'Title and type are required.' });
    }

    const adminUser = await User.findById(req.user.id || req.user._id) || await User.findOne({ role: 'super_admin' });
    const ownerId = adminUser ? adminUser._id : (req.user.id || req.user._id);

    const newListing = new Listing({
      ownerId,
      ownerName: adminUser ? adminUser.username : (req.user.username || 'Super Admin'),
      ownerPhone: adminUser ? adminUser.phone : '5713429228',
      title,
      description: description || title,
      type: type || 'store_product',
      category: category || 'General',
      price: price ? Number(price) : 0,
      images: images && Array.isArray(images) ? images : (images ? [images] : []),
      isOnSale: Boolean(isOnSale),
      salePrice: salePrice ? Number(salePrice) : undefined,
      metadata: metadata || {}
    });

    await newListing.save();
    res.status(201).json({ message: 'Listing created successfully', listing: newListing });
  } catch (error) {
    console.error('[CREATE_LISTING_ADMIN]', error.stack);
    res.status(500).json({ message: 'Error creating listing', error: error.message });
  }
});

// GET ALL EVENTS FOR SUPER ADMIN
router.get('/events', verifySuperAdmin, async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    res.json(events);
  } catch (error) {
    console.error('[GET_EVENTS_ADMIN]', error.stack);
    res.status(500).json({ message: 'Error fetching events', error: error.message });
  }
});

// DELETE AN EVENT FOR SUPER ADMIN
router.delete('/events/:id', verifySuperAdmin, async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting event', error: error.message });
  }
});

module.exports = router;
