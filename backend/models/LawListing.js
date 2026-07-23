const mongoose = require('mongoose');
const Listing = require('./Listing');

// Law Listing Schema (No price required)
const LawListing = Listing.discriminator('LawListing', new mongoose.Schema({
  specialties: { type: [String], default: [] },
  consultationType: { type: String },
  officeHours: { type: String },
  languagesSpoken: { type: [String], default: [] }
}));

module.exports = LawListing;
