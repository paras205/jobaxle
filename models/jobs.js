const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
	categoryType: {
		type: String,
		enum: [ 'itAndCommunication', 'otherCategory' ]
	},
	industryType: {
		type: String,
		enum: [ 'itAndCommunication', 'otherCategory' ]
	},
	applyBefore: {
		type: Number
	},
	companyName: {
		type: String
	},
	companyEmail: {
		type: String,
		sparse: true,
		unique: true
	},
	companyProfile: {
		type: String
	},
	jobTitle: {
		type: String
	},
	noofVacancy: {
		type: Number
	},
	purpose: {
		type: String
	},
	jobType: {
		type: String,
		enum: [ 'partTime', 'fullTime', 'contractTime' ]
	},
	jobLevel: {
		type: String,
		enum: [ 'internLevel', 'entryLevel', 'midLevel', 'seniorLevel' ]
	},
	experienceRequired: {
		type: String,
		enum: [ 'fresher ', 'noExperience', 'experience' ]
	},
	educationPreference: {
		type: String,
		enum: [
			'UnderSLC ',
			'SLC',
			'Intermediate',
			'Master',
			'Bachelor',
			'Phd'
		]
	},
	degreeName: {
		type: String
	},
	gender: {
		type: String,
		enum: [ 'male', 'female', 'others' ]
	},
	salary: {
		type: String,
		enum: [ 'fixed ', 'negotiable', 'range' ]
	},
	educationRequired: {
		type: String
	},
	jobDescription: {
		type: String
	},
	jobBenefits: {
		type: String
	},
	isActive: {
		type: Boolean,
		default: true
	}
});
jobSchema.index({
	categoryType: 'text',
	jobDescription: 'text',
	jobTitle: 'text',
	companyName: 'text'
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
