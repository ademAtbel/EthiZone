const mongoose = require('mongoose');

const RatingVerificationSchema = new mongoose.Schema({
  email: { type: String, required: true },
  targetId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  code: { type: String, required: true }
}, { timestamps: true });

// Auto-delete verification code after 5 minutes (300 seconds)
RatingVerificationSchema.index({ createdAt: 1 }, { expireAfterSeconds: 300 });
RatingVerificationSchema.index({ email: 1, targetId: 1 }, { unique: true });

module.exports = mongoose.model('RatingVerification', RatingVerificationSchema);
