const express = require('express');
const router = express.Router();
const sharedRoutes = require('@routes/shared');
const person = require('@routes/v1/personRoutes');

router.use('/', sharedRoutes);
router.use('/', person);

module.exports = router;
