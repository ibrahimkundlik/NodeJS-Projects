const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		trim: true,
		lowercase: true,
		validate(value) {
			if (!validator.isEmail(value)) {
				throw new Error("Email is invalid");
			}
		},
	},
	age: {
		type: Number,
		default: 0,
		validate(value) {
			if (value < 0) {
				throw new Error("Age must be positive number");
			}
		},
	},
	password: {
		type: String,
		required: true,
		trim: true,
		minLength: 7,
		validate(value) {
			if (value.toLowerCase().includes("password")) {
				throw new Error("Please check your password!");
			}
		},
	},
	tokens: [
		{
			token: {
				type: String,
				required: true,
			},
		},
	],
});

// User login function
userSchema.statics.loginCredentials = async (email, password) => {
	const user = await User.findOne({ email });
	if (!user) {
		throw new Error("Unable to Login");
	}

	const passwordValid = await bcrypt.compare(password, user.password);
	if (!passwordValid) {
		throw new Error("Unable to Login");
	}

	return user;
};

// Auth token
userSchema.methods.generateAuthToken = async function () {
	const user = this;
	const token = jwt.sign({ _id: user._id.toString() }, "Bahadurshaikh99");
	user.tokens = user.tokens.concat({ token });
	await user.save();
	return token;
};

// Password hash for user login
userSchema.pre("save", async function (next) {
	const user = this;
	if (user.isModified("password")) {
		user.password = await bcrypt.hash(user.password, 8);
	}
	next();
});

const User = mongoose.model("users", userSchema);

module.exports = User;
