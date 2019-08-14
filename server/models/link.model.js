const mongoose = require('mongoose');
const { decimalToBaseN } = require('../utils/mongoose.utils');

const LinkSchema = new mongoose.Schema({
  index: {
    type: Number,
    unique: true,
    index: true,
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
  visits: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Visit',
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

LinkSchema.statics = {
  getTinyUrlEndPoint(index) {
    return decimalToBaseN(index, 62);
  },
};

module.exports = mongoose.model('Link', LinkSchema);
