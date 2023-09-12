const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const catchAsync = require('../utils/catchAsync');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A name is required for user'],
    maxlength: [40, 'Name must not be greater than 40 characters'],
    minlength: [5, 'Name must be greater than 5 characters'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail],
  },
  photo: { type: String },
  password: {
    type: String,
    required: [true, 'Please provide a password.'],
    minlength: [8, 'Password should be greater than 8 characters.'],
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password.'],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords are not the same !',
    },
  },
  passwordChangedAt: Date,
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.matchPassword = async function (
  candidatePaswword,
  userPassword
) {
  return await bcrypt.compare(candidatePaswword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimeStamp) {
  console.log(
    'here : ',
    parseInt(this.passwordChangedAt.getTime() / 1000, 10) < JWTTimeStamp
  );
  return parseInt(this.passwordChangedAt.getTime() / 1000, 10) < JWTTimeStamp;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
