const express = require('express');
const tinyUrlController = require('../controllers/tinyUrl.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/:tinyUrlId')
  .get(tinyUrlController.get);

module.exports = router;
