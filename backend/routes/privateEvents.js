const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const PrivateEvent = require('../models/PrivateEvent');
const PrivateGuest = require('../models/PrivateGuest');
const PrivateGalleryMedia = require('../models/PrivateGalleryMedia');
const User = require('../models/User');
const { verifyToken } = require('../middleware/auth');

// Helper to normalize phone numbers (strip non-digits)
const normalizePhone = (phoneStr) => {
  if (!phoneStr) return '';
  return phoneStr.replace(/\D/g, '');
};

// 1. CREATE PRIVATE EVENT (HOST ONLY)
router.post('/', verifyToken, async (req, res) => {
  try {
    const { eventTitle, eventType, eventDate, eventTime, venueName, address, description, design, settings } = req.body;
    
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'Host user not found' });
    }

    if (!eventTitle || !eventType || !eventDate || !eventTime || !venueName || !address) {
      return res.status(400).json({ message: 'Title, event type, date, time, venue, and address are required.' });
    }

    const newEvent = new PrivateEvent({
      hostId: user._id,
      hostName: user.username,
      hostEmail: user.email,
      hostPhone: user.phone,
      eventTitle,
      eventType,
      eventDate: new Date(eventDate),
      eventTime,
      venueName,
      address,
      description: description || '',
      design: design || {},
      settings: settings || {}
    });

    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (error) {
    console.error('Error creating private event:', error);
    res.status(500).json({ message: 'Error creating private event', error: error.message });
  }
});

// 2. GET ALL PRIVATE EVENTS FOR CURRENT HOST
router.get('/', verifyToken, async (req, res) => {
  try {
    const events = await PrivateEvent.find({ hostId: req.user.id }).sort({ eventDate: 1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching host private events', error: error.message });
  }
});

// 3. GET SINGLE PRIVATE EVENT BY ID (HOST / ADMIN ONLY)
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const event = await PrivateEvent.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Private event not found' });
    }

    if (event.hostId.toString() !== req.user.id && req.user.role !== 'super_admin') {
      return res.status(403).json({ message: 'Access Denied: Not authorized to view host dashboard for this event' });
    }

    res.json(event);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching event details', error: error.message });
  }
});

// 4. UPDATE PRIVATE EVENT & INVITATION DESIGN (HOST ONLY)
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const event = await PrivateEvent.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Private event not found' });
    }

    if (event.hostId.toString() !== req.user.id && req.user.role !== 'super_admin') {
      return res.status(403).json({ message: 'Access Denied: Not authorized to edit this event' });
    }

    const { eventTitle, eventType, eventDate, eventTime, venueName, address, description, design, settings, status } = req.body;

    if (eventTitle) event.eventTitle = eventTitle;
    if (eventType) event.eventType = eventType;
    if (eventDate) event.eventDate = new Date(eventDate);
    if (eventTime) event.eventTime = eventTime;
    if (venueName) event.venueName = venueName;
    if (address) event.address = address;
    if (description !== undefined) event.description = description;
    if (design) event.design = { ...event.design, ...design };
    if (settings) event.settings = { ...event.settings, ...settings };
    if (status) event.status = status;

    const updatedEvent = await event.save();
    res.json(updatedEvent);
  } catch (error) {
    res.status(500).json({ message: 'Error updating private event', error: error.message });
  }
});

// 5. DELETE PRIVATE EVENT (HOST ONLY)
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const event = await PrivateEvent.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Private event not found' });
    }

    if (event.hostId.toString() !== req.user.id && req.user.role !== 'super_admin') {
      return res.status(403).json({ message: 'Access Denied: Not authorized to delete this event' });
    }

    await PrivateEvent.findByIdAndDelete(req.params.id);
    await PrivateGuest.deleteMany({ eventId: req.params.id });
    await PrivateGalleryMedia.deleteMany({ eventId: req.params.id });

    res.json({ message: 'Private event and guest lists deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting private event', error: error.message });
  }
});

// 6. ADD GUESTS TO PRIVATE EVENT (HOST ONLY)
router.post('/:id/guests', verifyToken, async (req, res) => {
  try {
    const event = await PrivateEvent.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Private event not found' });
    }

    if (event.hostId.toString() !== req.user.id && req.user.role !== 'super_admin') {
      return res.status(403).json({ message: 'Access Denied: Not authorized to add guests to this event' });
    }

    const { guests } = req.body; // Array of { name, phone, group }
    if (!Array.isArray(guests) || guests.length === 0) {
      return res.status(400).json({ message: 'Guests array is required.' });
    }

    const createdGuests = [];

    for (const g of guests) {
      if (!g.name || !g.phone) continue;
      const normPhone = normalizePhone(g.phone);
      if (!normPhone) continue;

      // Generate 16-char secure random token
      const inviteToken = crypto.randomBytes(8).toString('hex');

      // Check if already in list for this event
      let guestRec = await PrivateGuest.findOne({ eventId: event._id, phone: normPhone });
      if (guestRec) {
        guestRec.name = g.name;
        guestRec.group = g.group || guestRec.group;
        guestRec.status = 'invited';
        await guestRec.save();
      } else {
        guestRec = new PrivateGuest({
          eventId: event._id,
          name: g.name,
          phone: normPhone,
          group: g.group || 'General',
          inviteToken
        });
        await guestRec.save();
      }
      createdGuests.push(guestRec);
    }

    res.status(201).json({ message: `Successfully saved ${createdGuests.length} guests`, guests: createdGuests });
  } catch (error) {
    res.status(500).json({ message: 'Error adding guests', error: error.message });
  }
});

// 7. GET GUEST LIST FOR A PRIVATE EVENT (HOST ONLY)
router.get('/:id/guests', verifyToken, async (req, res) => {
  try {
    const event = await PrivateEvent.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Private event not found' });
    }

    if (event.hostId.toString() !== req.user.id && req.user.role !== 'super_admin') {
      return res.status(403).json({ message: 'Access Denied: Not authorized' });
    }

    const guests = await PrivateGuest.find({ eventId: req.params.id }).sort({ name: 1 });
    res.json(guests);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching guest list', error: error.message });
  }
});

// 8. REVOKE / DELETE GUEST (HOST ONLY)
router.delete('/:id/guests/:guestId', verifyToken, async (req, res) => {
  try {
    const event = await PrivateEvent.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Private event not found' });
    }

    if (event.hostId.toString() !== req.user.id && req.user.role !== 'super_admin') {
      return res.status(403).json({ message: 'Access Denied' });
    }

    await PrivateGuest.findByIdAndDelete(req.params.guestId);
    res.json({ message: 'Guest removed from event invitation list' });
  } catch (error) {
    res.status(500).json({ message: 'Error removing guest', error: error.message });
  }
});

// =========================================================================
// 9. CRITICAL SECURITY ENDPOINT — VERIFY PRIVATE INVITATION ACCESS (SCENARIO G)
// =========================================================================
router.post('/verify-invitation', async (req, res) => {
  try {
    const { token, phone } = req.body;

    if (!token) {
      return res.status(400).json({ message: 'Invitation token is required.' });
    }

    // 1. Find Guest by Invitation Token
    const guest = await PrivateGuest.findOne({ inviteToken: token.trim() });
    if (!guest || guest.status === 'revoked') {
      return res.status(403).json({
        authorized: false,
        message: 'ACCESS DENIED: Invalid, expired, or revoked invitation token.'
      });
    }

    // 2. Fetch associated Event
    const event = await PrivateEvent.findById(guest.eventId);
    if (!event || event.status === 'archived') {
      return res.status(404).json({
        authorized: false,
        message: 'ACCESS DENIED: Private event is no longer active.'
      });
    }

    // 3. IF PHONE VERIFICATION IS REQUIRED BY EVENT SETTINGS OR USER SENDS PHONE
    if (event.settings?.requirePhoneVerification || phone) {
      if (!phone) {
        return res.status(401).json({
          requiresPhoneVerification: true,
          message: 'Phone verification required. Please enter your phone number to access this private invitation.'
        });
      }

      const inputNorm = normalizePhone(phone);
      const guestNorm = normalizePhone(guest.phone);

      // Check if phone matches the invited guest phone number (allowing last 7-10 digit matching for international code variations)
      const isMatch = inputNorm === guestNorm || 
                      (inputNorm.length >= 7 && guestNorm.endsWith(inputNorm)) || 
                      (guestNorm.length >= 7 && inputNorm.endsWith(guestNorm));

      if (!isMatch) {
        return res.status(403).json({
          authorized: false,
          message: 'ACCESS DENIED: This phone number is not authorized to view this private invitation.'
        });
      }
    }

    // AUTHORIZATION PASSED! RETURN PRIVATE EVENT INVITATION DATA!
    res.json({
      authorized: true,
      event: {
        id: event._id,
        hostName: event.hostName,
        eventTitle: event.eventTitle,
        eventType: event.eventType,
        eventDate: event.eventDate,
        eventTime: event.eventTime,
        venueName: event.venueName,
        address: event.address,
        description: event.description,
        design: event.design,
        settings: event.settings
      },
      guest: {
        id: guest._id,
        name: guest.name,
        phone: guest.phone,
        status: guest.status,
        plusOnesCount: guest.plusOnesCount,
        dietaryRestrictions: guest.dietaryRestrictions,
        messageToHost: guest.messageToHost,
        isCheckedIn: guest.isCheckedIn,
        inviteToken: guest.inviteToken
      }
    });

  } catch (error) {
    console.error('Error verifying private invitation:', error);
    res.status(500).json({ message: 'Server Error verifying invitation', error: error.message });
  }
});

// 10. SUBMIT GUEST RSVP (REQUIRES VALID TOKEN + PHONE VERIFICATION)
router.post('/rsvp', async (req, res) => {
  try {
    const { token, phone, status, plusOnesCount, dietaryRestrictions, messageToHost } = req.body;

    if (!token || !phone || !status) {
      return res.status(400).json({ message: 'Token, phone number, and RSVP status are required.' });
    }

    if (!['attending', 'maybe', 'declined'].includes(status)) {
      return res.status(400).json({ message: 'Invalid RSVP status value.' });
    }

    const guest = await PrivateGuest.findOne({ inviteToken: token.trim() });
    if (!guest || guest.status === 'revoked') {
      return res.status(403).json({ message: 'ACCESS DENIED: Invalid or revoked invitation.' });
    }

    const inputNorm = normalizePhone(phone);
    const guestNorm = normalizePhone(guest.phone);
    const isMatch = inputNorm === guestNorm || (inputNorm.length >= 7 && guestNorm.endsWith(inputNorm)) || (guestNorm.length >= 7 && inputNorm.endsWith(guestNorm));

    if (!isMatch) {
      return res.status(403).json({ message: 'ACCESS DENIED: Phone number does not match guest invitation.' });
    }

    guest.status = status;
    if (plusOnesCount !== undefined) guest.plusOnesCount = Math.max(0, parseInt(plusOnesCount) || 0);
    if (dietaryRestrictions !== undefined) guest.dietaryRestrictions = dietaryRestrictions;
    if (messageToHost !== undefined) guest.messageToHost = messageToHost;

    await guest.save();

    res.json({ message: 'RSVP submitted successfully!', guest });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting RSVP', error: error.message });
  }
});

// 11. QR CHECK-IN SCAN VERIFICATION (HOST / STAFF)
router.post('/check-in', verifyToken, async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) {
      return res.status(400).json({ message: 'QR ticket token is required' });
    }

    const guest = await PrivateGuest.findOne({ inviteToken: token.trim() });
    if (!guest || guest.status === 'revoked') {
      return res.status(404).json({ valid: false, message: 'Invalid or revoked QR guest ticket.' });
    }

    const event = await PrivateEvent.findById(guest.eventId);
    if (!event) {
      return res.status(404).json({ valid: false, message: 'Event not found.' });
    }

    if (event.hostId.toString() !== req.user.id && req.user.role !== 'super_admin') {
      return res.status(403).json({ valid: false, message: 'Not authorized to perform check-in for this event.' });
    }

    if (guest.isCheckedIn) {
      return res.status(200).json({
        valid: true,
        alreadyCheckedIn: true,
        message: `Guest ${guest.name} was already checked in at ${new Date(guest.checkInTimestamp).toLocaleTimeString()}`,
        guest,
        eventTitle: event.eventTitle
      });
    }

    guest.isCheckedIn = true;
    guest.checkInTimestamp = new Date();
    await guest.save();

    res.json({
      valid: true,
      alreadyCheckedIn: false,
      message: `CHECK-IN SUCCESSFUL: Welcome ${guest.name}!`,
      guest,
      eventTitle: event.eventTitle
    });

  } catch (error) {
    res.status(500).json({ message: 'Error checking in guest', error: error.message });
  }
});

// 12. GET PRIVATE EVENT PHOTO GALLERY
router.get('/:id/gallery', async (req, res) => {
  try {
    const media = await PrivateGalleryMedia.find({ eventId: req.params.id, isApproved: true }).sort({ createdAt: -1 });
    res.json(media);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching gallery media', error: error.message });
  }
});

// 13. UPLOAD TO PRIVATE EVENT PHOTO GALLERY
router.post('/:id/gallery', async (req, res) => {
  try {
    const { uploaderName, mediaUrl, mediaType, caption } = req.body;
    if (!uploaderName || !mediaUrl) {
      return res.status(400).json({ message: 'Uploader name and media URL are required.' });
    }

    const newMedia = new PrivateGalleryMedia({
      eventId: req.params.id,
      uploaderName,
      mediaUrl,
      mediaType: mediaType || 'image',
      caption: caption || ''
    });

    await newMedia.save();
    res.status(201).json(newMedia);
  } catch (error) {
    res.status(500).json({ message: 'Error uploading gallery media', error: error.message });
  }
});

module.exports = router;
