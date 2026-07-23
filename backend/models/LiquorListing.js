const mongoose = require('mongoose');
const Listing = require('./Listing');

// Liquor Listing Schema
const LiquorListing = Listing.discriminator('LiquorListing', new mongoose.Schema({
  volume: { type: String },
  alcoholPercentage: { type: Number },
  stock: { type: Number, default: 0 }
}));

module.exports = LiquorListing;
