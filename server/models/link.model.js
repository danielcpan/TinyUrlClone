const mongoose = require('mongoose');

const LinkSchema = new mongoose.Schema({
  // _id: {
  //   type: Number,
  //   unique: true,
  //   default: 0,
  // },
  index: {
    type: Number,
    unique: true,
    index: true
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
    default: Date.now,
  },
});

// LinkSchema.index({index: 1});


module.exports = mongoose.model('Link', LinkSchema);
