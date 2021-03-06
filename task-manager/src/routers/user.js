const express = require("express");
const User = require("../models/user");
const router = new express.Router();

router.post("/users", async (req, res) => {
	const user = new User(req.body);
	try {
		await user.save();
		res.status(201).send(user);
	} catch (err) {
		res.status(400).send(err);
	}
});

router.get("/users", async (req, res) => {
	try {
		const users = await User.find({});
		res.send(users);
	} catch (err) {
		res.status(500).send(err);
	}
});

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
