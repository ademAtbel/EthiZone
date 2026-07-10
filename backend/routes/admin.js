const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Listing = require('../models/Listing');
const Rating = require('../models/Rating');
const Category = require('../models/Category');
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
    
    // Role breakdown
    const individualCount = await User.countDocuments({ role: 'individual' });
    const handymanCount = await User.countDocuments({ role: 'handyman' });
    const storeCount = await User.countDocuments({ role: 'business' });

    res.json({
      totalUsers,
      totalListings,
      totalCategories,
      totalRatings,
      roles: {
        individual: individualCount,
        handyman: handymanCount,
        store: storeCount
      }
    });
  } catch (error) {
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

// BAN / DELETE A USER (CLEANS UP ALL ASSOCIATED LISTINGS & REVIEWS)
router.delete('/users/:id', verifySuperAdmin, async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.role === 'super_admin') {
      return res.status(400).json({ message: 'Cannot delete the Super Admin' });
    }

    // Delete user
    await User.findByIdAndDelete(userId);
    
    // Clean up listings
    await Listing.deleteMany({ ownerId: userId });
    
    // Clean up reviews made for them
    await Rating.deleteMany({ targetId: userId });

    res.json({ message: 'User and all associated listings and ratings removed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error: error.message });
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
    res.status(500).json({ message: 'Error fetching listings', error: error.message });
  }
});

module.exports = router;
