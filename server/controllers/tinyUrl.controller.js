const httpStatus = require('http-status');
const axios = require('axios');

const Link = require('../models/link.model');
const Visit = require('../models/visit.model');
const APIError = require('../utils/APIError.utils');
const { IP_INFO_TOKEN } = require('../config/config');

module.exports = {
  get: async (req, res, next) => {
    try {
      const link = await Link.findOne({ tinyUrlId: req.params.tinyUrlId });

      if (!link) {
        return next(new APIError('Link not found', httpStatus.NOT_FOUND));
      }

      let ip = req.ip;
      if (process.env.NODE_ENV === 'test' || req.ip === '::1' || req.ip === '::ffff:127.0.0.1') {
        ip = '78.22.241.57';
      }
      const response = await axios.get(`https://ipinfo.io/${ip}`, {
        headers: { Authorization: `Bearer ${IP_INFO_TOKEN}` },
      });

      const visit = new Visit({ ...response.data, linkId: link._id });

      const searchedVisit = await Visit.findOne({ ip: visit.ip, linkId: link._id });

      // IP does not exists, is unique
      if (!searchedVisit) {
        visit.isUnique = true;
        link.uniqueClicks += 1;
      }

      await visit.save();
      link.totalClicks += 1;
      link.visits.push(visit);
      await link.save();

      return res.status(httpStatus.MOVED_PERMANENTLY).redirect(link.originalUrl);
    } catch (err) {
      return next(err);
    }
  },
};
