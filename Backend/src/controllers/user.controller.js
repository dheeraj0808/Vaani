const ApiResponse = require('../utils/ApiResponse');
const asyncHandler = require('../utils/asyncHandler');
const User = require('../models/user.model');

const getCurrentUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, req.user, 'User fetched successfully'));
});

const getUserProfile = asyncHandler(async (req, res) => {
  const { username } = req.params;

  const user = await User.findOne({ username })
    .select('-password -refreshToken')
    .populate('followers', 'username fullName avatar')
    .populate('following', 'username fullName avatar');

  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  return res
    .status(200)
    .json(new ApiResponse(200, user, 'User profile fetched successfully'));
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const { fullName, bio, avatar, coverImage } = req.body;

  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        fullName,
        bio,
        avatar,
        coverImage
      }
    },
    { new: true }
  ).select('-password -refreshToken');

  return res
    .status(200)
    .json(new ApiResponse(200, user, 'Profile updated successfully'));
});

const followUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  if (userId === req.user._id.toString()) {
    throw new ApiError(400, 'You cannot follow yourself');
  }

  const userToFollow = await User.findById(userId);
  if (!userToFollow) {
    throw new ApiError(404, 'User not found');
  }

  const currentUser = await User.findById(req.user._id);

  if (currentUser.following.includes(userId)) {
    throw new ApiError(400, 'You are already following this user');
  }

  currentUser.following.push(userId);
  userToFollow.followers.push(req.user._id);

  await currentUser.save();
  await userToFollow.save();

  return res
    .status(200)
    .json(new ApiResponse(200, null, 'User followed successfully'));
});

const unfollowUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const currentUser = await User.findById(req.user._id);
  const userToUnfollow = await User.findById(userId);

  if (!userToUnfollow) {
    throw new ApiError(404, 'User not found');
  }

  currentUser.following = currentUser.following.filter(
    id => id.toString() !== userId
  );
  userToUnfollow.followers = userToUnfollow.followers.filter(
    id => id.toString() !== req.user._id.toString()
  );

  await currentUser.save();
  await userToUnfollow.save();

  return res
    .status(200)
    .json(new ApiResponse(200, null, 'User unfollowed successfully'));
});

module.exports = {
  getCurrentUser,
  getUserProfile,
  updateUserProfile,
  followUser,
  unfollowUser
};
