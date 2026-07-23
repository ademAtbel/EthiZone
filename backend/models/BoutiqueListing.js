const mongoose = require('mongoose');
const Listing = require('./Listing');

// Boutique Listing Schema
const BoutiqueListing = Listing.discriminator('BoutiqueListing', new mongoose.Schema({
  brand: { type: String },
  sizes: { type: [String], default: [] },
  colors: { type: [String], default: [] },
  condition: { type: String },
  stock: { type: Number, default: 0 }
}));

module.exports = BoutiqueListing;
