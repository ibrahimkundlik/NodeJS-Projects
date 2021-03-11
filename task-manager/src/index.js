const express = require("express");
require("./db/mongoose");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

const app = express();
const port = process.env.PORT;

// detect json
app.use(express.json());

// routes for models
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
	console.log("Server is up and running on port " + port);
});
