const express = require('express');
const router = express.Router();
const sharedRoutes = require('@routes/shared');
const person = require('@routes/v1/personRoutes');
const accessLevel = require('@routes/v1/accessLevelRoutes');
const access = require('@routes/v1/accessRoutes');
const address = require('@routes/v1/addressRoutes');
const category = require('@routes/v1/categoryRoutes');
const email = require('@routes/v1/emailRoutes');
const errorLog = require('@routes/v1/errorLogRoutes');
const phone = require('@routes/v1/phoneRoutes');
const product = require('@routes/v1/productRoutes');
const setting = require('@routes/v1/settingRoutes');

router.use('/', sharedRoutes);
router.use('/', person);
router.use('/', accessLevel);
router.use('/', access);
router.use('/', address);
router.use('/', category);
router.use('/', email);
router.use('/', errorLog);
router.use('/', phone);
router.use('/', product);
router.use('/', setting);

module.exports = router;
