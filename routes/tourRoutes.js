const express = require('express');
const tourController = require('./../controllers/tourController');

const router = express.Router();

router.param('id', tourController.checkId);

router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.addNewTour);
router.route('/:id').get(tourController.getSingleTour);

module.exports = router;
