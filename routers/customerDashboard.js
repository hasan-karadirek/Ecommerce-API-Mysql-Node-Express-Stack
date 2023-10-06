const express = require('express');
const { getAccessToRoute } = require('../middlewares/authorization/auth');
const { getCustomerDashboard } = require('../controllers/customerDashboard');
const router = express.Router();

router.get('/', getAccessToRoute, getCustomerDashboard);

module.exports = router;
