const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  role: {
    type: String,
    enum: ['individual', 'handyman', 'business', 'super_admin'],
    default: 'individual'
  },
  
  // Handyman & Business specific attributes
  isOnline: { type: Boolean, default: true }, // For Handyman availability toggle
  verificationBadge: { type: Boolean, default: false }, // Approved status by Super Admin
  
  // Store / Business / Org specific attributes
  storeName: { type: String }, // e.g., "Main Street Boutique"
  businessType: {
    type: String,
    enum: ['store', 'service', 'organization', 'real_estate', 'automotive']
  },
  category: { type: String },  // e.g., "Boutique", "Pharmacy", "Law Office", "Tax Office", "Liquor Store"
  description: { type: String }, // Store or handyman description
  address: { type: String },
  storeLogo: { type: String, default: '' },
  storeImage: { type: String, default: '' },
  customNavbarLinks: [
    {
      label: { type: String, required: true },
      url: { type: String, required: true }
    }
  ],
  socialLinks: [
    {
      platform: { type: String, required: true },
      url: { type: String, required: true }
    }
  ]
}, { timestamps: true });

// Secondary indexes for high scale query performance
UserSchema.index({ role: 1 });
UserSchema.index({ businessType: 1 });
UserSchema.index({ category: 1 });
UserSchema.index({ isOnline: 1 });
UserSchema.index({ createdAt: -1 });

module.exports = mongoose.model('User', UserSchema);
