const mongoose = require('mongoose');
const Listing = require('./Listing');

// Clinic Listing Schema (No price required)
const ClinicListing = Listing.discriminator('ClinicListing', new mongoose.Schema({
  specialties: { type: [String], default: [] },
  clinicServices: { type: [String], default: [] },
  acceptedInsurances: { type: [String], default: [] },
  emergencyServices: { type: Boolean, default: false }
}));

module.exports = ClinicListing;
