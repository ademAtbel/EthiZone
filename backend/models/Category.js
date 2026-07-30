const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { 
    type: String, 
    enum: ['store', 'service', 'organization', 'real_estate', 'automotive', 'event'],
    required: true
  },
  description: { type: String }
}, { timestamps: true });

// Compound index to allow same category name under different business types
CategorySchema.index({ name: 1, type: 1 }, { unique: true });
CategorySchema.index({ type: 1 });

module.exports = mongoose.model('Category', CategorySchema);
