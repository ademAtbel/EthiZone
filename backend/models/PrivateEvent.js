const mongoose = require('mongoose');

const PrivateEventSchema = new mongoose.Schema({
  hostId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  hostName: { type: String, required: true },
  hostEmail: { type: String },
  hostPhone: { type: String },
  eventTitle: { type: String, required: true },
  eventType: { 
    type: String, 
    enum: [
      'Wedding', 'Birthday', 'Christening/Baptism', 'Graduation', 'Anniversary', 
      'Private Party', 'Family Gathering', 'Memorial/Funeral', 'Dinner Party', 
      'Baby Shower', 'Bridal Shower', 'Engagement Party', 'Holiday Celebration', 'Custom Private Event'
    ],
    required: true 
  },
  eventDate: { type: Date, required: true },
  eventTime: { type: String, required: true },
  venueName: { type: String, required: true },
  address: { type: String, required: true },
  description: { type: String },
  
  // Custom Invitation Designer Styles
  design: {
    template: { type: String, default: 'classic_gold' }, // classic_gold, elegant_dark, floral_romance, modern_minimal, royal_purple
    primaryColor: { type: String, default: '#c5a85a' },
    secondaryColor: { type: String, default: '#0f172a' },
    fontFamily: { type: String, default: 'serif' },
    coverPhoto: { type: String, default: '' },
    customMessage: { type: String, default: 'We request the honor of your presence at our celebration.' },
    backgroundStyle: { type: String, default: 'gradient' }
  },

  settings: {
    requirePhoneVerification: { type: Boolean, default: true },
    allowPlusOne: { type: Boolean, default: true },
    maxGuests: { type: Number, default: 500 }
  },

  status: { type: String, enum: ['draft', 'published', 'archived'], default: 'published' }
}, { timestamps: true });

PrivateEventSchema.index({ hostId: 1 });
PrivateEventSchema.index({ eventDate: 1 });

module.exports = mongoose.model('PrivateEvent', PrivateEventSchema);
