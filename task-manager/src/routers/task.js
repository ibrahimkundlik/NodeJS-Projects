const express = require("express");
const Task = require("../models/task");
const auth = require("../middleware/auth");
const router = new express.Router();

router.post("/tasks", auth, async (req, res) => {
	const task = new Task({
		...req.body,
		owner: req.user._id,
	});
	try {
		await task.save();
		res.status(201).send(task);
	} catch (err) {
		res.status(400).send(err);
	}
});

// GET tasks + queries
// completed - filtering
// limit, skip - pagination
// sortBy - sorting
router.get("/tasks", auth, async (req, res) => {
	const match = {};
	if (req.query.completed) {
		match.completed = req.query.completed === "true";
	}
	const sort = {};
	if (req.query.sortBy) {
		const part = req.query.sortBy.split(":");
		sort[part[0]] = part[1] === "asc" ? 1 : -1;
	}
	try {
		await req.user
			.populate({
				path: "myTask",
				match,
				options: {
					limit: parseInt(req.query.limit),
					skip: parseInt(req.query.skip),
					sort,
				},
			})
			.execPopulate();
		res.send(req.user.myTask);
	} catch (err) {
		res.status(500).send(err);
	}
});

router.get("/tasks/:id", auth, async (req, res) => {
	const _id = req.params.id;
	try {
		const task = await Task.findOne({ _id, owner: req.user._id });
		if (!task) {
			return res.status(404).send();
		}
		res.send(task);
	} catch (err) {
		res.status(500).send(err);
	}
});

router.patch("/tasks/:id", auth, async (req, res) => {
	const updates = Object.keys(req.body);
	const allowedUpdates = ["description", "completed"];
	const isValid = updates.every((update) => allowedUpdates.includes(update));

	if (!isValid) {
		return res.status(400).send({ error: "Invalid update parameters passed!" });
	}

	try {
		const task = await Task.findOne({
			_id: req.params.id,
			owner: req.user._id,
		});
		if (!task) {
			return res.status(404).send();
		}
		updates.forEach((update) => (task[update] = req.body[update]));
		await task.save();
		res.send(task);
	} catch (err) {
		res.status(400).send(err);
	}
});

router.delete("/tasks/:id", auth, async (req, res) => {
	try {
		const task = await Task.findOneAndDelete({
			_id: req.params.id,
			owner: req.user._id,
		});
		if (!task) {
			return res.status(404).send();
		}
		res.send(task);
	} catch (err) {
		res.status(500).send(err);
	}
});

module.exports = router;
