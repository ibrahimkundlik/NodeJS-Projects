const socket = io();
const chatForm = document.querySelector(".chat-form");
const message = document.querySelector("#message");
const locationBtn = document.querySelector(".location");

socket.on("message", (mssg) => {
	console.log(mssg);
});

chatForm.addEventListener("submit", (e) => {
	e.preventDefault();

	chatForm.setAttribute("disabled", "disabled");
	socket.emit("sendMessage", message.value, (error) => {
		chatForm.removeAttribute("disabled");
		message.value = "";
		message.focus();
		if (error) {
			return console.log(error);
		}
		console.log("Message Delievered :)");
	});
});

locationBtn.addEventListener("click", () => {
	if (!navigator.geolocation) {
		return alert("Geolocation not supported on browser.");
	}

	locationBtn.setAttribute("disabled", "disabled");
	navigator.geolocation.getCurrentPosition((position) => {
		const { latitude, longitude } = position.coords;
		socket.emit("sendLocation", { latitude, longitude }, () => {
			locationBtn.removeAttribute("disabled");
			console.log("Location Shared :)");
		});
	});
});
