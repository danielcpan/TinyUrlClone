const mongoose = requite('mongoose');

const VisitSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now    
  },
})

module.exports = mongoose.model('Visit', VisitSchema);