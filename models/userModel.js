const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JsonWebTokenError } = require('jsonwebtoken');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		maxlength: [20, 'Your name should not exceede 20 characters'],
		minlength: [1, 'Your name should contain at least 5 characters'],
	},
	email: {
		type: String,
		required: [true, 'Please enter your email'],
		unique: true,
		validate: [validator.isEmail, 'Please Enter a valid Email'],
	},
	password: {
		type: String,
		required: [true, 'Please enter your password'],
		minlength: [2, 'Your password should contain at least 2 characters'],
		select: false,
	},
	phone: {
		type: String,
		required: [true, 'Please enter your phone'],
		minlength: [1, 'Your phone should contain at least 2 characters'],
		select: true,
	},
	bankAccount: {
		type: String,
		minlength: [1, 'Your phone should contain at least 2 characters'],
		required: [true, 'Please enter your Bank Account Number'],
		select: true,
	},
	// img: {
	// 	data: Buffer,
	// 	contentType: { type: String, default: '' },
	// },
	role: {
		type: String,
		default: 'user',
	},

	resetPasswordToken: String,
	resetPasswordExpire: Date,
});

userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) {
		next();
	}

	this.password = await bcrypt.hash(this.password, 10);
});

//JWT token for logged in user

userSchema.methods.getJWTToken = function () {
	return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRE,
	});
};

// Compare passwrod method

userSchema.methods.ComparePassword = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password);
};

//Generate Password reset Token

userSchema.methods.getPasswordResetToken = function () {
	const resetToken = crypto.randomBytes(30).toString('hex');

	//hashing and adding token to userSchema in resetPasswordToken

	this.resetPasswordToken = crypto
		.createHash('sha256')
		.update(resetToken)
		.digest('hex');
	this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

	return resetToken;
};

module.exports = mongoose.model('User', userSchema);
