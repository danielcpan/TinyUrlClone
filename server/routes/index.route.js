const express = require('express');
const linkRoutes = require('./link.route');
const tinyUrlRoutes = require('./tinyUrl.route');

const router = express.Router(); // eslint-disable-line new-cap

router.get('/health-check', (req, res) => res.send('OK'));

router.use('/', tinyUrlRoutes);
router.use('/api/links', linkRoutes);

module.exports = router;
