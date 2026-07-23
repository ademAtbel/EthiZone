const mongoose = require('mongoose');
const Listing = require('./Listing');

// Personal/Used Item Listing Schema
const PersonalListing = Listing.discriminator('PersonalListing', new mongoose.Schema({
  condition: { type: String },
  availability: { type: String }
}));

module.exports = PersonalListing;
