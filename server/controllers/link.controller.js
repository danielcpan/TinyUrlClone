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
      const { tinyUrlId } = req.query;

      const query = Link.find();

      if (tinyUrlId) {
        query.where({ tinyUrlId })
      }

      const links = await query.populate('visits')

      if (links.length === 0) {
        return next(new APIError('Link not found', httpStatus.NOT_FOUND));
      }

      return res.json(links);
    } catch (err) {
      return next(err);
    }
  },
  create: async (req, res, next) => {
    try {
      let link = await Link.findOne({ originalUrl: req.body.originalUrl })

      // If already exists, return existing link
      if (link) {
        return res.json(link)
      }

      const nextSeq = await getNextSequence('linkId');
      const tinyUrlId = decimalToBaseN(nextSeq, 62);

      link = new Link({
        ...req.body,
        index: nextSeq,
        tinyUrlId, 
        tinyUrl: `${PUBLIC_URL}/${tinyUrlId}`,
      })
      
      await link.save();
      return res.status(httpStatus.CREATED).json(link);
    } catch (err) {
      return next(err);
    }
  },
  update: async (req, res, next) => {
    try {
      const link = await Link.findOne({ _id: req.params.linkId })

      if (!link) {
        return next(new APIError('Link not found', httpStatus.NOT_FOUND));
      }

      link.set(req.body)
      await link.save()

      return res.status(httpStatus.OK).json(link);
    } catch (err) {
      return next(err);
    }
  },
  delete: async (req, res, next) => {
    try {
      const link = await Link.findOne({ _id: req.params.linkId })
      if (!link) {
        return next(new APIError('Link not found', httpStatus.NOT_FOUND));
      }
      await link.remove()
      return res.status(httpStatus.OK).json({ deleted: true });
    } catch (err) {
      return next(err);
    }
  },
};
