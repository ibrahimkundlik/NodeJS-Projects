const path = require("path");
const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const Filter = require("bad-words");
const { generateMessage, generateLocation } = require("./utils/messages");
const {
	addUser,
	removeUser,
	getUser,
	getUsersInRoom,
} = require("./utils/users");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;
const dirPath = path.join(__dirname, "../public/");

app.use(express.static(dirPath));

//connect with new client
io.on("connection", (socket) => {
	//room specific connections
	socket.on("join", ({ username, room }, callback) => {
		const { user, error } = addUser({
			id: socket.id,
			username,
			room,
		});
		if (error) {
			return callback(error);
		}
		socket.join(user.room);
		//emit to particular connection
		socket.emit("message", generateMessage("Welcome to Chat App."));
		//emit to all except particular connection
		socket.broadcast
			.to(user.room)
			.emit(
				"message",
				generateMessage(`${user.username} has joined the chat.`)
			);
		callback();
	});

	socket.on("sendMessage", (message, callback) => {
		//check badwords
		const filter = new Filter();
		if (filter.isProfane(message)) {
			return callback("Profanity is not allowed.");
		}

		//emit to all connections
		io.to().emit("message", generateMessage(message));
		callback();
	});

	//when client disconnects
	socket.on("disconnect", () => {
		const user = removeUser(socket.id);
		if (user) {
			io.to(user.room).emit(
				"message",
				generateMessage(`${user.username} has left the chat.`)
			);
		}
	});

	//client location
	socket.on("sendLocation", ({ latitude, longitude }, callback) => {
		socket.broadcast.emit(
			"locationMessage",
			generateLocation(`https://www.google.com/maps?q=${latitude},${longitude}`)
		);
		callback();
	});
});

server.listen(port, () => {
	console.log(`Express running on ${port}.`);
});
