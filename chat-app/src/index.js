const path = require("path");
const express = require("express");
const http = require("http");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;
const dirPath = path.join(__dirname, "../public/");

app.use(express.static(dirPath));

io.on("connection", (socket) => {
	socket.emit("message", "Welcome to Chat App.");

	socket.on("sendMessage", (message) => {
		io.emit("receiveMessage", message);
	});
});

server.listen(port, () => {
	console.log(`Express running on ${port}.`);
});
