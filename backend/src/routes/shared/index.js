const express = require('express');
const router = express.Router();
const generalRoutes = require('@routes/shared/generalRoutes');
const authRoutes = require('@routes/shared/authRoutes');

router.use('/', generalRoutes);
router.use('/', authRoutes);

module.exports = router;
