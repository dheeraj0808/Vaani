const User = require('../models/user.model');
const ApiError = require('../utils/ApiError');
const { generateAccessToken, generateRefreshToken } = require('./token.service');

const registerUser = async (userData) => {
  const { username, email, password, fullName } = userData;

  // Check if user already exists
  const existingUser = await User.findByUsernameOrEmail(username, email);

  if (existingUser) {
    throw new ApiError(409, 'User with this username or email already exists');
  }

  // Create user (password hashing happens inside User.create)
  const user = await User.create({ username, email, password, fullName });

  if (!user) {
    throw new ApiError(500, 'Something went wrong while registering the user');
  }

  const accessToken = generateAccessToken(user.id);
  const refreshToken = generateRefreshToken(user.id);

  // Save refresh token
  await User.updateById(user.id, { refresh_token: refreshToken });

  return {
    user: User.toJSON(user),
    accessToken,
    refreshToken
  };
};

const loginUser = async (loginData) => {
  const { username, email, password } = loginData;

  // Find user by username or email
  const user = await User.findByUsernameOrEmail(username, email);

  if (!user) {
    throw new ApiError(404, 'User does not exist');
  }

  const isPasswordValid = await User.isPasswordCorrect(password, user.password);

  if (!isPasswordValid) {
    throw new ApiError(401, 'Invalid user credentials');
  }

  const accessToken = generateAccessToken(user.id);
  const refreshToken = generateRefreshToken(user.id);

  // Save refresh token
  await User.updateById(user.id, { refresh_token: refreshToken });

  return {
    user: User.toJSON(user),
    accessToken,
    refreshToken
  };
};

const logoutUser = async (userId) => {
  await User.updateById(userId, { refresh_token: null });
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser
};
