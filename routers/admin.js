const express = require('express');
const { adminLogin, adminDashboard } = require('../controllers/admin');
const { getAccessToAdmin } = require('../middlewares/authorization/auth');
const router = express.Router();

/**
 * @swagger
 * /api/admin/login:
 *   post:
 *     summary: Admin Login
 *     description: Authenticate an admin user and provide an admin_access_token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Admin's email address.
 *               password:
 *                 type: string
 *                 description: Admin's password.
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Admin access token generated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 admin_access_token:
 *                   type: string
 *                   description: JWT token for admin user.
 *       400:
 *         description: Admin Credentials do not match.
 */

router.post('/login', adminLogin);

/**
 * @swagger
 * /api/admin/dashboard:
 *   get:
 *     summary: Admin Dashboard
 *     description: Get admin dashboard data.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Admin dashboard data.
 *       401:
 *         description: Unauthorized.
 */
router.get('/dashboard', getAccessToAdmin, adminDashboard);

// router.post('/createAdmin', async (req, res, next) => {
//   const admin = await Admin.create({
//     name: 'Hasan',
//     email: 'hasankaradirek3@gmail.com',
//     password: '123qwe123',
//   });
//   await admin.save();
//   console.log(admin);
//   return res.status(200).json({});
// });

module.exports = router;
