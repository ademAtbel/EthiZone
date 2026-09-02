const mongoose = require('mongoose');

const PendingUserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  role: { type: String, default: 'individual' },
  businessType: { type: String },
  category: { type: String },
  subCategory: { type: String },
  storeName: { type: String },
  description: { type: String },
  address: { type: String },
  verificationCode: { type: String, required: true },
  verificationExpires: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now, expires: 1800 } // Auto-deletes after 30 minutes
});

module.exports = mongoose.model('PendingUser', PendingUserSchema);
