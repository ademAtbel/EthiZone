const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  country: { type: String, default: 'Ethiopia' },
  rating: { type: Number, required: true, min: 1, max: 5 },
  review: { type: String, required: true },
  storeName: { type: String, default: '' },
  verified: { type: Boolean, default: true }
}, { timestamps: true });

ReviewSchema.index({ productName: 1 });
ReviewSchema.index({ storeName: 1 });
ReviewSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Review', ReviewSchema);
