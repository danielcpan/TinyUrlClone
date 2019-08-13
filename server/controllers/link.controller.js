const httpStatus = require('http-status');
// const models = require('../models');
const { getNextSequence } = require('../utils/mongoose.utils')
const Counter = require('../models/counter.model');
const Link = require('../models/link.model');
const APIError = require('../utils/APIError.utils');

module.exports = {
  get: async (req, res, next) => {
    try {
      const link = await Link.findOne({ id: req.body.id })
      if (!link) {
        return next(new APIError('Link not found', httpStatus.NOT_FOUND));
      }
      res.json(link)
    } catch (err) {
      return next(err);
    }
  },
  list: async (req, res, next) => {
    try {
      console.log(Link)
      const links = await Link.find({})
      res.json(links)
    } catch (err) {
      return next(err);
    }
  },
  create: async (req, res, next) => {
    try {
      const link = new Link(req.body);
      const counter = await Counter.findOne({_id: 'linkid'})
      counter.seq++;
      await counter.save()
      link._id = counter.seq.toString()
      await link.save();
      return res.json(link);
    } catch (err) {
      return next(err);
    }
  },  
  update: async (req, res, next) => {
    try {
      const link = await Link.findOneAndUpdate({_id: req.params.linkId}, req.body, {new: true});
      if (!link) {
        return next(new APIError('Link not found', httpStatus.NOT_FOUND));
      }
      return res.json(link);
    } catch (err) {
      return next(err);
    }
  },
  delete: async (req, res, next) => {
    try {
      const link = await Link.findOneAndRemove({_id: req.params.linkId})
      if (!link) {
        return next(new APIError('Link not found', httpStatus.NOT_FOUND));
      }
      return res.json(link);
    } catch (err) {
      return next(err);
    }
  },
};
