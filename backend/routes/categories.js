const express = require('express');
const router = express.Router();
const Category = require('../models/Category');

// GET ALL CATEGORIES (Cached in Redis)
router.get('/', async (req, res) => {
  try {
    const redis = req.app.locals.redisClient;
    const type = req.query.type || 'all';
    const cacheKey = `categories:${type}`;

    if (redis && redis.isReady) {
      try {
        const cachedData = await redis.get(cacheKey);
        if (cachedData) {
          return res.json(JSON.parse(cachedData));
        }
      } catch (cacheErr) {
        console.warn('Failed to read categories cache:', cacheErr.message);
      }
    }

    let filter = {};
    if (req.query.type) {
      filter.type = req.query.type;
    }
    const categories = await Category.find(filter).sort({ name: 1 });

    if (redis && redis.isReady) {
      try {
        // Cache categories for 1 hour
        await redis.setEx(cacheKey, 3600, JSON.stringify(categories));
      } catch (cacheErr) {
        console.warn('Failed to write categories cache:', cacheErr.message);
      }
    }

    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving categories', error: error.message });
  }
});

module.exports = router;
