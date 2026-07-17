const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Listing = require('../models/Listing');
const User = require('../models/User');
const { verifyToken } = require('../middleware/auth');

// CREATE LISTING
router.post('/', verifyToken, async (req, res) => {
  try {
    const { title, description, price, type, category, metadata, images } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Verify correct type mapping for non-stores
    if (user.role === 'individual' && type !== 'personal_item' && type !== 'job_opening') {
      return res.status(400).json({ message: 'Individuals can only post personal items or job openings' });
    }
    if (user.role === 'handyman' && type !== 'handyman_skill') {
      return res.status(400).json({ message: 'Handymen can only post handyman skills' });
    }

    // Verify correct type mapping for businesses based on businessType
    if (user.role === 'business') {
      if (user.businessType === 'store' && type !== 'store_product') {
        return res.status(400).json({ message: 'Stores can only post store products' });
      }
      if (user.businessType === 'service' && type !== 'service') {
        return res.status(400).json({ message: 'Services can only post service offerings' });
      }
      if (user.businessType === 'organization' && type !== 'job_opening') {
        return res.status(400).json({ message: 'Organizations can only post job openings (hiring only)' });
      }
      if (user.businessType === 'real_estate' && type !== 'house') {
        return res.status(400).json({ message: 'Real estate agencies can only post houses' });
      }
      if (user.businessType === 'automotive' && type !== 'car') {
        return res.status(400).json({ message: 'Automotive businesses can only post cars' });
      }
    }

    // Validate images count
    if (images && images.length > 5) {
      return res.status(400).json({ message: 'Maximum 5 images allowed per listing.' });
    }

    const newListing = new Listing({
      ownerId: user._id,
      ownerName: user.username,
      ownerPhone: user.phone,
      title,
      description,
      price: (price !== undefined && price !== null && price !== '') ? price : null,
      type,
      category: (['store_product', 'service', 'job_opening', 'house', 'car'].includes(type) && user.role === 'business') ? user.category : (category || 'Other'),
      metadata,
      images: images || []
    });

    const savedListing = await newListing.save();
    res.status(201).json(savedListing);
  } catch (error) {
    res.status(500).json({ message: 'Error creating listing', error: error.message });
  }
});

// GET ALL LISTINGS & SEARCH
router.get('/', async (req, res) => {
  try {
    const { query, type, category, status, ownerId } = req.query;

    let filter = {};

    if (ownerId) {
      if (mongoose.Types.ObjectId.isValid(ownerId)) {
        filter.ownerId = ownerId;
      } else {
        return res.status(400).json({ message: 'Invalid ownerId format' });
      }
    }

    if (type) {
      filter.type = type;
    }

    if (category) {
      filter.category = category;
    }

    if (status && status !== 'all') {
      filter.status = status;
    } else if (!status) {
      filter.status = 'active'; // Default to active listings
    }

    // Text search query
    if (query) {
      filter.$text = { $search: query };
    }

    // Support pagination parameters
    const page = parseInt(req.query.page) || 1;
    const limit = Math.min(parseInt(req.query.limit) || 20, 100);
    const skip = (page - 1) * limit;

    const totalListings = await Listing.countDocuments(filter);

    // Fetch and populate owner details with pagination
    const listings = await Listing.find(filter)
      .populate('ownerId', 'username email phone role storeName category verificationBadge isOnline address')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.setHeader('X-Total-Count', totalListings);
    res.setHeader('X-Total-Pages', Math.ceil(totalListings / limit));
    res.setHeader('X-Current-Page', page);
    res.setHeader('X-Limit', limit);

    res.json(listings);
  } catch (error) {
    console.error('Error in GET /api/listings:', error);
    res.status(500).json({ message: 'Error retrieving listings', error: error.message });
  }
});

// GET SINGLE LISTING BY ID
router.get('/:id', async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id)
      .populate('ownerId', 'username email phone role storeName category verificationBadge isOnline address');
    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }
    res.json(listing);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving listing', error: error.message });
  }
});

// UPDATE LISTING
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const { title, description, price, status, category, metadata, images } = req.body;
    let listing = await Listing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    // Check ownership or super admin
    if (listing.ownerId.toString() !== req.user.id && req.user.role !== 'super_admin') {
      return res.status(403).json({ message: 'Unauthorized action' });
    }

    // Validate images count
    if (images && images.length > 5) {
      return res.status(400).json({ message: 'Maximum 5 images allowed per listing.' });
    }

    listing.title = title || listing.title;
    listing.description = description || listing.description;
    listing.price = (price !== undefined && price !== null && price !== '') ? price : null;
    listing.status = status || listing.status;
    listing.category = category !== undefined ? category : listing.category;
    listing.metadata = metadata || listing.metadata;
    if (images) {
      listing.images = images;
    }

    const updatedListing = await listing.save();
    res.json(updatedListing);
  } catch (error) {
    res.status(500).json({ message: 'Error updating listing', error: error.message });
  }
});

// UPDATE LISTING STATUS
router.patch('/:id/status', verifyToken, async (req, res) => {
  try {
    const { status } = req.body;
    if (!['active', 'sold', 'busy', 'inactive'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    // Check ownership or super admin
    if (listing.ownerId.toString() !== req.user.id && req.user.role !== 'super_admin') {
      return res.status(403).json({ message: 'Unauthorized action' });
    }

    listing.status = status;
    const updatedListing = await listing.save();
    res.json(updatedListing);
  } catch (error) {
    res.status(500).json({ message: 'Error updating listing status', error: error.message });
  }
});

// DELETE LISTING
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    // Check ownership or super admin
    if (listing.ownerId.toString() !== req.user.id && req.user.role !== 'super_admin') {
      return res.status(403).json({ message: 'Unauthorized action' });
    }

    await Listing.findByIdAndDelete(req.params.id);
    res.json({ message: 'Listing deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting listing', error: error.message });
  }
});

module.exports = router;
