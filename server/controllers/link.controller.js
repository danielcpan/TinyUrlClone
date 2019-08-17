const httpStatus = require('http-status');

const {
  decimalToBaseN, withHttp, withoutWWW, getNextSequence,
} = require('../utils/mongoose.utils');
const Link = require('../models/link.model');
const Visit = require('../models/visit.model');
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
      let { originalUrl } = req.body;
      originalUrl = withHttp(withoutWWW(originalUrl));

      let link = await Link.findOne({ originalUrl });

      // If already exists, return existing link
      if (link) {
        return res.json(link);
      }

      const nextSeq = await getNextSequence('linkId');
      const tinyUrlId = decimalToBaseN(nextSeq, 62);

      link = new Link({
        index: nextSeq,
        originalUrl,
        tinyUrlId,
        tinyUrl: `${PUBLIC_URL}/${tinyUrlId}`,
      });

      await link.save();
      return res.status(httpStatus.CREATED).json(link);
    } catch (err) {
      return next(err);
    }
  },
  update: async (req, res, next) => {
    try {
      const link = await Link.findOne({ _id: req.params.linkId });

      if (!link) {
        return next(new APIError('Link not found', httpStatus.NOT_FOUND));
      }

      link.set(req.body);
      await link.save();

      return res.status(httpStatus.OK).json(link);
    } catch (err) {
      return next(err);
    }
  },
  delete: async (req, res, next) => {
    try {
      const link = await Link.findOne({ _id: req.params.linkId });

      if (!link) {
        return next(new APIError('Link not found', httpStatus.NOT_FOUND));
      }
      await link.remove();
      return res.status(httpStatus.OK).json({ deleted: true });
    } catch (err) {
      return next(err);
    }
  },
  getAnalytics: async (req, res, next) => {
    try {
      const link = await Link.findOne({ tinyUrlId: req.params.tinyUrlId })
        .populate({ path: 'visits', options: { sort: { createdAt: -1 } } })
        .lean();

      if (!link) {
        return next(new APIError('Link not found', httpStatus.NOT_FOUND));
      }

      const topThreeCountries = await Visit.aggregate([
        { $match: { linkId: link._id } },
        {
          $group: {
            _id: '$country',
            code: { $first: '$country' },
            count: { $sum: 1 },
          },
        },
        { $sort: { count: -1 } },
        { $limit: 3 },
      ]);

      const topCountry = topThreeCountries[0];

      // Temporary fields
      link.topCountry = topCountry;

      return res.json(link);
    } catch (err) {
      return next(err);
    }
  },
};
