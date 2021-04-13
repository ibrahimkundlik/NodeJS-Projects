const socket = io();
const chatForm = document.querySelector(".chat-form");
const message = document.querySelector("#message");

chatForm.addEventListener("submit", (e) => {
	e.preventDefault();
	socket.emit("sendMessage", message.value);
	message.value = "";
});

socket.on("message", (mssg) => {
	console.log(mssg);
});

socket.on("receiveMessage", (mssg) => {
	console.log(mssg);
});
