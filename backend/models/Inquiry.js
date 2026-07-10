const mongoose = require('mongoose');

const InquirySchema = new mongoose.Schema({
  businessId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  customerName: { type: String, required: true },
  customerEmail: { type: String, required: true },
  customerPhone: { type: String, required: true },
  businessType: { type: String, required: true }, // e.g. pharmacy, law, tax, liquor, boutique, general
  details: { type: mongoose.Schema.Types.Mixed, default: {} }, // category-specific fields
  status: { type: String, enum: ['pending', 'resolved'], default: 'pending' },
  notificationsSent: {
    emailCustomer: { type: Boolean, default: true },
    emailOwner: { type: Boolean, default: true },
    smsCustomer: { type: Boolean, default: true },
    smsOwner: { type: Boolean, default: true }
  }
}, { timestamps: true });

// Secondary indexes for high scale query performance
InquirySchema.index({ businessId: 1, status: 1 });
InquirySchema.index({ customerEmail: 1 });
InquirySchema.index({ createdAt: -1 });

module.exports = mongoose.model('Inquiry', InquirySchema);
