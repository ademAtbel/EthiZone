const mongoose = require('mongoose');

const ListingSchema = new mongoose.Schema({
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  ownerName: { type: String, required: true },
  ownerPhone: { type: String, required: true },
  type: {
    type: String,
    enum: ['personal_item', 'handyman_skill', 'store_product', 'service', 'job_opening', 'house', 'car'],
    required: true
  },
  category: { type: String }, // e.g. Boutique, Pharmacy, Law Office, Tax Office, Liquor Store
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number }, // Price or rate
  isOnSale: { type: Boolean, default: false },
  isNewArrival: { type: Boolean, default: false },
  salePrice: { type: Number },
  status: {
    type: String,
    enum: ['active', 'sold', 'busy', 'inactive'],
    default: 'active'
  },
  images: {
    type: [String],
    default: []
  },
  metadata: {
    jobRequirements: [String],  // Job descriptions requirements
    handymanRates: String,      // e.g. "$45/hr", "Flat rate"
    salaryRate: String,         // "hour", "year", "month"
    storeInventoryCount: Number,
    // Real Estate metadata
    bedrooms: Number,
    bathrooms: Number,
    propertyType: String,
    address: String,
    // Automotive metadata
    year: Number,
    mileage: Number,
    make: String,
    model: String
  }
}, { timestamps: true });

// Create text index for search functionality
ListingSchema.index({ title: 'text', description: 'text', category: 'text' });

// Secondary indexes for high scale query performance
ListingSchema.index({ ownerId: 1 });
ListingSchema.index({ type: 1, status: 1 });
ListingSchema.index({ category: 1 });
ListingSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Listing', ListingSchema);
