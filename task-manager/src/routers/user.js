const express = require("express");
const User = require("../models/user");
const router = new express.Router();
const auth = require("../middleware/auth");

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

// Create User
router.post("/users", async (req, res) => {
	const user = new User(req.body);
	try {
		await user.save();
		const token = await user.generateAuthToken();
		res.status(201).send({ user, token });
	} catch (err) {
		res.status(400).send(err);
	}
});

// Read Users
router.get("/users/me", auth, async (req, res) => {
	res.send(req.user);
});

// Read User
router.get("/users/:id", async (req, res) => {
	const _id = req.params.id;
	try {
		const user = await User.findById(_id);
		if (!user) {
			return res.status(404).send();
		}
		res.send(user);
	} catch (err) {
		res.status(500).send(err);
	}
});

// Update User
router.patch("/users/:id", async (req, res) => {
	const updates = Object.keys(req.body);
	const allowedUpdates = ["name", "age", "password", "email"];
	const isValid = updates.every((update) => allowedUpdates.includes(update));

	if (!isValid) {
		return res.status(400).send({ error: "Invalid update parameters passed!" });
	}

	try {
		const user = await User.findById(req.params.id);
		updates.forEach((update) => (user[update] = req.body[update]));
		await user.save();

		if (!user) {
			return res.status(404).send();
		}
		res.send(user);
	} catch (err) {
		res.status(400).send(err);
	}
});

// Delete User
router.delete("/users/:id", async (req, res) => {
	try {
		const user = await User.findByIdAndDelete(req.params.id);
		if (!user) {
			return res.status(404).send();
		}
		res.send(user);
	} catch (err) {
		res.status(500).send(err);
	}
});

module.exports = router;
