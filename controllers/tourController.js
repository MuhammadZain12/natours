const Tour =require('./../models/tourModel')

exports.getAllTours = (req, res) => {
  res.json({
    // status: 'success',
    // timeRequested: req.timeRequested,
    // results: tours.length,
    // data: {
    //   tours,
    // },
  });
};

exports.addNewTour = async (req, res) => {
  try{
    const newTour=await Tour.create(req.body)
    res.status(201).json({
      status:'success',
      data:{
        tour:newTour,
      }
    })
  }catch(err){
    res.status(404).json({
      status:'fail',
      message:err,
    })
  }
};

exports.getSingleTour = (req, res) => {
  // const id = req.params.id * 1;
  // const tour = tours.find((item) => item.id === id);
  // console.log(tour);
  // res.status(200).json({
  //   status: 'success',
  //   data: {
  //     tour,
  //   },
  // });
};
