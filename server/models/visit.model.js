const mongoose = require('mongoose');

const VisitSchema = new mongoose.Schema({
  linkId: {
    // type: mongoose.Schema.Types.ObjectId,
    type: mongoose.Types.ObjectId,
    ref: 'Link',
  },
  isUnique: {
    type: Boolean,
    required: true,
    default: false,
  },
  ip: {
    type: String,
    required: true,
  },
  city: {
    type: String,
  },
  region: {
    type: String,
  },
  country: {
    type: String,
  },
  loc: {
    type: String,
  },
  org: {
    type: String,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Visit', VisitSchema);
