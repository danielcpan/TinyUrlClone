const mongoose = require('mongoose');

const VisitSchema = new mongoose.Schema({
  link: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Link',
  },
  ip: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  region: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  loc: {
    type: String,
    required: true,
  },
  org: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Visit', VisitSchema);
