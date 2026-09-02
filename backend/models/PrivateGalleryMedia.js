const mongoose = require('mongoose');

const PrivateGalleryMediaSchema = new mongoose.Schema({
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'PrivateEvent', required: true },
  uploaderName: { type: String, required: true },
  mediaUrl: { type: String, required: true },
  mediaType: { type: String, enum: ['image', 'video'], default: 'image' },
  caption: { type: String, default: '' },
  isApproved: { type: Boolean, default: true }
}, { timestamps: true });

PrivateGalleryMediaSchema.index({ eventId: 1 });

module.exports = mongoose.model('PrivateGalleryMedia', PrivateGalleryMediaSchema);
