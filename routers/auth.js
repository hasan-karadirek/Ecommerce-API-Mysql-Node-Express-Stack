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
/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication endpoints
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user and return an access_token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: User's first name.
 *               lastName:
 *                 type: string
 *                 description: User's last name.
 *               email:
 *                 type: string
 *                 description: User's email address.
 *               password:
 *                 type: string
 *                 description: User's password.
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - password
 *     responses:
 *       201:
 *         description: User registered successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 access_token:
 *                   type: string
 *                   description: JWT token for user.
 *                 customer:
 *                   type: object
 *                   description: User's information.
 *       400:
 *         description: Missing arguments.
 */
router.post('/register', register);
/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: User Login
 *     description: Authenticate a user and provide an access_token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email address.
 *               password:
 *                 type: string
 *                 description: User's password.
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: User access token generated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 access_token:
 *                   type: string
 *                   description: JWT token for user.
 *                 customer:
 *                   type: object
 *                   description: User's information.
 *       400:
 *         description: Missing arguments or credentials.
 */
router.post('/login', login);
/**
 * @swagger
 * /api/auth/logout:
 *   get:
 *     summary: User Logout
 *     description: Logout the user.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User logged out successfully.
 *       400:
 *         description: Missing arguments or authorization.
 *       401:
 *         description: Unauthorized.
 */
router.get('/logout', getAccessToRoute, logout);
/**
 * @swagger
 * /api/auth/forgotpassword:
 *   post:
 *     summary: Forgot Password
 *     description: Send an email to the provided email address for password reset.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email address.
 *             required:
 *               - email
 *     responses:
 *       200:
 *         description: Email sent successfully.
 *       400:
 *         description: Missing arguments.
 */

router.post('/forgotpassword', forgotPassword);
/**
 * @swagger
 * /api/auth/resetpassword:
 *   put:
 *     summary: Reset Password
 *     description: Reset user's password.
 *     parameters:
 *       - in: query
 *         name: resetPasswordToken
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newPassword:
 *                 type: string
 *                 description: New password.
 *             required:
 *               - newPassword
 *     responses:
 *       200:
 *         description: Password changed successfully.
 *       400:
 *         description: Missing arguments, authorization, or user not exist.
 *       401:
 *         description: Unauthorized.
 *       404:
 *         description: User not found.
 */

router.put('/resetpassword', resetpassword);

module.exports = router;
