const ApiResponse = require('../utils/ApiResponse');
const asyncHandler = require('../utils/asyncHandler');
const { registerUser, loginUser, logoutUser } = require('../services/auth.service');

const register = asyncHandler(async (req, res) => {
  const { username, email, password, fullName } = req.body;

  const { user, accessToken, refreshToken } = await registerUser({
    username,
    email,
    password,
    fullName
  });

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production'
  };

  return res
    .status(201)
    .cookie('accessToken', accessToken, options)
    .cookie('refreshToken', refreshToken, options)
    .json(
      new ApiResponse(
        201,
        { user, accessToken, refreshToken },
        'User registered successfully'
      )
    );
});

const login = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  const { user, accessToken, refreshToken } = await loginUser({
    username,
    email,
    password
  });

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production'
  };

  return res
    .status(200)
    .cookie('accessToken', accessToken, options)
    .cookie('refreshToken', refreshToken, options)
    .json(
      new ApiResponse(
        200,
        { user, accessToken, refreshToken },
        'User logged in successfully'
      )
    );
});

const logout = asyncHandler(async (req, res) => {
  await logoutUser(req.user._id);

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production'
  };

  return res
    .status(200)
    .clearCookie('accessToken', options)
    .clearCookie('refreshToken', options)
    .json(new ApiResponse(200, {}, 'User logged out successfully'));
});

module.exports = {
  register,
  login,
  logout
};
