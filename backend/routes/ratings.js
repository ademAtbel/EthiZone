const express = require('express');
const router = express.Router();
const Rating = require('../models/Rating');
const User = require('../models/User');

// POST A VERIFIED RATING (GUEST-FRIENDLY, REQUIRES VALIDATED NAME, EMAIL, AND PHONE)
router.post('/', async (req, res) => {
  try {
    const { targetId, rating, comment, name, email, phone } = req.body;

    if (!targetId || !rating || !comment || !name || !email || !phone) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Verify rating value
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }

    // Email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Please provide a valid email address' });
    }

    // Phone regex validation (basic verification)
    const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
    if (!phoneRegex.test(phone.replace(/\s+/g, ''))) {
      return res.status(400).json({ message: 'Please provide a valid phone number' });
    }

    // Check if target user exists
    const targetUser = await User.findById(targetId);
    if (!targetUser) {
      return res.status(404).json({ message: 'Target user/store not found' });
    }

    const newRating = new Rating({
      targetId,
      rating,
      comment,
      name,
      email,
      phone
    });

    const savedRating = await newRating.save();
    res.status(201).json(savedRating);
  } catch (error) {
    res.status(500).json({ message: 'Error submitting reference rating', error: error.message });
  }
});

// GET RATINGS FOR A TARGET PROVIDER
router.get('/target/:targetId', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = Math.min(parseInt(req.query.limit) || 10, 50);
    const skip = (page - 1) * limit;

    const totalRatings = await Rating.countDocuments({ targetId: req.params.targetId });

    const ratings = await Rating.find({ targetId: req.params.targetId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.setHeader('X-Total-Count', totalRatings);
    res.setHeader('X-Total-Pages', Math.ceil(totalRatings / limit));
    res.setHeader('X-Current-Page', page);
    res.setHeader('X-Limit', limit);

    res.json(ratings);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving ratings', error: error.message });
  }
});

module.exports = router;
