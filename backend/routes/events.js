const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const User = require('../models/User');
const { verifyToken } = require('../middleware/auth');

// GET ALL EVENTS
router.get('/', async (req, res) => {
  try {
    const { query, category, location, ownerId } = req.query;
    let filter = {};

    if (query) {
      filter.$or = [
        { title: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
        { location: { $regex: query, $options: 'i' } }
      ];
    }

    if (category && category !== 'All') {
      filter.category = category;
    }

    if (location) {
      filter.location = { $regex: location, $options: 'i' };
    }

    if (ownerId) {
      filter.ownerId = ownerId;
    }

    // Sort by eventDate ascending (upcoming events first)
    const events = await Event.find(filter).sort({ createdAt: -1 });
    res.json(Array.isArray(events) ? events : []);
  } catch (err) {
    console.error('Error fetching events:', err);
    res.json([]);
  }
});

// CREATE NEW EVENT
router.post('/', verifyToken, async (req, res) => {
  try {
    const { title, description, category, subCategory, eventDate, eventTime, location, address, price, images } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Validate images count
    if (images && images.length > 5) {
      return res.status(400).json({ message: 'Maximum 5 images allowed per event.' });
    }

    const newEvent = new Event({
      ownerId: req.user.id,
      ownerName: user.storeName || user.username,
      ownerPhone: user.phone,
      ownerEmail: user.email,
      title,
      description,
      category,
      subCategory,
      eventDate: new Date(eventDate),
      eventTime,
      location,
      address,
      price: price ? parseFloat(price) : 0,
      images: images || []
    });

    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (err) {
    res.status(550).json({ message: err.message || 'Error creating event' });
  }
});

// UPDATE EVENT
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check ownership or superadmin privileges
    if (event.ownerId.toString() !== req.user.id && req.user.role !== 'super_admin') {
      return res.status(403).json({ message: 'Not authorized to edit this event' });
    }

    const { title, description, category, subCategory, eventDate, eventTime, location, address, price, images } = req.body;

    event.title = title || event.title;
    event.description = description || event.description;
    event.category = category || event.category;
    event.subCategory = subCategory !== undefined ? subCategory : event.subCategory;
    if (eventDate) event.eventDate = new Date(eventDate);
    event.eventTime = eventTime || event.eventTime;
    event.location = location || event.location;
    event.address = address !== undefined ? address : event.address;
    if (price !== undefined) event.price = parseFloat(price);
    if (images) event.images = images;

    const updatedEvent = await event.save();
    res.json(updatedEvent);
  } catch (err) {
    res.status(500).json({ message: err.message || 'Error updating event' });
  }
});

// DELETE EVENT
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check ownership or superadmin privileges
    if (event.ownerId.toString() !== req.user.id && req.user.role !== 'super_admin') {
      return res.status(403).json({ message: 'Not authorized to delete this event' });
    }

    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: 'Event deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message || 'Error deleting event' });
  }
});

module.exports = router;
