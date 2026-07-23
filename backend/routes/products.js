const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Listing = require('../models/Listing');
const BoutiqueListing = require('../models/BoutiqueListing');
const GroceryListing = require('../models/GroceryListing');
const LiquorListing = require('../models/LiquorListing');
const ElectronicsListing = require('../models/ElectronicsListing');

// Helper to map Listing database object to Product frontend object
const mapListingToProduct = (l, storeSlug) => {
  return {
    _id: l._id,
    id: l._id,
    name: l.title,
    category: l.category || 'Other',
    price: l.price || 0,
    discountPrice: l.discountPrice || '',
    stock: l.stock !== undefined ? l.stock : 0,
    status: l.status === 'active' ? 'Active' : (l.status === 'inactive' ? 'Draft' : 'Out of Stock'),
    image: l.images?.[0] || '',
    images: l.images || [],
    description: l.description || '',
    specifications: {
      material: l.brand || '',
      dimensions: l.sizes ? l.sizes.join(', ') : '',
      weight: l.weight || l.volume || ''
    },
    storeSlug
  };
};

// GET ALL PRODUCTS FOR A STORE SLUG
router.get('/', async (req, res) => {
  try {
    const { storeSlug } = req.query;
    if (!storeSlug) {
      return res.status(400).json({ message: 'storeSlug query parameter is required.' });
    }

    const owner = await User.findOne({ storeSlug: storeSlug.toLowerCase().trim() });
    if (!owner) {
      return res.status(404).json({ message: 'Store owner not found.' });
    }

    // Find all store products for this owner
    const listings = await Listing.find({ ownerId: owner._id, type: 'store_product' }).sort({ createdAt: -1 });
    const products = listings.map(l => mapListingToProduct(l, storeSlug));
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
});

// GET SINGLE PRODUCT BY ID
router.get('/:id', async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    const owner = await User.findById(listing.ownerId);
    const storeSlug = owner ? owner.storeSlug : 'my-store';

    res.json(mapListingToProduct(listing, storeSlug));
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product details', error: error.message });
  }
});

// CREATE NEW PRODUCT
router.post('/', async (req, res) => {
  try {
    const { name, category, price, discountPrice, stock, status, images, description, specifications, storeSlug } = req.body;
    
    if (!storeSlug) {
      return res.status(400).json({ message: 'storeSlug is required.' });
    }

    const owner = await User.findOne({ storeSlug: storeSlug.toLowerCase().trim() });
    if (!owner) {
      return res.status(404).json({ message: 'Store owner not found.' });
    }

    let Model = Listing;
    const modelProps = {};

    if (category === 'Boutique') {
      Model = BoutiqueListing;
      modelProps.brand = specifications?.material || '';
      modelProps.sizes = specifications?.dimensions ? specifications.dimensions.split(',').map(s => s.trim()) : [];
      modelProps.stock = stock || 0;
    } else if (category === 'Grocery Store') {
      Model = GroceryListing;
      modelProps.brand = specifications?.material || '';
      modelProps.weight = specifications?.weight || '';
      modelProps.stock = stock || 0;
    } else if (category === 'Liquor Store') {
      Model = LiquorListing;
      modelProps.volume = specifications?.weight || '';
      modelProps.stock = stock || 0;
    } else if (category === 'Electronics Shop') {
      Model = ElectronicsListing;
      modelProps.brand = specifications?.material || '';
      modelProps.modelNumber = specifications?.dimensions || '';
      modelProps.specifications = specifications?.weight || '';
      modelProps.stock = stock || 0;
    }

    const newProduct = new Model({
      ownerId: owner._id,
      ownerName: owner.username,
      ownerPhone: owner.phone,
      type: 'store_product',
      category: category || 'Other',
      title: name,
      description,
      price: price || 0,
      discountPrice: discountPrice || null,
      status: status === 'Active' ? 'active' : (status === 'Draft' ? 'inactive' : 'busy'),
      images: images || [],
      ...modelProps
    });

    const saved = await newProduct.save();
    res.status(201).json(mapListingToProduct(saved, storeSlug));
  } catch (error) {
    res.status(500).json({ message: 'Error creating product', error: error.message });
  }
});

// UPDATE PRODUCT BY ID
router.put('/:id', async (req, res) => {
  try {
    const { name, category, price, discountPrice, stock, status, images, description, specifications, storeSlug } = req.body;
    
    let listing = await Listing.findById(req.params.id);
    if (!listing) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    listing.title = name || listing.title;
    listing.category = category || listing.category;
    listing.price = price !== undefined ? price : listing.price;
    listing.discountPrice = discountPrice !== undefined ? discountPrice : listing.discountPrice;
    listing.status = status === 'Active' ? 'active' : (status === 'Draft' ? 'inactive' : 'busy');
    listing.description = description || listing.description;
    if (images) {
      listing.images = images;
    }

    // Set discriminator fields dynamically
    if (stock !== undefined) listing.stock = stock;
    if (specifications) {
      if (listing.__t === 'BoutiqueListing' || category === 'Boutique') {
        listing.brand = specifications.material || listing.brand;
        if (specifications.dimensions) {
          listing.sizes = specifications.dimensions.split(',').map(s => s.trim());
        }
      } else if (listing.__t === 'GroceryListing' || category === 'Grocery Store') {
        listing.brand = specifications.material || listing.brand;
        listing.weight = specifications.weight || listing.weight;
      } else if (listing.__t === 'LiquorListing' || category === 'Liquor Store') {
        listing.volume = specifications.weight || listing.volume;
      } else if (listing.__t === 'ElectronicsListing' || category === 'Electronics Shop') {
        listing.brand = specifications.material || listing.brand;
        listing.modelNumber = specifications.dimensions || listing.modelNumber;
        listing.specifications = specifications.weight || listing.specifications;
      }
    }

    const updated = await listing.save();
    res.json(mapListingToProduct(updated, storeSlug || 'my-store'));
  } catch (error) {
    res.status(500).json({ message: 'Error updating product', error: error.message });
  }
});

// DELETE PRODUCT BY ID
router.delete('/:id', async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    await Listing.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error: error.message });
  }
});

module.exports = router;
