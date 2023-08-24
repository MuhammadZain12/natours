const express = require('express');
const tourController = require('./../controllers/tourController');

const router = express.Router();
router
  .route('/top-5-tours')
  .get(tourController.aliasTopTours, tourController.getAllTours);
router.route('/tours-stats').get(tourController.tourStats);
router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.addNewTour);
router
  .route('/:id')
  .get(tourController.getSingleTour)
  .patch(tourController.updateTour)
  .delete(tourController.daeleteTour);

module.exports = router;

// Old Code
// router.param('id', tourController.checkId);
