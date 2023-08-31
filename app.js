const fs = require('fs');
const express = require('express');
const tourRouter = require('./routes/tourRoutes');
const AppError = require('./utils/appError');
const gloablErrorHandler = require('./controllers/errorController');

const app = express();

console.log(app.get('env'));

app.use(express.json());

// app.use((req, res, next) => {
//   req.timeRequested = new Date().toISOString();
//   console.log('hi')
//   next();
// });

// Commented Because We Now Have More Simplified Way Below Them
// app.get('/api/v1/tours', getAllTours);

// app.post('/api/v1/tours', addNewTour);

// app.get('/api/v1/tours/:id', getSingleTour);

app.use('/api/v1/tours', tourRouter);

// app.route('/api/v1/tours').get(getAllTours).post(addNewTour);
// app.route('/api/v1/tours/:id').get(getSingleTour)

// Error Handling
app.all('*', (req, res, next) => {
  next(new AppError(`can't find ${req.originalUrl} on this server!`, 404));
});

app.use(gloablErrorHandler);

module.exports = app;
