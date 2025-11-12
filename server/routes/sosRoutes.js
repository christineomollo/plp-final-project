const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const SOSAlert = require('../models/SOSAlert');
const protect = require('../middleware/auth');

// @route   POST /api/sos/alert
// @desc    Create SOS alert
// @access  Private
router.post('/alert', protect, [
  body('urgency').isIn(['low', 'medium', 'high', 'critical']).withMessage('Invalid urgency level'),
  body('description').trim().notEmpty().withMessage('Description is required')
    .isLength({ max: 2000 }).withMessage('Description too long'),
  body('contactNumber').matches(/^\+[1-9]\d{1,14}$/).withMessage('Invalid phone number')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      success: false, 
      errors: errors.array() 
    });
  }

  try {
    const { urgency, description, location, contactNumber } = req.body;

    const alert = await SOSAlert.create({
      user: req.user._id,
      urgency,
      description,
      location: location || {},
      contactNumber
    });

    // In production, trigger real emergency response:
    // - Send SMS to emergency contacts
    // - Alert local authorities if critical
    // - Notify admin dashboard
    console.log(`🚨 SOS ALERT [${urgency.toUpperCase()}] from ${req.user.username}`);
    console.log(`📱 Contact: ${contactNumber}`);
    console.log(`📍 Location: ${location?.address || 'Not provided'}`);

    res.status(201).json({
      success: true,
      message: 'SOS alert received. Help is on the way. Stay safe! 💗',
      alertId: alert._id,
      estimatedResponse: urgency === 'critical' ? '5-10 minutes' : '15-30 minutes'
    });

  } catch (error) {
    console.error('SOS alert error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error creating SOS alert'
    });
  }
});

// @route   GET /api/sos/my-alerts
// @desc    Get user's SOS alert history
// @access  Private
router.get('/my-alerts', protect, async (req, res) => {
  try {
    const alerts = await SOSAlert.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .limit(20);

    res.json({
      success: true,
      alerts
    });

  } catch (error) {
    console.error('Alert history fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching alert history'
    });
  }
});

// @route   GET /api/sos/alert/:id
// @desc    Get specific SOS alert
// @access  Private
router.get('/alert/:id', protect, async (req, res) => {
  try {
    const alert = await SOSAlert.findById(req.params.id).populate('user', 'username phone');

    if (!alert) {
      return res.status(404).json({
        success: false,
        message: 'Alert not found'
      });
    }

    // Users can only view their own alerts
    if (alert.user._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this alert'
      });
    }

    res.json({
      success: true,
      alert
    });

  } catch (error) {
    console.error('Alert fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching alert'
    });
  }
});

// @route   PUT /api/sos/alert/:id/resolve
// @desc    Mark alert as resolved
// @access  Private
router.put('/alert/:id/resolve', protect, async (req, res) => {
  try {
    const alert = await SOSAlert.findById(req.params.id);

    if (!alert) {
      return res.status(404).json({
        success: false,
        message: 'Alert not found'
      });
    }

    // Users can only resolve their own alerts
    if (alert.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to resolve this alert'
      });
    }

    alert.status = 'resolved';
    alert.resolvedAt = new Date();
    await alert.save();

    res.json({
      success: true,
      message: 'Alert marked as resolved. We\'re glad you\'re safe! 💕',
      alert
    });

  } catch (error) {
    console.error('Alert resolve error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error resolving alert'
    });
  }
});

// @route   GET /api/sos/resources
// @desc    Get emergency resources and helplines
// @access  Private
router.get('/resources', protect, async (req, res) => {
  try {
    const resources = {
      global: [
        {
          name: 'UN Women Helpline',
          description: 'Global support for women in crisis',
          phone: '+1-800-799-7233',
          website: 'https://www.unwomen.org'
        }
      ],
      mental_health: [
        {
          name: 'Crisis Text Line',
          description: '24/7 crisis support via text',
          contact: 'Text HOME to 741741',
          website: 'https://www.crisistextline.org'
        },
        {
          name: 'National Suicide Prevention Lifeline',
          description: '24/7 suicide prevention',
          phone: '988',
          website: 'https://988lifeline.org'
        }
      ],
      domestic_violence: [
        {
          name: 'National Domestic Violence Hotline',
          description: '24/7 support for domestic violence',
          phone: '1-800-799-7233',
          website: 'https://www.thehotline.org'
        }
      ],
      sexual_assault: [
        {
          name: 'RAINN National Sexual Assault Hotline',
          description: '24/7 support for sexual assault survivors',
          phone: '1-800-656-4673',
          website: 'https://www.rainn.org'
        }
      ]
    };

    res.json({
      success: true,
      resources
    });

  } catch (error) {
    console.error('Resources fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching resources'
    });
  }
});

module.exports = router;