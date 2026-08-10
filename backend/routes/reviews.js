const express = require('express');
const router = express.Router();
const Review = require('../models/Review');

// GET ALL REVIEWS
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving reviews', error: error.message });
  }
});

// POST A NEW REVIEW
router.post('/', async (req, res) => {
  try {
    const { productName, name, email, phone, country, rating, review, storeName } = req.body;

    if (!productName || !name || !email || !rating || !review) {
      return res.status(400).json({ message: 'Product Name, Your Name, Email, Rating score, and Review text are required.' });
    }

    const numericRating = Number(rating);
    if (isNaN(numericRating) || numericRating < 1 || numericRating > 5) {
      return res.status(400).json({ message: 'Rating score must be between 1 and 5.' });
    }

    const newReview = new Review({
      productName,
      name,
      email: email.toLowerCase().trim(),
      phone: phone || '',
      country: country || 'Ethiopia',
      rating: numericRating,
      review,
      storeName: storeName || '',
      verified: true
    });

    const savedReview = await newReview.save();
    res.status(201).json(savedReview);
  } catch (error) {
    res.status(500).json({ message: 'Error submitting review', error: error.message });
  }
});

// DELETE A REVIEW
router.delete('/:id', async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting review', error: error.message });
  }
});

module.exports = router;
