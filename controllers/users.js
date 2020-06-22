const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const AppError = require('../utils/appError');

const signToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES
	});
};

exports.register = async (req, res) => {
	try {
		const user = await User.create(req.body);
		const token = signToken(user._id);
		res.status(201).json({
			status: 'success',
			token,
			user
		});
	} catch (err) {
		console.log(err);
	}
};

exports.login = async (req, res, next) => {
	try {
		const { email, password } = req.body;
		if (!email || !password) {
			return next(new AppError('Please enter and password', 400));
		}
		const user = await User.findOne({ email }).select('+password');
		if (!user || !await user.comparePassword(password, user.password)) {
			return next(new AppError('Incorrect email or password', 401));
		}
		const token = signToken(user._id);
		res.status(201).json({
			status: 'success',
			token,
			user: user.name
		});
	} catch (err) {
		console.log(err);
	}
};

exports.protect = async (req, res, next) => {
	try {
		let token;
		if (
			req.headers.authorization &&
			req.headers.authorization.startsWith('Bearer')
		) {
			token = req.headers.authorization.split(' ')[1];
		}
		if (!token) {
			return next(new AppError('Unauthorized', 401));
		}
		let decoded;
		try {
			decoded = await promisify(jwt.verify)(
				token,
				process.env.JWT_SECRET
			);
		} catch (err) {
			res.status(401).json({
				status: 'fail',
				message: 'Invalid token'
			});
		}
		const currentUser = await User.findById(decoded.id);
		if (!currentUser) {
			return next(
				new AppError('The user belongs to token does not exists', 401)
			);
		}
		req.user = currentUser;
		next();
	} catch (err) {
		console.log(err);
	}
};

exports.accessTo = (...roles) => {
	return (req, res, next) => {
		if (!roles.includes(req.user.role)) {
			return next(
				new AppError(
					'You do not have permission to perfom this action',
					403
				)
			);
		}
		next();
	};
};
