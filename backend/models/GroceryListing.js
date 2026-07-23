const mongoose = require('mongoose');
const Listing = require('./Listing');

// Grocery Listing Schema
const GroceryListing = Listing.discriminator('GroceryListing', new mongoose.Schema({
  expirationDate: { type: Date },
  brand: { type: String },
  weight: { type: String },
  stock: { type: Number, default: 0 }
}));

module.exports = GroceryListing;
