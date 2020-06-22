const Job = require('../models/jobs');

exports.createjob = async (req, res) => {
	try {
		const job = await Job.create(req.body);
		res.status(201).json({
			status: 'success',
			data: job
		});
	} catch (err) {
		console.log(err);
	}
};

exports.getAllJobs = async (req, res) => {
	try {
		const jobs = await Job.find();
		res.status(200).json({
			status: 'success',
			result: jobs.length,
			data: jobs
		});
	} catch (err) {
		console.log(err);
	}
};

exports.jobByCategory = async (req, res) => {
	try {
		const jobs = await Job.find();
		const filteredJobs = jobs.filter((item) => {
			return item.categoryType === req.query.catName;
		});
		res.status(200).json({
			status: 'success',
			result: filteredJobs.length,
			data: filteredJobs
		});
	} catch (err) {
		console.log(err);
	}
};

exports.searchJobs = async (req, res) => {
	try {
		const searchResult = await Job.find(
			{ $text: { $search: req.query.search } },
			{ score: { $meta: 'textScore' } }
		).sort({ score: { $meta: 'textScore' } });
		res.status(201).json({
			status: 'success',
			result: searchResult.length,
			data: searchResult
		});
	} catch (err) {
		console.log(err);
	}
};
