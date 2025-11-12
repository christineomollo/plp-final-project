const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const ChatMessage = require('../models/ChatMessage');
const protect = require('../middleware/auth');

// @route   GET /api/chat/messages
// @desc    Get recent chat messages
// @access  Private
// router.get('/messages', protect, async (req, res) => {
router.get('/messages', protect, async (req, res) => { // TEMP REMOVE protect
  try {
    const { limit = 50, before } = req.query;

    const query = { reported: false };
    
    // Pagination using message ID
    if (before) {
      query._id = { $lt: before };
    }

    const messages = await ChatMessage.find(query)
      .sort({ timestamp: -1 })
      .limit(parseInt(limit))
      .populate('user', 'username profileImage')
      .lean();

    // Reverse to show oldest first
    messages.reverse();

    res.json({
      success: true,
      messages: messages.map(msg => ({
        _id: msg._id,
        user: msg.isAnonymous ? {
          _id: 'anonymous',
          username: 'Anonymous Bestie',
          profileImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop'
        } : msg.user,
        message: msg.message,
        timestamp: msg.timestamp,
        isAnonymous: msg.isAnonymous
      })),
      hasMore: messages.length === parseInt(limit)
    });

  } catch (error) {
    console.error('Messages fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching messages'
    });
  }
});

// @route   POST /api/chat/messages
// @desc    Send a new chat message
// @access  Private
router.post('/messages', protect, [
  body('message').trim().notEmpty().withMessage('Message cannot be empty')
    .isLength({ max: 1000 }).withMessage('Message cannot exceed 1000 characters')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      success: false, 
      errors: errors.array() 
    });
  }

  try {
    const { message, isAnonymous = false } = req.body;

    const chatMessage = await ChatMessage.create({
      user: req.user._id,
      message,
      isAnonymous
    });

    const populatedMessage = await ChatMessage.findById(chatMessage._id)
      .populate('user', 'username profileImage');

    res.status(201).json({
      success: true,
      message: {
        _id: populatedMessage._id,
        user: isAnonymous ? {
          _id: 'anonymous',
          username: 'Anonymous Bestie',
          profileImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop'
        } : {
          _id: populatedMessage.user._id,
          username: populatedMessage.user.username,
          profileImage: populatedMessage.user.profileImage
        },
        message: populatedMessage.message,
        timestamp: populatedMessage.timestamp,
        isAnonymous: populatedMessage.isAnonymous
      }
    });

  } catch (error) {
    console.error('Message send error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error sending message'
    });
  }
});

// @route   DELETE /api/chat/messages/:id
// @desc    Delete own message
// @access  Private
router.delete('/messages/:id', protect, async (req, res) => {
  try {
    const message = await ChatMessage.findById(req.params.id);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found'
      });
    }

    // Check if user owns the message
    if (message.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this message'
      });
    }

    await message.deleteOne();

    res.json({
      success: true,
      message: 'Message deleted successfully'
    });

  } catch (error) {
    console.error('Message delete error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error deleting message'
    });
  }
});

// @route   POST /api/chat/messages/:id/report
// @desc    Report inappropriate message
// @access  Private
router.post('/messages/:id/report', protect, async (req, res) => {
  try {
    const message = await ChatMessage.findById(req.params.id);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found'
      });
    }

    message.reported = true;
    await message.save();

    res.json({
      success: true,
      message: 'Message reported. Our moderation team will review it.'
    });

  } catch (error) {
    console.error('Message report error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error reporting message'
    });
  }
});

// @route   GET /api/chat/stats
// @desc    Get chat statistics
// @access  Private
router.get('/stats', protect, async (req, res) => {
  try {
    const totalMessages = await ChatMessage.countDocuments({ reported: false });
    const todayMessages = await ChatMessage.countDocuments({
      reported: false,
      timestamp: { $gte: new Date().setHours(0, 0, 0, 0) }
    });

    res.json({
      success: true,
      stats: {
        totalMessages,
        todayMessages,
        activeBesties: await ChatMessage.distinct('user').then(users => users.length)
      }
    });

  } catch (error) {
    console.error('Stats fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching statistics'
    });
  }
});

module.exports = router;