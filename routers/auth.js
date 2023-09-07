const express = require('express');
const router = express.Router();
const {
  register,
  login,
  logout,
  forgotPassword,
  resetpassword,
} = require('../controllers/auth.js');
const { getAccessToRoute } = require('../middlewares/authorization/auth.js');

router.post('/register', register);
router.post('/login', login);
router.get('/logout', getAccessToRoute, logout);
router.post('/forgotpassword', forgotPassword);
router.put('/resetpassword', resetpassword);

module.exports = router;
