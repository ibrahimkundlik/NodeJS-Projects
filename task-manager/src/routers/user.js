const express = require("express");
const User = require("../models/user");
const auth = require("../middleware/auth");
const multer = require("multer");
const sharp = require("sharp");
const { welcomeEmail, cancelEmail } = require("../emails/account");
const router = new express.Router();

// Login User
router.post("/users/login", async (req, res) => {
	try {
		const user = await User.loginCredentials(req.body.email, req.body.password);

		const token = await user.generateAuthToken();

		res.send({ user, token });
	} catch (err) {
		res.status(400).send({ error: "Unable to Login" });
	}
});

// Logout User
router.post("/users/logout", auth, async (req, res) => {
	try {
		req.user.tokens = req.user.tokens.filter(
			(each) => each.token !== req.token
		);
		await req.user.save();
		res.send();
	} catch (err) {
		res.status(500).send();
	}
});

// LogoutAll tokens
router.post("/users/logoutAll", auth, async (req, res) => {
	try {
		req.user.tokens = [];
		await req.user.save();
		res.send();
	} catch (err) {
		res.status(500).send();
	}
});

// Create User
router.post("/users", async (req, res) => {
	const user = new User(req.body);
	try {
		await user.save();
		welcomeEmail(user.email, user.name);
		const token = await user.generateAuthToken();
		res.status(201).send({ user, token });
	} catch (err) {
		res.status(400).send(err);
	}
});

// Read User
router.get("/users/me", auth, async (req, res) => {
	res.send(req.user);
});

// Update User
router.patch("/users/me", auth, async (req, res) => {
	const updates = Object.keys(req.body);
	const allowedUpdates = ["name", "age", "password", "email"];
	const isValid = updates.every((update) => allowedUpdates.includes(update));

	if (!isValid) {
		return res.status(400).send({ error: "Invalid update parameters passed!" });
	}

	try {
		updates.forEach((update) => (req.user[update] = req.body[update]));
		await req.user.save();
		res.send(req.user);
	} catch (err) {
		res.status(400).send(err);
	}
});

// Delete User
router.delete("/users/me", auth, async (req, res) => {
	try {
		await req.user.remove();
		cancelEmail(req.user.email, req.user.name);
		res.send(req.user);
	} catch (err) {
		res.status(500).send(err);
	}
});

// Adding user avatar
const avatar = multer({
	limits: {
		fileSize: 1000000,
	},
	fileFilter(req, file, cb) {
		if (!file.originalname.match(/\.(jpg|jpeg|png)$/gi)) {
			cb(new Error("Please upload jpg or jpeg or png images!"));
		}
		cb(undefined, true);
	},
});
router.post(
	"/users/me/avatar",
	auth,
	avatar.single("avatar"),
	async (req, res) => {
		const buffer = await sharp(req.file.buffer)
			.resize({
				width: 250,
				height: 250,
			})
			.png()
			.toBuffer();
		req.user.avatar = buffer;
		await req.user.save();
		res.send();
	},
	(err, req, res, next) => {
		res.status(400).send({ error: err.message });
	}
);

// Delete user avatar
router.delete("/users/me/avatar", auth, async (req, res) => {
	req.user.avatar = undefined;
	await req.user.save();
	res.send();
});

// Getting user avatar
router.get("/users/:id/avatar", async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		if (!user || !user.avatar) {
			throw new Error();
		}
		res.set("Content-Type", "image/png");
		res.send(user.avatar);
	} catch (err) {
		res.status(404).send();
	}
});

module.exports = router;
