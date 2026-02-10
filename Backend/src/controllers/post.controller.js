const ApiResponse = require('../utils/ApiResponse');
const asyncHandler = require('../utils/asyncHandler');
const Post = require('../models/post.model');
const ApiError = require('../utils/ApiError');

const createPost = asyncHandler(async (req, res) => {
  const { content, images } = req.body;

  const post = await Post.create({
    content,
    author: req.user._id,
    images: images || []
  });

  const populatedPost = await Post.findById(post._id)
    .populate('author', 'username fullName avatar')
    .populate('comments.author', 'username fullName avatar');

  return res
    .status(201)
    .json(new ApiResponse(201, populatedPost, 'Post created successfully'));
});

const getPosts = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const posts = await Post.find({ isReply: false })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .populate('author', 'username fullName avatar')
    .populate('comments.author', 'username fullName avatar')
    .populate('likes', 'username fullName avatar')
    .populate('retweets', 'username fullName avatar');

  const totalPosts = await Post.countDocuments({ isReply: false });

  return res
    .status(200)
    .json(new ApiResponse(200, {
      posts,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalPosts / limit),
        totalPosts
      }
    }, 'Posts fetched successfully'));
});

const getPostById = asyncHandler(async (req, res) => {
  const { postId } = req.params;

  const post = await Post.findById(postId)
    .populate('author', 'username fullName avatar')
    .populate('comments.author', 'username fullName avatar')
    .populate('likes', 'username fullName avatar')
    .populate('retweets', 'username fullName avatar');

  if (!post) {
    throw new ApiError(404, 'Post not found');
  }

  return res
    .status(200)
    .json(new ApiResponse(200, post, 'Post fetched successfully'));
});

const likePost = asyncHandler(async (req, res) => {
  const { postId } = req.params;

  const post = await Post.findById(postId);
  if (!post) {
    throw new ApiError(404, 'Post not found');
  }

  if (post.likes.includes(req.user._id)) {
    post.likes = post.likes.filter(id => id.toString() !== req.user._id.toString());
  } else {
    post.likes.push(req.user._id);
  }

  await post.save();

  const updatedPost = await Post.findById(postId)
    .populate('author', 'username fullName avatar')
    .populate('comments.author', 'username fullName avatar')
    .populate('likes', 'username fullName avatar')
    .populate('retweets', 'username fullName avatar');

  return res
    .status(200)
    .json(new ApiResponse(200, updatedPost, 'Post like status updated'));
});

const addComment = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const { content } = req.body;

  const post = await Post.findById(postId);
  if (!post) {
    throw new ApiError(404, 'Post not found');
  }

  const comment = {
    content,
    author: req.user._id
  };

  post.comments.push(comment);
  await post.save();

  const updatedPost = await Post.findById(postId)
    .populate('author', 'username fullName avatar')
    .populate('comments.author', 'username fullName avatar')
    .populate('likes', 'username fullName avatar')
    .populate('retweets', 'username fullName avatar');

  return res
    .status(201)
    .json(new ApiResponse(201, updatedPost, 'Comment added successfully'));
});

const deletePost = asyncHandler(async (req, res) => {
  const { postId } = req.params;

  const post = await Post.findById(postId);
  if (!post) {
    throw new ApiError(404, 'Post not found');
  }

  if (post.author.toString() !== req.user._id.toString()) {
    throw new ApiError(403, 'You are not authorized to delete this post');
  }

  await Post.findByIdAndDelete(postId);

  return res
    .status(200)
    .json(new ApiResponse(200, null, 'Post deleted successfully'));
});

module.exports = {
  createPost,
  getPosts,
  getPostById,
  likePost,
  addComment,
  deletePost
};
