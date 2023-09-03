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
    let error;
    let { name } = err;
    if (name === 'CastError') error = handleCastErrorDB(err);
    if (err.code === 11000) error = handleDuplicateValueErrorDB(err);
    sendErrorProd(res, error);
  }
};
