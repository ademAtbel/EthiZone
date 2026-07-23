const mongoose = require('mongoose');
const Listing = require('./Listing');

// Tax Listing Schema (No price required)
const TaxListing = Listing.discriminator('TaxListing', new mongoose.Schema({
  taxServices: { type: [String], default: [] },
  taxYearsHandled: { type: [String], default: [] },
  documentsRequired: { type: [String], default: [] }
}));

module.exports = TaxListing;
