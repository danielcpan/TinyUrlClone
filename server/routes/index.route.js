const express = require('express');
const linkRoutes = require('./link.route');

const router = express.Router(); // eslint-disable-line new-cap

router.get('/health-check', (req, res) => res.send('OK'));

router.use('/links', linkRoutes);

module.exports = router;
