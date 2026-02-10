const express = require('express');
const { body } = require('express-validator');
const { register, login, logout } = require('../controllers/auth.controller');
const validate = require('../middlewares/validate.middleware');
const verifyJWT = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/register', [
  body('username')
    .trim()
    .isLength({ min: 3, max: 30 })
    .withMessage('Username must be between 3 and 30 characters'),
  body('email')
    .isEmail()
    .withMessage('Please enter a valid email address')
    .normalizeEmail(),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  body('fullName')
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('Full name is required and must be less than 50 characters')
], validate, register);

router.post('/login', [
  body('username').optional().trim(),
  body('email').optional().isEmail().withMessage('Please enter a valid email address'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
], validate, login);

router.post('/logout', verifyJWT, logout);

module.exports = router;
