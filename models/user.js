const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true,
		trim: true
	},
	password: {
		type: String,
		minlength: 8,
		required: true,
		select: false
	},
	passwordConfirm: {
		type: String,
		minlength: 8,
		select: false
	},
	role: {
		type: String,
		enum: [ 'admin', 'seeker', 'employer' ]
	},
	active: {
		type: Boolean
	}
});

userSchema.pre('save', async function(next) {
	if (!this.isModified('password')) return next();
	this.password = await bcrypt.hash(this.password, 12);
	this.passwordConfirm = undefined;
	next();
});

userSchema.methods.comparePassword = async function(
	candidatePassword,
	userPassword
) {
	return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
