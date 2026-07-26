const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Inquiry = require('../models/Inquiry');
const User = require('../models/User');
const { verifyToken } = require('../middleware/auth');
const { validateEmail, validatePhone } = require('../utils/validation');
const { sendOtpEmail } = require('../utils/email');

// In-memory OTP storage for guest inquiries
const otpStore = new Map();

// SEND OTP FOR INQUIRY EMAIL VERIFICATION
router.post('/send-otp', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: 'Email address is required' });
    }

    const emailCheck = validateEmail(email);
    if (!emailCheck.valid) {
      return res.status(400).json({ message: emailCheck.reason });
    }

    // Generate 6-digit OTP
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore.set(email.toLowerCase().trim(), {
      code,
      expires: Date.now() + 5 * 60 * 1000 // Valid for 5 minutes
    });

    await sendOtpEmail(email, code);

    res.json({ message: 'Verification code sent to your email!' });
  } catch (error) {
    console.error('Error sending OTP for inquiry:', error);
    res.status(500).json({ message: 'Error sending verification code', error: error.message });
  }
});

// CREATE INQUIRY (GUEST SUBMISSION)
router.post('/', async (req, res) => {
  try {
    const { businessId, customerName, customerEmail, customerPhone, businessType, details, otpCode } = req.body;

    if (!businessId || !customerName || !customerEmail || !customerPhone || !businessType || !otpCode) {
      return res.status(400).json({ message: 'Please provide all details, including email verification code.' });
    }

    // Validate customer email
    const emailCheck = validateEmail(customerEmail);
    if (!emailCheck.valid) {
      return res.status(400).json({ message: emailCheck.reason });
    }

    // Verify OTP code
    const storedOtp = otpStore.get(customerEmail.toLowerCase().trim());
    if (!storedOtp || storedOtp.code !== otpCode.toString().trim() || Date.now() > storedOtp.expires) {
      return res.status(400).json({ message: 'Invalid or expired email verification code. Please request a new one.' });
    }

    // Clear OTP code once verified successfully
    otpStore.delete(customerEmail.toLowerCase().trim());

    // Validate customer phone
    const phoneCheck = validatePhone(customerPhone);
    if (!phoneCheck.valid) {
      return res.status(400).json({ message: phoneCheck.reason });
    }

    const businessOwner = await User.findById(businessId);
    if (!businessOwner) {
      return res.status(404).json({ message: 'Business not found' });
    }

    const newInquiry = new Inquiry({
      businessId,
      customerName,
      customerEmail,
      customerPhone,
      businessType,
      details
    });

    await newInquiry.save();

    // -----------------------------------------------------------------
    // SIMULATED EMAIL & SMS SENDER (LOGGED TO TERMINAL AND API RESPONSE)
    // -----------------------------------------------------------------
    const businessName = businessOwner.storeName || businessOwner.username;
    const simulatedLogs = [];

    // Formulate details string for notifications
    let detailSummary = '';
    if (businessType === 'pharmacy') {
      detailSummary = `Prescription File Uploaded: ${details.fileName || 'Attachment'}`;
    } else if (businessType === 'law') {
      detailSummary = `Consultation scheduled on ${details.date} at ${details.time} regarding "${details.topic}"`;
    } else if (businessType === 'tax') {
      detailSummary = `Tax Filing prep for Tax Year ${details.taxYear || 'Current'}. Note: "${details.note || 'None'}"`;
    } else if (businessType === 'boutique') {
      detailSummary = `Item inquiry: "${details.itemTitle}" (Size: ${details.size || 'N/A'}, Color: ${details.color || 'N/A'})`;
    } else if (businessType === 'liquor') {
      detailSummary = `Liquor pickup pre-order: "${details.orderNotes || 'Catalog items'}"`;
    } else if (businessType === 'grocery') {
      detailSummary = `Grocery order (${details.groceryServiceType === 'delivery' ? 'Home Delivery' : 'In-Store Pickup'}): "${details.groceryItems}". Notes: "${details.groceryNotes || 'None'}". Preferred Time: ${details.groceryTime}`;
    } else {
      detailSummary = `General Inquiry: "${details.message || 'No additional details'}"`;
    }

    // 1. Email to Customer
    const emailCustomerText = `
    ========================================================================
    📧 EMAIL OUTBOX [TO CUSTOMER]
    Recipient: ${customerEmail}
    Subject: Inquiry Confirmation - ${businessName}
    Body:
      Hi ${customerName},
      Your request has been successfully submitted to ${businessName}.
      
      Details of your request:
      - Category Type: ${businessType.toUpperCase()}
      - Request Info: ${detailSummary}
      
      The business owner will review your submission and contact you shortly.
      Thank you for using our direct-connect platform!
    ========================================================================`;
    console.log(emailCustomerText);
    simulatedLogs.push({ type: 'email', recipient: 'customer', text: emailCustomerText });

    // 2. Email to Business Owner
    const emailOwnerText = `
    ========================================================================
    📧 EMAIL OUTBOX [TO BUSINESS OWNER]
    Recipient: ${businessOwner.email}
    Subject: 🔔 New Customer Request Received!
    Body:
      Hello ${businessName},
      You have received a new inquiry from a customer:
      
      Customer Details:
      - Name: ${customerName}
      - Email: ${customerEmail}
      - Phone: ${customerPhone}
      
      Request Details:
      - Category Type: ${businessType.toUpperCase()}
      - Request Info: ${detailSummary}
      
      Log in to your Dashboard to view and manage this request.
    ========================================================================`;
    console.log(emailOwnerText);
    simulatedLogs.push({ type: 'email', recipient: 'owner', text: emailOwnerText });

    // 3. SMS to Customer
    const smsCustomerText = `
    ========================================================================
    💬 SMS OUTBOX [TO CUSTOMER]
    Recipient Phone: ${customerPhone}
    Message: Hi ${customerName}, your request to ${businessName} has been received! Detail: ${detailSummary}. We will get back to you soon.
    ========================================================================`;
    console.log(smsCustomerText);
    simulatedLogs.push({ type: 'sms', recipient: 'customer', text: smsCustomerText });

    // 4. SMS to Business Owner
    const smsOwnerText = `
    ========================================================================
    💬 SMS OUTBOX [TO BUSINESS OWNER]
    Recipient Phone: ${businessOwner.phone}
    Message: Alert! New customer request from ${customerName} (${customerPhone}). Category: ${businessType.toUpperCase()}. Info: ${detailSummary}.
    ========================================================================`;
    console.log(smsOwnerText);
    simulatedLogs.push({ type: 'sms', recipient: 'owner', text: smsOwnerText });

    res.status(201).json({
      message: 'Inquiry submitted successfully, and notifications sent!',
      inquiry: newInquiry,
      simulatedLogs
    });

  } catch (error) {
    console.error('Error creating inquiry:', error);
    res.status(500).json({ message: 'Error processing inquiry', error: error.message });
  }
});

// GET OWNER INQUIRIES (OWNER ACCESS ONLY)
router.get('/', verifyToken, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = Math.min(parseInt(req.query.limit) || 10, 50);
    const skip = (page - 1) * limit;

    const totalInquiries = await Inquiry.countDocuments({ businessId: req.user.id });

    const inquiries = await Inquiry.find({ businessId: req.user.id })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.setHeader('X-Total-Count', totalInquiries);
    res.setHeader('X-Total-Pages', Math.ceil(totalInquiries / limit));
    res.setHeader('X-Current-Page', page);
    res.setHeader('X-Limit', limit);

    res.json(inquiries);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching inquiries', error: error.message });
  }
});

// UPDATE INQUIRY STATUS (OWNER/ADMIN ONLY)
router.put('/:id/status', verifyToken, async (req, res) => {
  try {
    const { status } = req.body;
    let inquiry = await Inquiry.findById(req.params.id);

    if (!inquiry) {
      return res.status(404).json({ message: 'Inquiry not found' });
    }

    if (inquiry.businessId.toString() !== req.user.id && req.user.role !== 'super_admin') {
      return res.status(403).json({ message: 'Unauthorized action' });
    }

    inquiry.status = status || inquiry.status;
    const updatedInquiry = await inquiry.save();
    res.json(updatedInquiry);
  } catch (error) {
    res.status(500).json({ message: 'Error updating inquiry status', error: error.message });
  }
});

module.exports = router;
