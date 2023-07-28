const fs = require('fs');
const express = require('express');

const app = express();

app.use(express.json());

// app.use((req, res, next) => {
//   req.timeRequested = new Date().toISOString();
//   console.log('hi')
//   next();
// });

const tours = JSON.parse(fs.readFileSync('./dev-data/data/tours.json'));

const getAllTours = (req, res) => {
  res.json({
    status: 'success',
    timeRequested: req.timeRequested,
    results: tours.length,
    data: {
      tours,
    },
  });
};

const addNewTour = (req, res) => {
  const newId = tours.length + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  console.log(req.body);
  tours.push(newTour);
  fs.writeFile('./dev-data/data/tours.json', JSON.stringify(tours), (err) => {
    try {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    } catch {
      res.end(err);
    }
  });
};

const getSingleTour = (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1;
  console.log(id);
  const tour = tours.find((item) => item.id === id);
  console.log(tour);
  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

// Commented Because We Now Have More Simplified Way Below Them
// app.get('/api/v1/tours', getAllTours);

// app.post('/api/v1/tours', addNewTour);

// app.get('/api/v1/tours/:id', getSingleTour);

const tourRouter = express.Router();
app.use('/api/v1/tours', tourRouter);
tourRouter.route('/').get(getAllTours).post(addNewTour);
tourRouter.route('/:id').get(getSingleTour);

// app.route('/api/v1/tours').get(getAllTours).post(addNewTour);
// app.route('/api/v1/tours/:id').get(getSingleTour)

const port = 8000;
app.listen(port, () => {
  console.log(`App Running on port ${port}`);
});
