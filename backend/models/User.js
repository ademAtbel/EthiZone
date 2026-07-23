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
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  },
  
  // Handyman & Business specific attributes
  isOnline: { type: Boolean, default: true }, // For Handyman availability toggle
  verificationBadge: { type: Boolean, default: false }, // Approved status by Super Admin
  
  // Store / Business / Org specific attributes
  storeName: { type: String }, // e.g., "Main Street Boutique"
  storeSlug: { type: String },
  businessType: {
    type: String,
    enum: ['store', 'service', 'organization', 'real_estate', 'automotive']
  },
  category: { type: String },  // e.g., "Boutique", "Pharmacy", "Law Office", "Tax Office", "Liquor Store"
  description: { type: String }, // Store or handyman description
  shopStory: { type: String, default: '' },
  galleryPhotos: [{ type: String }],
  address: { type: String },
  storeLogo: { type: String, default: '' },
  storeImage: { type: String, default: '' },
  workingDays: { type: String, default: 'Monday - Saturday' },
  businessHours: { type: String, default: '09:00 AM - 07:00 PM' },
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
  ],
  otpCode: { type: String },
  otpExpires: { type: Date }
}, { timestamps: true });

// Pre-save hook to generate storeSlug automatically for businesses
UserSchema.pre('save', function(next) {
  if (this.role === 'business') {
    const nameToSlugify = this.storeName || this.username;
    if (nameToSlugify) {
      this.storeSlug = nameToSlugify.toString().toLowerCase().trim()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-');
    }
  }
  next();
});

// Secondary indexes for high scale query performance
UserSchema.index({ role: 1 });
UserSchema.index({ storeSlug: 1 });
UserSchema.index({ businessType: 1 });
UserSchema.index({ category: 1 });
UserSchema.index({ isOnline: 1 });
UserSchema.index({ createdAt: -1 });

module.exports = mongoose.model('User', UserSchema);
