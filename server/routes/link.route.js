const express = require('express');
const linkController = require('../controllers/link.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  .get(linkController.list)
  .post(linkController.create);

router.route('/:linkId')
  .get(linkController.get)
  .put(linkController.update)
  .delete(linkController.delete);

router.route('/analytics/:tinyUrlId')
  .get(linkController.getAnalytics);

module.exports = router;
