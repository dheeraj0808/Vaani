const ApiResponse = require('../utils/ApiResponse');
const asyncHandler = require('../utils/asyncHandler');
const Story = require('../models/story.model');
const ApiError = require('../utils/ApiError');

const createStory = asyncHandler(async (req, res) => {
  const { content, mediaUrl, mediaType } = req.body;

  const story = await Story.create({
    content,
    mediaUrl,
    mediaType,
    author: req.user._id
  });

  const populatedStory = await Story.findById(story._id)
    .populate('author', 'username fullName avatar');

  return res
    .status(201)
    .json(new ApiResponse(201, populatedStory, 'Story created successfully'));
});

const getStories = asyncHandler(async (req, res) => {
  const stories = await Story.find({
    expiresAt: { $gt: new Date() }
  })
    .sort({ createdAt: -1 })
    .populate('author', 'username fullName avatar')
    .populate('viewers.user', 'username fullName avatar');

  return res
    .status(200)
    .json(new ApiResponse(200, stories, 'Stories fetched successfully'));
});

const viewStory = asyncHandler(async (req, res) => {
  const { storyId } = req.params;

  const story = await Story.findById(storyId);
  if (!story) {
    throw new ApiError(404, 'Story not found');
  }

  if (story.expiresAt < new Date()) {
    throw new ApiError(410, 'Story has expired');
  }

  const alreadyViewed = story.viewers.some(
    viewer => viewer.user.toString() === req.user._id.toString()
  );

  if (!alreadyViewed) {
    story.viewers.push({
      user: req.user._id,
      viewedAt: new Date()
    });
    await story.save();
  }

  const updatedStory = await Story.findById(storyId)
    .populate('author', 'username fullName avatar')
    .populate('viewers.user', 'username fullName avatar');

  return res
    .status(200)
    .json(new ApiResponse(200, updatedStory, 'Story viewed successfully'));
});

const deleteStory = asyncHandler(async (req, res) => {
  const { storyId } = req.params;

  const story = await Story.findById(storyId);
  if (!story) {
    throw new ApiError(404, 'Story not found');
  }

  if (story.author.toString() !== req.user._id.toString()) {
    throw new ApiError(403, 'You are not authorized to delete this story');
  }

  await Story.findByIdAndDelete(storyId);

  return res
    .status(200)
    .json(new ApiResponse(200, null, 'Story deleted successfully'));
});

module.exports = {
  createStory,
  getStories,
  viewStory,
  deleteStory
};
