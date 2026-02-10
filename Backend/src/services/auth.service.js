const User = require('../models/user.model');
const ApiError = require('../utils/ApiError');
const asyncHandler = require('../utils/asyncHandler');
const { generateAccessToken, generateRefreshToken } = require('./token.service');

const registerUser = asyncHandler(async (userData) => {
  const { username, email, password, fullName } = userData;

  const existingUser = await User.findOne({
    $or: [{ username }, { email }]
  });

  if (existingUser) {
    throw new ApiError(409, 'User with this username or email already exists');
  }

  const user = await User.create({
    username,
    email,
    password,
    fullName
  });

  const createdUser = await User.findById(user._id);

  if (!createdUser) {
    throw new ApiError(500, 'Something went wrong while registering the user');
  }

  const accessToken = generateAccessToken(createdUser._id);
  const refreshToken = generateRefreshToken(createdUser._id);

  createdUser.refreshToken = refreshToken;
  await createdUser.save();

  return {
    user: createdUser,
    accessToken,
    refreshToken
  };
});

const loginUser = asyncHandler(async (loginData) => {
  const { username, email, password } = loginData;

  const user = await User.findOne({
    $or: [{ username }, { email }]
  });

  if (!user) {
    throw new ApiError(404, 'User does not exist');
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, 'Invalid user credentials');
  }

  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);

  user.refreshToken = refreshToken;
  await user.save();

  return {
    user,
    accessToken,
    refreshToken
  };
});

const logoutUser = asyncHandler(async (userId) => {
  await User.findByIdAndUpdate(
    userId,
    {
      $unset: {
        refreshToken: 1
      }
    },
    {
      new: true
    }
  );
});

module.exports = {
  registerUser,
  loginUser,
  logoutUser
};
