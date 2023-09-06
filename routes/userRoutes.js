const express = require('express');
const { signup } = require('../controllers/authController');

const router = new express.Router();

router.post('/signup', signup);

module.exports = router;
