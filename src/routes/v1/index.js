const express = require('express');
const router = express.Router();
const sharedRoutes = require('@routes/shared');

router.use('/', sharedRoutes);

module.exports = router;
