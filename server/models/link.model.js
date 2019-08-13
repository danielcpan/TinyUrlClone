const mongoose = require('mongoose');

const LinkSchema = new mongoose.Schema({
  _id: {
    type: Number,
  },
  tinyUrl: {
    type: String,
  },
  originalUrl: {
    type: String,
    required: true,
  },
  uniqueClicks: {
    type: Number,
    default: 0,    
  },
  totalClicks: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now    
  },
})

module.exports = mongoose.model('Link', LinkSchema);