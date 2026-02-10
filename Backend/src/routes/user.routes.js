const express = require('express');
const { getCurrentUser, getUserProfile, updateUserProfile, followUser, unfollowUser } = require('../controllers/user.controller');
const verifyJWT = require('../middlewares/auth.middleware');
const { body } = require('express-validator');
const validate = require('../middlewares/validate.middleware');

const router = express.Router();

router.use(verifyJWT);

router.get('/current', getCurrentUser);

router.get('/:username', getUserProfile);

router.patch('/update-profile', [
  body('fullName')
    .optional()
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('Full name must be between 1 and 50 characters'),
  body('bio')
    .optional()
    .isLength({ max: 160 })
    .withMessage('Bio must be less than 160 characters'),
  body('avatar')
    .optional()
    .isURL()
    .withMessage('Avatar must be a valid URL'),
  body('coverImage')
    .optional()
    .isURL()
    .withMessage('Cover image must be a valid URL')
], validate, updateUserProfile);

router.post('/follow/:userId', followUser);

router.post('/unfollow/:userId', unfollowUser);

module.exports = router;
