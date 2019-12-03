const express = require('express');
const routeHoles = require('./routes/drillholes');
const routeUsers = require('./routes/users');
const routeAuth = require('./routes/auth');

const router = express.Router();
router.use('/holes', routeHoles);
router.use('/users', routeUsers);
router.use('/auth', routeAuth);

module.exports = router;