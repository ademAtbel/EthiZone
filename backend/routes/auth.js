const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const PendingUser = require('../models/PendingUser');
const { verifyToken } = require('../middleware/auth');
const { sendOtpEmail, sendRegistrationConfirmationEmail } = require('../utils/email');
const { validateEmail, validatePhone } = require('../utils/validation');

// REGISTER USER (Stores temporary PendingUser until 6-Digit Email Confirmation)
router.post('/register', async (req, res) => {
  try {
    const { username, email, password, phone, role, businessType, category, subCategory, storeName, description, address } = req.body;

    // Validate email
    const emailCheck = validateEmail(email);
    if (!emailCheck.valid) {
      return res.status(400).json({ message: emailCheck.reason });
    }

    // Validate phone number
    const phoneCheck = validatePhone(phone);
    if (!phoneCheck.valid) {
      return res.status(400).json({ message: phoneCheck.reason });
    }

    // Check if user is ALREADY registered in User collection
    const existingUser = await User.findOne({ email: email.toLowerCase().trim() });
    if (existingUser) {
      return res.status(400).json({ message: 'An account with this email address already exists.' });
    }

    // Clear any previous unconfirmed pending registration attempt for this email
    await PendingUser.deleteMany({ email: email.toLowerCase().trim() });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Generate 6-digit confirmation code (valid for 15 minutes)
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    const verificationExpires = new Date(Date.now() + 15 * 60 * 1000);

    // Save to temporary PendingUser collection (NOT registered in main User collection yet!)
    const pendingUser = new PendingUser({
      username,
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      phone,
      role: role || 'individual',
      verificationCode,
      verificationExpires,
      businessType: role === 'business' ? businessType : undefined,
      category: role === 'business' ? category : undefined,
      subCategory: role === 'business' ? subCategory : undefined,
      storeName: role === 'business' ? (storeName || username) : undefined,
      description: (role === 'business' || role === 'handyman') ? description : undefined,
      address: role === 'business' ? address : undefined
    });

    await pendingUser.save();

    // Send registration confirmation email
    sendRegistrationConfirmationEmail(pendingUser.email, verificationCode, pendingUser.username).catch(err => {
      console.error('Background confirmation email error:', err.message);
    });

    res.status(201).json({
      requiresVerification: true,
      message: 'Registration details received! A 6-digit confirmation code has been sent to your email address.',
      email: pendingUser.email
    });

  } catch (error) {
    res.status(500).json({ message: 'Server Error during registration', error: error.message });
  }
});

// VERIFY REGISTRATION CODE (CONFIRMS CODE -> CREATES MONGO DB USER -> ISSUES TOKEN)
router.post('/verify-registration', async (req, res) => {
  try {
    const { email, code } = req.body;

    if (!email || !code) {
      return res.status(400).json({ message: 'Email address and 6-digit verification code are required.' });
    }

    const cleanEmail = email.toLowerCase().trim();
    const pending = await PendingUser.findOne({ email: cleanEmail });

    if (!pending) {
      // Check if user is already verified and saved
      const existingUser = await User.findOne({ email: cleanEmail });
      if (existingUser && existingUser.isVerified) {
        const token = jwt.sign(
          { id: existingUser._id, role: existingUser.role, username: existingUser.username },
          process.env.JWT_SECRET || 'secretkey123',
          { expiresIn: '7d' }
        );
        return res.json({ message: 'Account is already verified.', token, user: existingUser });
      }
      return res.status(404).json({ message: 'Pending registration record not found or expired. Please register again.' });
    }

    // Check code and expiration
    if (!pending.verificationCode || pending.verificationCode !== code.toString().trim() || Date.now() > new Date(pending.verificationExpires).getTime()) {
      return res.status(400).json({ message: 'Invalid or expired confirmation code. Please request a new code.' });
    }

    // CODE IS CONFIRMED! NOW REGISTER USER IN MONGO DB!
    const newUser = new User({
      username: pending.username,
      email: pending.email,
      password: pending.password,
      phone: pending.phone,
      role: pending.role || 'individual',
      isVerified: true,
      emailVerified: true,
      phoneVerified: true,
      businessType: pending.businessType,
      category: pending.category,
      subCategory: pending.subCategory,
      storeName: pending.storeName,
      description: pending.description,
      address: pending.address,
      customNavbarLinks: []
    });

    await newUser.save();

    // Delete temporary pending registration record
    await PendingUser.deleteOne({ _id: pending._id });

    // Issue session JWT token
    const token = jwt.sign(
      { id: newUser._id, role: newUser.role, username: newUser.username },
      process.env.JWT_SECRET || 'secretkey123',
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Account verified and registered successfully! Welcome to EthiZone.',
      token,
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        phone: newUser.phone,
        role: newUser.role,
        isVerified: newUser.isVerified,
        businessType: newUser.businessType,
        category: newUser.category,
        subCategory: newUser.subCategory,
        storeName: newUser.storeName,
        description: newUser.description,
        address: newUser.address,
        socialLinks: newUser.socialLinks || [],
        storeLogo: newUser.storeLogo || '',
        storeImage: newUser.storeImage || '',
        isOnline: newUser.isOnline,
        verificationBadge: newUser.verificationBadge
      }
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error during verification', error: error.message });
  }
});

// RESEND CONFIRMATION CODE
router.post('/resend-verification', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: 'Email address is required.' });
    }

    const cleanEmail = email.toLowerCase().trim();
    const pending = await PendingUser.findOne({ email: cleanEmail });

    if (!pending) {
      const existingUser = await User.findOne({ email: cleanEmail });
      if (existingUser && existingUser.isVerified) {
        return res.status(400).json({ message: 'This account is already verified.' });
      }
      return res.status(404).json({ message: 'Pending registration record not found. Please register again.' });
    }

    // Generate new code and set 15 min expiry
    const newCode = Math.floor(100000 + Math.random() * 900000).toString();
    pending.verificationCode = newCode;
    pending.verificationExpires = new Date(Date.now() + 15 * 60 * 1000);
    await pending.save();

    // Send code
    sendRegistrationConfirmationEmail(pending.email, newCode, pending.username).catch(err => {
      console.error('Background confirmation resend error:', err.message);
    });

    res.json({ message: 'A new 6-digit confirmation code has been sent to your email address.' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error resending confirmation code', error: error.message });
  }
});

// LOGIN USER
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email address and password are required.' });
    }

    const cleanEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: cleanEmail }) || await User.findOne({ email: { $regex: new RegExp('^' + cleanEmail + '$', 'i') } });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    if (user.status === 'inactive') {
      return res.status(403).json({ message: 'Your account has been deactivated. Please contact support.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check account verification status (allow super_admin bypass)
    if (!user.isVerified && user.role !== 'super_admin') {
      return res.status(403).json({
        message: 'Account registration is pending email confirmation. Please enter your verification code.',
        requiresVerification: true,
        email: user.email
      });
    }

    // Create token
    const token = jwt.sign(
      { id: user._id, role: user.role, username: user.username },
      process.env.JWT_SECRET || 'secretkey123',
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        phone: user.phone,
        role: user.role,
        isVerified: user.isVerified,
        businessType: user.businessType,
        category: user.category,
        storeName: user.storeName,
        description: user.description,
        address: user.address,
        socialLinks: user.socialLinks || [],
        storeLogo: user.storeLogo || '',
        storeImage: user.storeImage || '',
        isOnline: user.isOnline,
        verificationBadge: user.verificationBadge
      }
    });

  } catch (error) {
    res.status(500).json({ message: 'Server Error during login', error: error.message });
  }
});

// REQUEST ONE-TIME PASSWORD (OTP)
router.post('/request-otp', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: 'Email address is required.' });
    }

    const cleanEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: cleanEmail }) || await User.findOne({ email: { $regex: new RegExp('^' + cleanEmail + '$', 'i') } });
    if (!user) {
      return res.status(404).json({ message: 'No account registered with this email address.' });
    }

    if (user.status === 'inactive') {
      return res.status(403).json({ message: 'Your account has been deactivated. Please contact support.' });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Set expiry to 60 seconds from now
    user.otpCode = otp;
    user.otpExpires = new Date(Date.now() + 60 * 1000); // 60 seconds
    await user.save();

    // Send the OTP email immediately in the background
    sendOtpEmail(user.email, otp).catch(err => console.error('Background email error:', err.message));

    res.json({ success: true, message: 'One-Time Login Code has been sent to your email.' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error requesting login code', error: error.message });
  }
});

// LOGIN WITH ONE-TIME PASSWORD (OTP)
router.post('/login-with-otp', async (req, res) => {
  try {
    const { email, code } = req.body;

    if (!email || !code) {
      return res.status(400).json({ message: 'Email and verification code are required.' });
    }

    const cleanEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: cleanEmail }) || await User.findOne({ email: { $regex: new RegExp('^' + cleanEmail + '$', 'i') } });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    if (user.status === 'inactive') {
      return res.status(403).json({ message: 'Your account has been deactivated. Please contact support.' });
    }

    // Check OTP and expiry
    if (!user.otpCode || user.otpCode !== code || Date.now() > user.otpExpires) {
      return res.status(400).json({ message: 'Invalid or expired one-time code. Codes expire in 60 seconds.' });
    }

    // Clear OTP fields
    user.otpCode = undefined;
    user.otpExpires = undefined;
    await user.save();

    // Create token
    const token = jwt.sign(
      { id: user._id, role: user.role, username: user.username },
      process.env.JWT_SECRET || 'secretkey123',
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        phone: user.phone,
        role: user.role,
        businessType: user.businessType,
        category: user.category,
        storeName: user.storeName,
        description: user.description,
        address: user.address,
        socialLinks: user.socialLinks || [],
        storeLogo: user.storeLogo || '',
        storeImage: user.storeImage || '',
        isOnline: user.isOnline,
        verificationBadge: user.verificationBadge
      }
    });

  } catch (error) {
    res.status(500).json({ message: 'Server Error during OTP login', error: error.message });
  }
});

// GET CURRENT USER PROFILE
router.get('/me', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server Error fetching user profile', error: error.message });
  }
});

// UPDATE CUSTOM NAVBAR LINKS (STORES/SERVICES ONLY)
router.patch('/update-navbar', verifyToken, async (req, res) => {
  try {
    const { customNavbarLinks } = req.body;

    if (!Array.isArray(customNavbarLinks)) {
      return res.status(400).json({ message: 'Navbar links must be an array' });
    }

    if (customNavbarLinks.length > 5) {
      return res.status(400).json({ message: 'Maximum 5 custom navigation links allowed' });
    }

    // Sanitize links and check schema integrity
    for (const link of customNavbarLinks) {
      if (!link.label || !link.url) {
        return res.status(400).json({ message: 'Each link must have a label and url' });
      }
    }

    const user = await User.findById(req.user.id);
    if (!user || user.role !== 'business') {
      return res.status(403).json({ message: 'Only store/service accounts can customize navbars' });
    }

    user.customNavbarLinks = customNavbarLinks;
    await user.save();

    res.json({ message: 'Navbar updated successfully', customNavbarLinks: user.customNavbarLinks });
  } catch (error) {
    res.status(500).json({ message: 'Error updating navbar links', error: error.message });
  }
});

// UPDATE STORE PROFILE DETAILS (STORES/SERVICES ONLY)
router.patch('/update-profile', verifyToken, async (req, res) => {
  try {
    const { storeName, description, shopStory, galleryPhotos, address, socialLinks, storeLogo, storeImage, businessType, category, workingDays, businessHours, attorneys } = req.body;

    const user = await User.findById(req.user.id);
    if (!user || user.role !== 'business') {
      return res.status(403).json({ message: 'Only store/service accounts can edit store details' });
    }

    if (storeName) user.storeName = storeName;
    if (description !== undefined) user.description = description;
    if (shopStory !== undefined) user.shopStory = shopStory;
    if (galleryPhotos !== undefined) {
      if (!Array.isArray(galleryPhotos)) {
        return res.status(400).json({ message: 'Gallery photos must be an array' });
      }
      user.galleryPhotos = galleryPhotos;
    }
    if (address !== undefined) user.address = address;
    if (storeLogo !== undefined) user.storeLogo = storeLogo;
    if (storeImage !== undefined) user.storeImage = storeImage;
    if (businessType) user.businessType = businessType;
    if (category) user.category = category;
    if (workingDays !== undefined) user.workingDays = workingDays;
    if (businessHours !== undefined) user.businessHours = businessHours;
    
    if (attorneys !== undefined) {
      if (!Array.isArray(attorneys)) {
        return res.status(400).json({ message: 'Attorneys must be an array' });
      }
      user.attorneys = attorneys;
    }
    
    if (socialLinks !== undefined) {
      if (!Array.isArray(socialLinks)) {
        return res.status(400).json({ message: 'Social links must be an array' });
      }
      if (socialLinks.length > 5) {
        return res.status(400).json({ message: 'Maximum 5 social links allowed' });
      }
      for (const link of socialLinks) {
        if (!link.platform || !link.url) {
          return res.status(400).json({ message: 'Each social link must have a platform and url' });
        }
      }
      user.socialLinks = socialLinks;
    }

    await user.save();

    res.json({ 
      message: 'Store profile updated successfully', 
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        phone: user.phone,
        role: user.role,
        businessType: user.businessType,
        category: user.category,
        storeName: user.storeName,
        description: user.description,
        shopStory: user.shopStory || '',
        galleryPhotos: user.galleryPhotos || [],
        address: user.address,
        socialLinks: user.socialLinks || [],
        storeLogo: user.storeLogo || '',
        storeImage: user.storeImage || '',
        workingDays: user.workingDays || 'Monday - Saturday',
        businessHours: user.businessHours || '09:00 AM - 07:00 PM',
        isOnline: user.isOnline,
        verificationBadge: user.verificationBadge,
        attorneys: user.attorneys || []
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating store details', error: error.message });
  }
});

// TOGGLE ONLINE AVAILABILITY (HANDYMAN ONLY)
router.patch('/toggle-online', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user || user.role !== 'handyman') {
      return res.status(403).json({ message: 'Only handyman profiles can toggle availability' });
    }

    user.isOnline = !user.isOnline;
    await user.save();

    res.json({ message: `Availability status updated`, isOnline: user.isOnline });
  } catch (error) {
    res.status(500).json({ message: 'Error updating availability', error: error.message });
  }
});

// CHANGE PASSWORD
router.patch('/change-password', verifyToken, async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({ message: 'Current and new password are required' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ message: 'New password must be at least 6 characters long' });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Incorrect current password' });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating password', error: error.message });
  }
});

// GET PUBLIC STORE PROFILE BY NAME (SLUG)
router.get('/store-profile/:storeName', async (req, res) => {
  try {
    const slug = req.params.storeName.toLowerCase().trim();
    
    // 1. Look up user by unique storeSlug directly (any role: business, individual, handyman, etc.)
    let store = await User.findOne({
      storeSlug: slug
    }).select('-password');

    // 2. Fallback: search by username slug if storeSlug doesn't match
    if (!store) {
      const cleanUsername = slug.replace(/-/g, ' ');
      store = await User.findOne({
        username: { $regex: new RegExp('^' + cleanUsername + '$', 'i') }
      }).select('-password');
    }

    // 3. Fallback: search by exact username regex (ignoring dashes)
    if (!store) {
      store = await User.findOne({
        username: { $regex: new RegExp('^' + slug.replace(/[^a-zA-Z0-9]/g, '') + '$', 'i') }
      }).select('-password');
    }

    // 4. Fallback: search by ObjectId if slug is a valid Mongo ID
    if (!store && mongoose.Types.ObjectId.isValid(slug)) {
      store = await User.findById(slug).select('-password');
    }

    if (!store) {
      return res.status(404).json({ message: 'Store profile not found' });
    }

    res.json(store);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching store profile', error: error.message });
  }
});

module.exports = router;
