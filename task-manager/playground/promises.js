require("../src/db/mongoose");
const User = require("../src/models/user");
const Task = require("../src/models/task");

// Task.findByIdAndDelete("603f7455b555c528445adb46")
// 	.then((res) => {
// 		console.log(res);
// 		return Task.countDocuments({ completed: false });
// 	})
// 	.then((count) => console.log(count))
// 	.catch((err) => console.log(err));

const deleteTaskAndCount = async (id) => {
	const deleted = await Task.findByIdAndDelete(id);
	const count = await Task.countDocuments({ completed: false });
	return count;
};

deleteTaskAndCount("603fb7bcc21a674ae4f4d556")
	.then((count) => console.log(count))
	.catch((e) => console.log(e));
