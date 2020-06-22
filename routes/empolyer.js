const express = require('express');
const employerController = require('../controllers/employer');

const router = express.Router();

router
	.route('/')
	.post(employerController.createEmployer)
	.get(employerController.getAllEmployes);

module.exports = router;
