const mongoose = require('mongoose');

const PrivateGuestSchema = new mongoose.Schema({
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'PrivateEvent', required: true },
  name: { type: String, required: true },
  phone: { type: String, required: true }, // Normalized digits only
  group: { type: String, default: 'General' }, // Family, Friends, VIP, Colleagues, etc.
  inviteToken: { type: String, required: true, unique: true }, // Secure random hex token
  
  status: { 
    type: String, 
    enum: ['invited', 'attending', 'maybe', 'declined', 'revoked'], 
    default: 'invited' 
  },
  
  plusOnesCount: { type: Number, default: 0 },
  dietaryRestrictions: { type: String, default: '' },
  messageToHost: { type: String, default: '' },
  
  isCheckedIn: { type: Boolean, default: false },
  checkInTimestamp: { type: Date }
}, { timestamps: true });

PrivateGuestSchema.index({ eventId: 1, phone: 1 });
PrivateGuestSchema.index({ inviteToken: 1 });

module.exports = mongoose.model('PrivateGuest', PrivateGuestSchema);
