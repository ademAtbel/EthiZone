const mongoose = require('mongoose');
const Listing = require('./Listing');

// Consulting Listing Schema (No price required)
const ConsultingListing = Listing.discriminator('ConsultingListing', new mongoose.Schema({
  consultingDomains: { type: [String], default: [] },
  corporateServices: { type: [String], default: [] },
  consultantProfiles: { type: [String], default: [] }
}));

module.exports = ConsultingListing;
