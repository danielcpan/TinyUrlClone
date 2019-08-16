const mongoose = require('mongoose');
const { decimalToBaseN } = require('../utils/mongoose.utils');

const URL_REGEX = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
const SAME_URL_REGEX = /^http:\/\/example\.com/;

const manyValidators = [
  { validator: (v) => URL_REGEX.test(v), msg: 'Invalid Url' },
  { validator: (v) => !SAME_URL_REGEX.test(v), msg: 'That is already a ____ link!' },
]

const LinkSchema = new mongoose.Schema({
  index: {
    type: Number,
    unique: true,
    index: true,
  },
  tinyUrlId: {
    type: String,
    unique: true
  },  
  tinyUrl: {
    type: String,
  },
  originalUrl: {
    type: String,
    required: true,
    validate: manyValidators
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
    type: mongoose.Types.ObjectId,
    ref: 'Visit',
  }],
}, {
  timestamps: true
});

LinkSchema.statics = {
  getTinyUrlEndPoint(index) {
    return decimalToBaseN(index, 62);
  },
};

module.exports = mongoose.model('Link', LinkSchema);
