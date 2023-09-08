const jwt = require('jsonwebtoken');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/userModel');
const AppError = require('../utils/appError');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRETE, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  };
  const newUser = await User.create(newUserData);

  token = signToken(newUser._id);

  res.status(201).json({
    status: 'success',
    token,
    data: {
      user: newUser,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  //Check If client provided complete data
  if (!email || !password) {
    return next(new AppError(`Please provide email and password`, 400));
  }

  //Check If User Exist
  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.matchPassword(password, user.password))) {
    return next(new AppError(`Incorrect email or password`, 401));
  }

  token = signToken(user._id);
  res.status(200).json({
    status: 'success',
    token,
  });
});
