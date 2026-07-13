const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const User = require('../models/User');
const { verifyToken } = require('../middleware/auth');

// GET INBOX CONVERSATIONS SUMMARY
router.get('/conversations', verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;

    // Aggregate to get latest message per user we chatted with
    const latestMessages = await Message.aggregate([
      { 
        $match: { 
          $or: [{ senderId: userId }, { receiverId: userId }] 
        } 
      },
      { 
        $sort: { createdAt: -1 } 
      },
      {
        $group: {
          _id: {
            $cond: [
              { $eq: ["$senderId", userId] },
              "$receiverId",
              "$senderId"
            ]
          },
          latestMessage: { $first: "$$ROOT" }
        }
      }
    ]);

    // Populate the other user's info
    const populated = await User.populate(latestMessages, {
      path: '_id',
      select: 'username email storeName storeLogo isOnline role'
    });

    const conversations = populated.map(p => ({
      contact: p._id,
      lastMessage: p.latestMessage
    })).filter(c => c.contact); // Filter out deleted users

    // Sort by most recent
    conversations.sort((a, b) => new Date(b.lastMessage.createdAt) - new Date(a.lastMessage.createdAt));

    res.json(conversations);
  } catch (error) {
    console.error('Error fetching conversations:', error);
    res.status(500).json({ message: 'Error fetching conversations' });
  }
});

// GET MESSAGES WITH A SPECIFIC USER
router.get('/:contactId', verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { contactId } = req.params;

    const messages = await Message.find({
      $or: [
        { senderId: userId, receiverId: contactId },
        { senderId: contactId, receiverId: userId }
      ]
    })
    .sort({ createdAt: 1 })
    .populate('listingId', 'title image price');

    // Mark received messages as read
    await Message.updateMany(
      { senderId: contactId, receiverId: userId, readStatus: false },
      { $set: { readStatus: true } }
    );

    res.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ message: 'Error fetching messages' });
  }
});

// SEND A MESSAGE
router.post('/', verifyToken, async (req, res) => {
  try {
    const senderId = req.user.id;
    const { receiverId, listingId, content } = req.body;

    if (!receiverId || !content) {
      return res.status(400).json({ message: 'Receiver and content are required' });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      listingId: listingId || null,
      content
    });

    await newMessage.save();

    res.status(201).json(newMessage);
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ message: 'Error sending message' });
  }
});

// GET UNREAD MESSAGE COUNT
router.get('/unread/count', verifyToken, async (req, res) => {
  try {
    const count = await Message.countDocuments({
      receiverId: req.user.id,
      readStatus: false
    });
    res.json({ count });
  } catch (error) {
    res.status(500).json({ message: 'Error getting unread count' });
  }
});

module.exports = router;
