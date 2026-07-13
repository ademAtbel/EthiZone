const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { verifyToken } = require('../middleware/auth');

// REGISTER USER
router.post('/register', async (req, res) => {
  try {
    const { username, email, password, phone, role, businessType, category, storeName, description, address } = req.body;

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    user = new User({
      username,
      email,
      password: hashedPassword,
      phone,
      role,
      businessType: role === 'business' ? businessType : undefined,
      category: role === 'business' ? category : undefined,
      storeName: role === 'business' ? storeName : undefined,
      description: (role === 'business' || role === 'handyman') ? description : undefined,
      address: role === 'business' ? address : undefined,
      customNavbarLinks: []
    });

    await user.save();

    // Create token
    const token = jwt.sign(
      { id: user._id, role: user.role, username: user.username },
      process.env.JWT_SECRET || 'secretkey123',
      { expiresIn: '7d' }
    );

    res.status(201).json({
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
    res.status(500).json({ message: 'Server Error during registration', error: error.message });
  }
});

// LOGIN USER
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
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
    res.status(500).json({ message: 'Server Error during login', error: error.message });
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
    const { storeName, description, address, socialLinks, storeLogo, storeImage } = req.body;

    const user = await User.findById(req.user.id);
    if (!user || user.role !== 'business') {
      return res.status(403).json({ message: 'Only store/service accounts can edit store details' });
    }

    if (storeName) user.storeName = storeName;
    if (description !== undefined) user.description = description;
    if (address !== undefined) user.address = address;
    if (storeLogo !== undefined) user.storeLogo = storeLogo;
    if (storeImage !== undefined) user.storeImage = storeImage;
    
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
        address: user.address,
        socialLinks: user.socialLinks || [],
        storeLogo: user.storeLogo || '',
        storeImage: user.storeImage || '',
        isOnline: user.isOnline,
        verificationBadge: user.verificationBadge
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
    const rawName = req.params.storeName.replace(/-/g, ' ');
    
    // Perform case-insensitive match on business role storeName
    const store = await User.findOne({
      role: 'business',
      storeName: { $regex: new RegExp("^" + rawName + "$", "i") }
    }).select('-password');

    if (!store) {
      return res.status(404).json({ message: 'Store not found' });
    }

    res.json(store);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching store profile', error: error.message });
  }
});

module.exports = router;
