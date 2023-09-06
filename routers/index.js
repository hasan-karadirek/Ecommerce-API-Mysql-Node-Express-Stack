const express = require('express');
const router = express.Router();

const auth = require('./auth.js');

router.use('/auth', auth);

router.get('/api/', async (req, res) => {
  return res.status(200).json({
    message: 'server is working',
  });
});
module.exports = router;
