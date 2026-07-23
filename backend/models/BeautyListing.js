const mongoose = require('mongoose');
const Listing = require('./Listing');

// Beauty Listing Schema (Price optional)
const BeautyListing = Listing.discriminator('BeautyListing', new mongoose.Schema({
  beautyServices: { type: [String], default: [] },
  stylists: { type: [String], default: [] }
}));

module.exports = BeautyListing;
