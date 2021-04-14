const path = require("path");
const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const Filter = require("bad-words");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;
const dirPath = path.join(__dirname, "../public/");

app.use(express.static(dirPath));

//connect with new client
io.on("connection", (socket) => {
	//emit to particular connection
	socket.emit("message", "Welcome to Chat App.");
	//emit to all except particular connection
	socket.broadcast.emit("message", "New User has joined the chat.");

	socket.on("sendMessage", (message, callback) => {
		//check badwords
		const filter = new Filter();
		if (filter.isProfane(message)) {
			return callback("Profanity is not allowed.");
		}

		//emit to all connections
		io.emit("message", message);
		callback();
	});

	//when client disconnects
	socket.on("disconnect", () => {
		io.emit("message", "A user has left the chat.");
	});

	//client location
	socket.on("sendLocation", ({ latitude, longitude }, callback) => {
		socket.broadcast.emit(
			"message",
			`🗺️ https://www.google.com/maps?q=${latitude},${longitude}`
		);
		callback();
	});
});

server.listen(port, () => {
	console.log(`Express running on ${port}.`);
});
