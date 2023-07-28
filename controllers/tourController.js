const fs = require('fs');

const tours = JSON.parse(fs.readFileSync('./dev-data/data/tours.json'));


exports.checkId=(req,res,next,val)=>{
    if(val>tours.length){
        return res.status(404).json({
            status:"fail",
            data:"No Data To show",
        })    
    }
    next()
}


exports.getAllTours = (req, res) => {
  res.json({
    status: 'success',
    timeRequested: req.timeRequested,
    results: tours.length,
    data: {
      tours,
    },
  });
};

exports.addNewTour = (req, res) => {
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

exports.getSingleTour = (req, res) => {
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
