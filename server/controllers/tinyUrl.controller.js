const httpStatus = require('http-status');
const axios = require('axios');

const Link = require('../models/link.model');
const Visit = require('../models/visit.model');
const APIError = require('../utils/APIError.utils');
const { PUBLIC_URL, IP_INFO_TOKEN } = require('../config/config');

module.exports = {
  get: async (req, res, next) => {
    try {
      const link = await Link.findOne({ tinyUrl: `${PUBLIC_URL}/${req.params.tinyUrl}` });
      if (!link) {
        return next(new APIError('Link not found', httpStatus.NOT_FOUND));
      }

      let ip;

      // TEST IP
      if (process.env.NODE_ENV === 'test' || req.ip === '::1' || req.ip === '::ffff:127.0.0.1') {
        ip = '117.141.106.236';
      }
      const response = await axios.get(`https://ipinfo.io/${ip}`, {
        headers: { Authorization: `Bearer ${IP_INFO_TOKEN}` },
      });

      let visit = await Visit.findOne({ ip: response.data.ip });

      // IP does not exists, is unique
      if (!visit) {
        visit = new Visit({ ...response.data, link: link._id, isUnique: true });
        link.uniqueClicks += 1;
      }

      link.totalClicks += 1;
      link.visits.push(visit);
      await link.save();

      return res.status(httpStatus.MOVED_PERMANENTLY).redirect(link.originalUrl);
    } catch (err) {
      return next(err);
    }
  },
};
