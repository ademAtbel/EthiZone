const mongoose = require('mongoose');
const Listing = require('./Listing');

// Cleaning Listing Schema (Price optional)
const CleaningListing = Listing.discriminator('CleaningListing', new mongoose.Schema({
  cleaningServices: { type: [String], default: [] },
  frequencies: { type: [String], default: [] },
  cleaningRates: { type: String }
}));

module.exports = CleaningListing;
