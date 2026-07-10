const mongoose = require('mongoose');

const RatingSchema = new mongoose.Schema({
  targetId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true }
}, { timestamps: true });

// Create indexes to speed up looking up references for a specific provider
RatingSchema.index({ targetId: 1 });
RatingSchema.index({ email: 1, phone: 1 });

module.exports = mongoose.model('Rating', RatingSchema);
