const express = require('express');
const router = express.Router();
const ContactInquiry = require('../models/ContactInquiry');

router.post('/', async (req, res) => {
  try {
    const { fullName, email, phone, topic, message, attachmentUrl } = req.body;
    
    if (!fullName || !email || !topic || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please provide full name, email, topic, and message.',
      });
    }

    const inquiry = await ContactInquiry.create({
      fullName,
      email,
      phone,
      topic,
      message,
      attachmentUrl,
    });

    return res.status(201).json({
      success: true,
      message: 'Your inquiry has been submitted successfully!',
      data: inquiry,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to submit inquiry. Please try again later.',
      error: error.message,
    });
  }
});

module.exports = router;
