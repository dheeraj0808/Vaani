const express = require('express');
const { createStory, getStories, viewStory, deleteStory } = require('../controllers/story.controller');
const verifyJWT = require('../middlewares/auth.middleware');
const { body } = require('express-validator');
const validate = require('../middlewares/validate.middleware');

const router = express.Router();

router.use(verifyJWT);

router.post('/', [
  body('content')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Story content is required'),
  body('mediaUrl')
    .isURL()
    .withMessage('Media URL must be a valid URL'),
  body('mediaType')
    .isIn(['image', 'video'])
    .withMessage('Media type must be either image or video')
], validate, createStory);

router.get('/', getStories);

router.post('/:storyId/view', viewStory);

router.delete('/:storyId', deleteStory);

module.exports = router;
