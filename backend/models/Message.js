const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  receiverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  listingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Listing', required: false },
  content: { type: String, required: true },
  readStatus: { type: Boolean, default: false },
}, { timestamps: true });

// Indexes to speed up conversation fetching
MessageSchema.index({ senderId: 1, receiverId: 1 });
MessageSchema.index({ receiverId: 1, readStatus: 1 });

module.exports = mongoose.model('Message', MessageSchema);
