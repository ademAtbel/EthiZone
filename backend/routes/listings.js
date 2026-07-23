const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Listing = require('../models/Listing');
const User = require('../models/User');
const { verifyToken } = require('../middleware/auth');

// CREATE LISTING
router.post('/', verifyToken, async (req, res) => {
  try {
    const { title, description, price, type, category, metadata, images, isOnSale, isNewArrival, salePrice } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Verify correct type mapping for non-stores
    if (user.role === 'individual' && type !== 'personal_item' && type !== 'job_opening') {
      return res.status(400).json({ message: 'Individuals can only post personal items or job openings' });
    }
    if (user.role === 'handyman' && type !== 'handyman_skill') {
      return res.status(400).json({ message: 'Handymen can only post handyman skills' });
    }

    // Verify correct type mapping for businesses based on businessType
    if (user.role === 'business') {
      if (user.businessType === 'store' && type !== 'store_product') {
        return res.status(400).json({ message: 'Stores can only post store products' });
      }
      if (user.businessType === 'service' && type !== 'service') {
        return res.status(400).json({ message: 'Services can only post service offerings' });
      }
      if (user.businessType === 'organization' && type !== 'job_opening') {
        return res.status(400).json({ message: 'Organizations can only post job openings (hiring only)' });
      }
      if (user.businessType === 'real_estate' && type !== 'house') {
        return res.status(400).json({ message: 'Real estate agencies can only post houses' });
      }
      if (user.businessType === 'automotive' && type !== 'car') {
        return res.status(400).json({ message: 'Automotive businesses can only post cars' });
      }
    }

    // Validate images count
    if (images && images.length > 5) {
      return res.status(400).json({ message: 'Maximum 5 images allowed per listing.' });
    }

    const itemCategory = (['store_product', 'service', 'job_opening', 'house', 'car'].includes(type) && user.role === 'business') ? user.category : (category || 'Other');

    let Model = Listing;
    const modelProps = {};

    if (type === 'personal_item') {
      Model = require('../models/PersonalListing');
      if (metadata) {
        modelProps.condition = metadata.condition;
        modelProps.availability = metadata.availability;
      }
    } else if (itemCategory === 'Boutique') {
      Model = require('../models/BoutiqueListing');
      if (metadata) {
        modelProps.brand = metadata.brand;
        modelProps.sizes = metadata.sizes;
        modelProps.colors = metadata.colors;
        modelProps.condition = metadata.condition;
        modelProps.stock = metadata.stock;
      }
    } else if (itemCategory === 'Grocery Store') {
      Model = require('../models/GroceryListing');
      if (metadata) {
        modelProps.expirationDate = metadata.expirationDate;
        modelProps.brand = metadata.brand;
        modelProps.weight = metadata.weight;
        modelProps.stock = metadata.stock;
      }
    } else if (itemCategory === 'Liquor Store') {
      Model = require('../models/LiquorListing');
      if (metadata) {
        modelProps.volume = metadata.volume;
        modelProps.alcoholPercentage = metadata.alcoholPercentage;
        modelProps.stock = metadata.stock;
      }
    } else if (itemCategory === 'Electronics Shop') {
      Model = require('../models/ElectronicsListing');
      if (metadata) {
        modelProps.brand = metadata.brand;
        modelProps.modelNumber = metadata.modelNumber;
        modelProps.specifications = metadata.specifications;
        modelProps.warranty = metadata.warranty;
        modelProps.condition = metadata.condition;
        modelProps.stock = metadata.stock;
      }
    } else if (itemCategory === 'Law Office') {
      Model = require('../models/LawListing');
      if (metadata) {
        modelProps.specialties = metadata.specialties;
        modelProps.consultationType = metadata.consultationType;
        modelProps.officeHours = metadata.officeHours;
        modelProps.languagesSpoken = metadata.languagesSpoken;
      }
    } else if (itemCategory === 'Tax Office') {
      Model = require('../models/TaxListing');
      if (metadata) {
        modelProps.taxServices = metadata.taxServices;
        modelProps.taxYearsHandled = metadata.taxYearsHandled;
        modelProps.documentsRequired = metadata.documentsRequired;
      }
    } else if (itemCategory === 'Dental Clinic') {
      Model = require('../models/ClinicListing');
      if (metadata) {
        modelProps.specialties = metadata.specialties;
        modelProps.clinicServices = metadata.clinicServices;
        modelProps.acceptedInsurances = metadata.acceptedInsurances;
        modelProps.emergencyServices = metadata.emergencyServices;
      }
    } else if (itemCategory === 'Consulting Firm') {
      Model = require('../models/ConsultingListing');
      if (metadata) {
        modelProps.consultingDomains = metadata.consultingDomains;
        modelProps.corporateServices = metadata.corporateServices;
        modelProps.consultantProfiles = metadata.consultantProfiles;
      }
    } else if (itemCategory === 'Cleaning Agency') {
      Model = require('../models/CleaningListing');
      if (metadata) {
        modelProps.cleaningServices = metadata.cleaningServices;
        modelProps.frequencies = metadata.frequencies;
        modelProps.cleaningRates = metadata.cleaningRates;
      }
    } else if (itemCategory === 'Beauty Salon') {
      Model = require('../models/BeautyListing');
      if (metadata) {
        modelProps.beautyServices = metadata.beautyServices;
        modelProps.stylists = metadata.stylists;
      }
    }

    const newListing = new Model({
      ownerId: user._id,
      ownerName: user.username,
      ownerPhone: user.phone,
      title,
      description,
      price: (price !== undefined && price !== null && price !== '') ? price : null,
      isOnSale: !!isOnSale,
      isNewArrival: !!isNewArrival,
      salePrice: (salePrice !== undefined && salePrice !== null && salePrice !== '') ? salePrice : null,
      type,
      category: itemCategory,
      images: images || [],
      metadata: metadata || {},
      ...modelProps
    });

    const savedListing = await newListing.save();
    res.status(201).json(savedListing);
  } catch (error) {
    res.status(500).json({ message: 'Error creating listing', error: error.message });
  }
});

// GET ALL LISTINGS & SEARCH
router.get('/', async (req, res) => {
  try {
    const { query, type, category, status, ownerId } = req.query;

    let filter = {};

    if (ownerId) {
      if (mongoose.Types.ObjectId.isValid(ownerId)) {
        filter.ownerId = ownerId;
      } else {
        return res.status(400).json({ message: 'Invalid ownerId format' });
      }
    }

    if (type) {
      filter.type = type;
    }

    if (category) {
      filter.category = category;
    }

    if (status && status !== 'all') {
      filter.status = status;
    } else if (!status) {
      filter.status = 'active'; // Default to active listings
    }

    // Text search query
    if (query) {
      filter.$text = { $search: query };
    }

    // Support pagination parameters
    const page = parseInt(req.query.page) || 1;
    const limit = Math.min(parseInt(req.query.limit) || 20, 100);
    const skip = (page - 1) * limit;

    const totalListings = await Listing.countDocuments(filter);

    // Fetch and populate owner details with pagination
    const listings = await Listing.find(filter)
      .populate('ownerId', 'username email phone role storeName category verificationBadge isOnline address')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // Calculate and attach average rating and reviews count for each owner
    const Rating = require('../models/Rating');
    const populatedListings = await Promise.all(listings.map(async (listing) => {
      const ownerId = listing.ownerId?._id || listing.ownerId;
      if (!ownerId) return listing.toObject();

      const ratings = await Rating.find({ targetId: ownerId });
      const count = ratings.length;
      const avg = count > 0 
        ? parseFloat((ratings.reduce((sum, r) => sum + r.rating, 0) / count).toFixed(1))
        : null;

      const obj = listing.toObject();
      obj.avgRating = avg;
      obj.ratingsCount = count;
      return obj;
    }));

    res.setHeader('X-Total-Count', totalListings);
    res.setHeader('X-Total-Pages', Math.ceil(totalListings / limit));
    res.setHeader('X-Current-Page', page);
    res.setHeader('X-Limit', limit);

    res.json(populatedListings);
  } catch (error) {
    console.error('Error in GET /api/listings:', error);
    res.status(500).json({ message: 'Error retrieving listings', error: error.message });
  }
});

// GET SINGLE LISTING BY ID
router.get('/:id', async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id)
      .populate('ownerId', 'username email phone role storeName category verificationBadge isOnline address');
    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    // Attach avgRating and ratingsCount
    const Rating = require('../models/Rating');
    const ratings = await Rating.find({ targetId: listing.ownerId?._id || listing.ownerId });
    const count = ratings.length;
    const avg = count > 0 
      ? parseFloat((ratings.reduce((sum, r) => sum + r.rating, 0) / count).toFixed(1))
      : null;

    const obj = listing.toObject();
    obj.avgRating = avg;
    obj.ratingsCount = count;

    res.json(obj);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving listing', error: error.message });
  }
});

// UPDATE LISTING
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const { title, description, price, status, category, metadata, images, isOnSale, isNewArrival, salePrice } = req.body;
    let listing = await Listing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    // Check ownership or super admin
    if (listing.ownerId.toString() !== req.user.id && req.user.role !== 'super_admin') {
      return res.status(403).json({ message: 'Unauthorized action' });
    }

    // Validate images count
    if (images && images.length > 5) {
      return res.status(400).json({ message: 'Maximum 5 images allowed per listing.' });
    }

    listing.title = title || listing.title;
    listing.description = description || listing.description;
    listing.price = (price !== undefined && price !== null && price !== '') ? price : null;
    listing.status = status || listing.status;
    listing.category = category !== undefined ? category : listing.category;
    
    if (isOnSale !== undefined) listing.isOnSale = isOnSale;
    if (isNewArrival !== undefined) listing.isNewArrival = isNewArrival;
    if (salePrice !== undefined) {
      listing.salePrice = (salePrice !== null && salePrice !== '') ? salePrice : null;
    }

    if (images) {
      listing.images = images;
    }

    if (metadata) {
      listing.metadata = metadata;
      for (const [key, val] of Object.entries(metadata)) {
        listing[key] = val;
      }
    }

    const updatedListing = await listing.save();
    res.json(updatedListing);
  } catch (error) {
    res.status(500).json({ message: 'Error updating listing', error: error.message });
  }
});

// UPDATE LISTING STATUS
router.patch('/:id/status', verifyToken, async (req, res) => {
  try {
    const { status } = req.body;
    if (!['active', 'sold', 'busy', 'inactive'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    // Check ownership or super admin
    if (listing.ownerId.toString() !== req.user.id && req.user.role !== 'super_admin') {
      return res.status(403).json({ message: 'Unauthorized action' });
    }

    listing.status = status;
    const updatedListing = await listing.save();
    res.json(updatedListing);
  } catch (error) {
    res.status(500).json({ message: 'Error updating listing status', error: error.message });
  }
});

// DELETE LISTING
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    // Check ownership or super admin
    if (listing.ownerId.toString() !== req.user.id && req.user.role !== 'super_admin') {
      return res.status(403).json({ message: 'Unauthorized action' });
    }

    await Listing.findByIdAndDelete(req.params.id);
    res.json({ message: 'Listing deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting listing', error: error.message });
  }
});

module.exports = router;
