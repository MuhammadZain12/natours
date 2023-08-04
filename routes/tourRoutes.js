const express = require('express');
const tourController = require('./../controllers/tourController');

const router = express.Router();

router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.addNewTour);
router.route('/:id').get(tourController.getSingleTour);

module.exports = router;



// Old Code 
// router.param('id', tourController.checkId);