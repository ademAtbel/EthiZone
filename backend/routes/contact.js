const express = require('express');
const router = express.Router();
const ContactInquiry = require('../models/ContactInquiry');
const { validateEmail, validatePhone } = require('../utils/validation');

router.post('/', async (req, res) => {
  try {
    const { fullName, email, phone, topic, message, attachmentUrl } = req.body;
    
    if (!fullName || !email || !topic || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please provide full name, email, topic, and message.',
      });
    }

    // Validate email
    const emailCheck = validateEmail(email);
    if (!emailCheck.valid) {
      return res.status(400).json({
        success: false,
        message: emailCheck.reason,
      });
    }

    // Validate phone if provided
    if (phone) {
      const phoneCheck = validatePhone(phone);
      if (!phoneCheck.valid) {
        return res.status(400).json({
          success: false,
          message: phoneCheck.reason,
        });
      }
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
