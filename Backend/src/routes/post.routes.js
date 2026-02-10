const express = require('express');
const { createPost, getPosts, getPostById, likePost, addComment, deletePost } = require('../controllers/post.controller');
const verifyJWT = require('../middlewares/auth.middleware');
const { body } = require('express-validator');
const validate = require('../middlewares/validate.middleware');

const router = express.Router();

router.use(verifyJWT);

router.post('/', [
  body('content')
    .trim()
    .isLength({ min: 1, max: 280 })
    .withMessage('Post content must be between 1 and 280 characters'),
  body('images')
    .optional()
    .isArray()
    .withMessage('Images must be an array of URLs')
], validate, createPost);

router.get('/', getPosts);

router.get('/:postId', getPostById);

router.post('/:postId/like', likePost);

router.post('/:postId/comment', [
  body('content')
    .trim()
    .isLength({ min: 1, max: 280 })
    .withMessage('Comment must be between 1 and 280 characters')
], validate, addComment);

router.delete('/:postId', deletePost);

module.exports = router;
