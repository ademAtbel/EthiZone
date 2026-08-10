const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Seeded default store profiles fallback
const DEFAULT_STORES = [
  {
    id: 'artisan-collective',
    storeSlug: 'artisan-collective',
    name: 'Artisan Collective',
    category: 'Boutique',
    location: 'Addis Ababa, Bole',
    logo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    banner: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80',
    description: 'Curated Ethiopian handcrafted goods, ceramic pottery, traditional apparel, and boutique leather products.',
    navLinks: ['Boutique', 'Crafts', 'New Arrivals'],
    subNavLinks: ['Ceramics', 'Scarves', 'Leather'],
    status: 'active'
  },
  {
    id: 'ethio-pharmacy-hub',
    storeSlug: 'ethio-pharmacy-hub',
    name: 'Ethio Pharmacy Hub',
    category: 'Pharmacy',
    location: 'Addis Ababa, Kazanchis',
    logo: 'https://images.unsplash.com/photo-1586015555751-63bb77f4322a?auto=format&fit=crop&w=150&q=80',
    banner: 'https://images.unsplash.com/photo-1576602976047-174e57a47881?auto=format&fit=crop&w=1200&q=80',
    description: 'Licensed prescription fulfillment, wellness supplements, personal hygiene products, and emergency medical kits.',
    navLinks: ['Medicines', 'Supplements', 'First Aid'],
    subNavLinks: ['Prescriptions', 'Vitamins'],
    status: 'active'
  },
  {
    id: 'sheger-tech-center',
    storeSlug: 'sheger-tech-center',
    name: 'Sheger Electronics & Tech',
    category: 'Electronics Shop',
    location: 'Addis Ababa, Mexico Square',
    logo: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=150&q=80',
    banner: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
    description: 'Genuine smartphones, laptops, audio accessories, smartwatches, and certified repair services.',
    navLinks: ['Smartphones', 'Laptops', 'Accessories'],
    subNavLinks: ['iPhone', 'Samsung', 'Dell'],
    status: 'active'
  }
];

// GET ALL STORES
router.get('/', async (req, res) => {
  try {
    const storeUsers = await User.find({ role: 'business' }).select('-password');
    if (storeUsers.length === 0) {
      return res.json(DEFAULT_STORES);
    }

    const formattedStores = storeUsers.map((u) => ({
      _id: u._id,
      id: u.storeSlug || u._id.toString(),
      storeSlug: u.storeSlug || u._id.toString(),
      name: u.storeName || u.username,
      category: u.category || 'Boutique',
      location: u.address || 'Ethiopia',
      logo: u.storeLogo || '',
      banner: u.storeImage || '',
      description: u.description || '',
      navLinks: u.customNavbarLinks ? u.customNavbarLinks.map(l => l.label) : [],
      subNavLinks: [],
      status: u.status || 'active',
      role: u.role,
      businessType: u.businessType
    }));

    res.json(formattedStores);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching stores', error: error.message });
  }
});

// GET STORE BY SLUG OR ID
router.get('/:slug', async (req, res) => {
  try {
    const slug = req.params.slug;
    const storeUser = await User.findOne({
      $or: [{ storeSlug: slug }, { _id: slug.match(/^[0-9a-fA-F]{24}$/) ? slug : null }]
    }).select('-password');

    if (storeUser) {
      return res.json({
        _id: storeUser._id,
        id: storeUser.storeSlug || storeUser._id.toString(),
        storeSlug: storeUser.storeSlug || storeUser._id.toString(),
        name: storeUser.storeName || storeUser.username,
        category: storeUser.category || 'Boutique',
        location: storeUser.address || 'Ethiopia',
        logo: storeUser.storeLogo || '',
        banner: storeUser.storeImage || '',
        description: storeUser.description || '',
        navLinks: storeUser.customNavbarLinks ? storeUser.customNavbarLinks.map(l => l.label) : [],
        subNavLinks: [],
        status: storeUser.status || 'active'
      });
    }

    const fallback = DEFAULT_STORES.find(s => s.id === slug || s.storeSlug === slug);
    if (fallback) {
      return res.json(fallback);
    }

    res.status(404).json({ message: 'Store not found' });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving store', error: error.message });
  }
});

// UPDATE STORE PROFILE
router.put('/:slug', async (req, res) => {
  try {
    const slug = req.params.slug;
    const { name, category, location, logo, banner, description, navLinks, subNavLinks } = req.body;

    const storeUser = await User.findOne({
      $or: [{ storeSlug: slug }, { _id: slug.match(/^[0-9a-fA-F]{24}$/) ? slug : null }]
    });

    if (storeUser) {
      if (name) storeUser.storeName = name;
      if (category) storeUser.category = category;
      if (location) storeUser.address = location;
      if (logo !== undefined) storeUser.storeLogo = logo;
      if (banner !== undefined) storeUser.storeImage = banner;
      if (description !== undefined) storeUser.description = description;
      if (Array.isArray(navLinks)) {
        storeUser.customNavbarLinks = navLinks.map(l => typeof l === 'string' ? { label: l, url: '#' } : l);
      }
      await storeUser.save();

      return res.json({
        _id: storeUser._id,
        id: storeUser.storeSlug || storeUser._id.toString(),
        storeSlug: storeUser.storeSlug || storeUser._id.toString(),
        name: storeUser.storeName,
        category: storeUser.category,
        location: storeUser.address,
        logo: storeUser.storeLogo,
        banner: storeUser.storeImage,
        description: storeUser.description,
        navLinks: storeUser.customNavbarLinks.map(l => l.label),
        status: storeUser.status
      });
    }

    res.json({ success: true, message: 'Store profile updated locally', data: req.body });
  } catch (error) {
    res.status(500).json({ message: 'Error updating store', error: error.message });
  }
});

// UPDATE STORE STATUS
router.patch(['/:slug/status', '/:id/status'], async (req, res) => {
  try {
    const target = req.params.slug || req.params.id;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: 'Status field is required.' });
    }

    const storeUser = await User.findOne({
      $or: [{ storeSlug: target }, { _id: target.match(/^[0-9a-fA-F]{24}$/) ? target : null }]
    });

    if (storeUser) {
      storeUser.status = status === 'active' ? 'active' : 'inactive';
      await storeUser.save();
      return res.json({ success: true, status: storeUser.status, store: storeUser });
    }

    res.json({ success: true, status, message: `Status updated for ${target}` });
  } catch (error) {
    res.status(500).json({ message: 'Error updating store status', error: error.message });
  }
});

module.exports = router;
