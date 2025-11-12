const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['article', 'affirmation']
  },
  title: {
    type: String,
    required: function() { return this.type === 'article'; }
  },
  content: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: function() { return this.type === 'article'; }
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Content', contentSchema);