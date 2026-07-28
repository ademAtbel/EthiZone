const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  ownerName: { type: String, required: true },
  ownerPhone: { type: String, required: true },
  ownerEmail: { type: String },
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { 
    type: String, 
    enum: ['Entertainment', 'Arts & Culture', 'Religious', 'Social', 'Educational', 'Sports', 'Charity'],
    required: true 
  },
  subCategory: { type: String }, // e.g. Concerts, Shows, Exhibitions, etc.
  eventDate: { type: Date, required: true },
  eventTime: { type: String, required: true },
  location: { type: String, required: true }, // e.g., "Addis Ababa" or "New York"
  address: { type: String }, // Specific address/venue details
  price: { type: Number, default: 0 }, // 0 or empty means free event
  images: { type: [String], default: [] }
}, { timestamps: true });

// Create text index for search functionality
EventSchema.index({ title: 'text', description: 'text', category: 'text', subCategory: 'text' });

// Secondary indexes
EventSchema.index({ ownerId: 1 });
EventSchema.index({ location: 1 });
EventSchema.index({ category: 1 });
EventSchema.index({ eventDate: 1 });

module.exports = mongoose.model('Event', EventSchema);
