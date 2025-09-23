const express = require("express");
const router = express.Router();
const {
  registrationController,
  loginController,
  verifyTokenController,
  refreshController,
  forgotPasswordController,
  resetPasswordController,
} = require("../controllers/authController");

/**
 * @swagger
 * tags:
 *  - name: Auth
 *    description: Authentication APIs
 */

router.post("/registration", registrationController);
/**
 * @swagger
 * /auth/registration:
 *   post:
 *     summary: User For Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Registration Successfully Done. Please check your mail for verification code.
 */
router.get("/verify/:token", verifyTokenController);

router.post("/login", loginController);
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: User For Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Registration Successfully Done. Please check your mail for verification code.
 */
router.post("/refresh", refreshController);
/**
 * @swagger
 * /auth/refresh:
 *   post:
 *     summary: User For generate Access Token
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Registration Successfully Done. Please check your mail for verification code.
 */
router.post("/forgot-password", forgotPasswordController);
/**
 * @swagger
 * /auth/forgot-password:
 *   post:
 *     summary: User For Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Please check your email for reset password.
 */
router.post("/reset-password/:token", resetPasswordController);
/**
 * @swagger
 * /auth//reset-password/:token:
 *   post:
 *     summary: User For Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *               confirmPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password reset successfully done.
 */

module.exports = router;
