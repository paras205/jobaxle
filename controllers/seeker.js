const Seeker = require('../models/seeker');
const Job = require('../models/jobs');
const AppError = require('../utils/appError');

exports.createSeeker = async (req, res) => {
	try {
		console.log(req.user._id);
		const seeker = await Seeker.create({
			...req.body,
			profileId: req.user._id
		});
		res.status(201).json({
			status: 'success',
			data: seeker
		});
	} catch (err) {
		console.log(err);
	}
};

exports.getAllSeekers = async (req, res) => {
	try {
		const seekers = await Seeker.find().populate('profileId');
		res.status(200).json({
			status: 'success',
			result: seekers.length,
			data: seekers
		});
	} catch (err) {
		console.log(err);
	}
};

exports.showRecommendation = async (req, res) => {
	try {
		const jobs = await Job.find();
		const seeker = await Seeker.findById(req.params.id);
		const result = jobs.filter((item) => {
			return (
				item.jobType === seeker.availableFor ||
				item.jobLevel === seeker.lookingFor
			);
		});
		res.status(200).json({
			status: 'success',
			total: result.length,
			data: result
		});
	} catch (err) {
		console.log(err);
	}
};
