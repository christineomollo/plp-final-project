const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const protect = require('../middleware/auth');

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d'
  });
};

// Generate mock OTP (for development - replace with real SMS service)
const generateOTP = () => {
  return Math.floor(10000 + Math.random() * 90000).toString();
};

// @route   POST /api/auth/register
// @desc    Register new user
// @access  Public
router.post('/register', [
  body('phone').matches(/^\+[1-9]\d{1,14}$/).withMessage('Invalid international phone number'),
  body('username').trim().isLength({ min: 3, max: 30 }).withMessage('Username must be 3-30 characters'),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      success: false, 
      errors: errors.array() 
    });
  }

  try {
    const { phone, username, password } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ $or: [{ phone }, { username }] });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'User with this phone number or username already exists'
      });
    }

    // Generate OTP
    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + parseInt(process.env.OTP_EXPIRY));

    // Create user
    const user = await User.create({
      phone,
      username,
      password,
      otp: {
        code: otp,
        expiresAt: otpExpiry
      }
    });

    // In production, send OTP via SMS service (Twilio, etc.)
    console.log(`📱 OTP for ${phone}: ${otp}`);

    // Generate temporary token for OTP verification
    const tempToken = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: `OTP sent to ${phone}. Check console in development mode.`,
      tempToken,
      otp: process.env.NODE_ENV === 'development' ? otp : undefined // Only in dev
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during registration',
      error: error.message
    });
  }
});

// @route   POST /api/auth/verify-otp
// @desc    Verify OTP and complete registration
// @access  Public
router.post('/verify-otp', [
  body('phone').matches(/^\+[1-9]\d{1,14}$/),
  body('otp').isLength({ min: 5, max: 5 }),
  body('tempToken').notEmpty()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      success: false, 
      errors: errors.array() 
    });
  }

  try {
    const { phone, otp, tempToken } = req.body;

    // Verify temp token
    const decoded = jwt.verify(tempToken, process.env.JWT_SECRET);
    
    const user = await User.findOne({ 
      _id: decoded.id,
      phone,
      'otp.code': otp,
      'otp.expiresAt': { $gt: new Date() }
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired OTP'
      });
    }

    // Mark user as verified
    user.verified = true;
    user.otp = undefined;
    await user.save();

    // Generate final token
    const token = generateToken(user._id);

    res.json({
      success: true,
      message: 'Phone verified successfully',
      token,
      user: {
        id: user._id,
        username: user.username,
        phone: user.phone,
        profileImage: user.profileImage,
        verified: user.verified
      }
    });

  } catch (error) {
    console.error('OTP verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during OTP verification',
      error: error.message
    });
  }
});

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post('/login', [
  body('phone').matches(/^\+[1-9]\d{1,14}$/),
  body('password').notEmpty()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      success: false, 
      errors: errors.array() 
    });
  }

  try {
    const { phone, password } = req.body;

    // Find user
    const user = await User.findOne({ phone });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Check if verified
    if (!user.verified) {
      return res.status(401).json({
        success: false,
        message: 'Please verify your phone number first'
      });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Generate token
    const token = generateToken(user._id);

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        username: user.username,
        phone: user.phone,
        profileImage: user.profileImage,
        bio: user.bio
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during login',
      error: error.message
    });
  }
});

// @route   GET /api/auth/me
// @desc    Get current user
// @access  Private
router.get('/me', protect, async (req, res) => {
  res.json({
    success: true,
    user: {
      id: req.user._id,
      username: req.user.username,
      phone: req.user.phone,
      profileImage: req.user.profileImage,
      bio: req.user.bio,
      verified: req.user.verified,
      createdAt: req.user.createdAt
    }
  });
});

// @route   PUT /api/auth/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', protect, [
  body('username').optional().trim().isLength({ min: 3, max: 30 }),
  body('bio').optional().isLength({ max: 500 })
], async (req, res) => {
  try {
    const { username, bio, profileImage } = req.body;

    const updates = {};
    if (username) updates.username = username;
    if (bio !== undefined) updates.bio = bio;
    if (profileImage) updates.profileImage = profileImage;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      updates,
      { new: true, runValidators: true }
    ).select('-password -otp');

    res.json({
      success: true,
      message: 'Profile updated successfully',
      user
    });

  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error updating profile',
      error: error.message
    });
  }
});

module.exports = router;