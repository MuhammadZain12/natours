// const lodash=require('lodash')
const AppError = require('../utils/appError');

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const handleDuplicateValueErrorDB = (err) => {
  const field = err.message.match(/(["'])(?:\\.|[^\\])*?\1/);
  const message = `Duplicate field value ${field[0]} Please use another value`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((item) => item.message);
  const message = `Validation Error : ${errors.join('. ')}`;
  return new AppError(message, 400);
};

const handleJsonWebTokenError = (err) => {
  message = `Invalid Token! Please login again`;
  return new AppError(message, 401);
};

const handleTokenExpiredError = (err) => {
  const message = `Your token expired! Login again`;
  return new AppError(message, 401);
};

const sendErrorDev = (res, err) => {
  res.status(err.statusCode).json({
    err,
    stack: err.stack,
    status: err.status,
    message: err.message,
  });
};

const sendErrorProd = (res, err) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    res.status(err.statusCode).json({
      status: 500,
      message: 'Something went wrong',
    });
  }
};

module.exports = (err, req, res, next) => {
  //   console.log(err.stack);

  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(res, err);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    if (err.name === 'CastError') error = handleCastErrorDB(err);
    if (err.code === 11000) error = handleDuplicateValueErrorDB(err);
    if (err.name === 'ValidationError') error = handleValidationErrorDB(err);
    if (err.name === 'JsonWebTokenError') error = handleJsonWebTokenError(err);
    if (err.name === 'TokenExpiredError') error = handleTokenExpiredError(err);
    sendErrorProd(res, error);
  }
};
