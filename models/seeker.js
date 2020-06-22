const mongoose = require('mongoose');

const seekerSchema = new mongoose.Schema({
	fullName: {
		type: String,
		required: true,
		unique: true
	},
	profileId: {
		type: mongoose.Schema.ObjectId,
		ref: 'User'
	},
	DateOfBirth: {
		type: Date
	},
	Nationality: {
		type: String
	},
	permanentAddress: {
		type: String
	},
	currentAddress: {
		type: String
	},
	phoneNo: {
		type: Number
	},
	gender: {
		type: String,
		enum: [ 'male', 'female', 'others' ]
	},
	maritalStatus: {
		type: String,
		enum: [ 'married', 'unmarried' ]
	},
	drivingLicense: {
		type: Boolean
	},
	specialQualification: {
		type: String
	},
	careerObjective: {
		type: String
	},
	lookingFor: {
		type: String,
		enum: [ 'internLevel', 'entryLevel', 'midLevel', 'seniorLevel' ]
	},
	availableFor: {
		type: String,
		enum: [ 'fullTime', 'partTime', 'contractTime' ]
	},
	skills: {
		type: String
	},
	education: [
		{
			level: {
				type: String
			},
			degreeName: {
				type: String
			},
			specialization: {
				type: String
			},
			passedYear: {
				type: Date
			},
			educationBoard: {
				type: String
			},
			nameofInstitute: {
				type: String
			}
		}
	],
	experience: [
		{
			organizationName: {
				type: String
			},
			address: {
				type: String
			},
			jobCategory: {
				type: String
			},
			jobLevel: {
				type: String
			},
			designation: {
				type: String
			},
			startDate: {
				type: Date
			},
			endDate: {
				type: Date
			},
			description: {
				type: String
			}
		}
	],
	projectInfo: [
		{
			projectTitle: {
				type: String
			},
			duration: {
				type: Number
			},
			projectUrl: {
				type: String
			},
			description: {
				type: String
			}
		}
	],
	isActive: {
		type: Boolean
	},
	recommendatedJobs: [
		{
			type: mongoose.Schema.ObjectId,
			ref: 'Job'
		}
	]
});

const Seeker = mongoose.model('Seeker', seekerSchema);

module.exports = Seeker;
