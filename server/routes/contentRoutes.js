const express = require('express');
const router = express.Router();
const Content = require('../models/content');
const protect = require('../middleware/auth');

// @route   GET /api/content/articles
// @desc    Get all articles
// @access  Private
router.get('/articles', protect, async (req, res) => {
  try {
    const { category, limit = 20, skip = 0 } = req.query;

    const query = {};
    if (category) query.category = category;

    const articles = await Content.find(query)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(parseInt(skip))
      .populate('author', 'username profileImage');

    const total = await Content.countDocuments(query);

    res.json({
      success: true,
      articles,
      pagination: {
        total,
        limit: parseInt(limit),
        skip: parseInt(skip),
        hasMore: skip + articles.length < total
      }
    });

  } catch (error) {
    console.error('Articles fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching articles'
    });
  }
});

// @route   GET /api/content/articles/:id
// @desc    Get single article
// @access  Private
router.get('/articles/:id', protect, async (req, res) => {
  try {
    const article = await Content.findById(req.params.id)
      .populate('author', 'username profileImage');

    if (!article) {
      return res.status(404).json({
        success: false,
        message: 'Article not found'
      });
    }

    res.json({
      success: true,
      article
    });

  } catch (error) {
    console.error('Article fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching article'
    });
  }
});

// @route   GET /api/content/affirmations
// @desc    Get daily affirmations
// @access  Private
router.get('/affirmations', protect, async (req, res) => {
  try {
    const affirmations = await Content.find({ type: 'affirmation' })
      .sort({ createdAt: -1 })
      .limit(10);

    res.json({
      success: true,
      affirmations
    });

  } catch (error) {
    console.error('Affirmations fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching affirmations'
    });
  }
});

// @route   GET /api/content/categories
// @desc    Get content categories
// @access  Private
router.get('/categories', protect, async (req, res) => {
  try {
    const categories = await Content.distinct('category');

    res.json({
      success: true,
      categories
    });

  } catch (error) {
    console.error('Categories fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching categories'
    });
  }
});

module.exports = router;