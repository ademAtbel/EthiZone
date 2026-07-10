const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  type: { 
    type: String, 
    enum: ['store', 'service', 'organization', 'real_estate', 'automotive'],
    required: true
  },
  description: { type: String }
}, { timestamps: true });

// Secondary index to speed up filtering categories by type
CategorySchema.index({ type: 1 });

module.exports = mongoose.model('Category', CategorySchema);
