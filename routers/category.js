const express = require('express');
const router = express.Router();
const { addCategory } = require('../controllers/category.js');

router.post('/add', addCategory);

module.exports = router;
