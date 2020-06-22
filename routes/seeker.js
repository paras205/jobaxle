const express = require('express');
const seekerController = require('../controllers/seeker');
const userController = require('../controllers/users');

const router = express.Router();

router
	.route('/')
	.post(
		userController.protect,
		userController.accessTo('seeker'),
		seekerController.createSeeker
	)
	.get(seekerController.getAllSeekers);

router.route('/:id').get(seekerController.showRecommendation);

module.exports = router;
