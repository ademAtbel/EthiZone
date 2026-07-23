const mongoose = require('mongoose');
const Listing = require('./Listing');

// Electronics Listing Schema
const ElectronicsListing = Listing.discriminator('ElectronicsListing', new mongoose.Schema({
  brand: { type: String },
  modelNumber: { type: String },
  specifications: { type: String },
  warranty: { type: String },
  condition: { type: String },
  stock: { type: Number, default: 0 }
}));

module.exports = ElectronicsListing;
