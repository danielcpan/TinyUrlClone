const httpStatus = require('http-status');

const { decimalToBaseN, getNextSequence } = require('../utils/mongoose.utils');
const Link = require('../models/link.model');
const APIError = require('../utils/APIError.utils');
const { PUBLIC_URL } = require('../config/config');

module.exports = {
  get: async (req, res, next) => {
    try {
      const link = await Link.findOne({ _id: req.params.linkId }).populate('visits');
      if (!link) {
        return next(new APIError('Link not found', httpStatus.NOT_FOUND));
      }
      return res.json(link);
    } catch (err) {
      return next(err);
    }
  },
  list: async (req, res, next) => {
    try {
      const links = await Link.find({});
      return res.json(links);
    } catch (err) {
      return next(err);
    }
  },
  create: async (req, res, next) => {
    try {
      const nextSeq = await getNextSequence('linkId');
      const tinyUrl = `${PUBLIC_URL}/${decimalToBaseN(nextSeq, 62)}`;

      const link = await Link.create({
        ...req.body,
        index: nextSeq,
        tinyUrl,
      });
      return res.status(httpStatus.CREATED).json(link);
    } catch (err) {
      return next(err);
    }
  },
  update: async (req, res, next) => {
    try {
      const link = await Link.findOneAndUpdate(
        { _id: req.params.linkId },
        req.body,
        { new: true },
      );
      if (!link) {
        return next(new APIError('Link not found', httpStatus.NOT_FOUND));
      }
      return res.status(httpStatus.OK).json(link);
    } catch (err) {
      return next(err);
    }
  },
  delete: async (req, res, next) => {
    try {
      const link = await Link.findOneAndRemove({ _id: req.params.linkId });
      if (!link) {
        return next(new APIError('Link not found', httpStatus.NOT_FOUND));
      }
      return res.status(httpStatus.OK).json({ deleted: true });
    } catch (err) {
      return next(err);
    }
  },
};
