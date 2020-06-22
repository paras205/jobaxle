const express = require('express');
const jobController = require('../controllers/job');

const router = express.Router();

router.route('/').post(jobController.createjob).get(jobController.getAllJobs);
router.route('/jobs-by-category').get(jobController.jobByCategory);
router.route('/search-jobs').get(jobController.searchJobs);

module.exports = router;
