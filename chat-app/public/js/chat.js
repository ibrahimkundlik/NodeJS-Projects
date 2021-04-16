const socket = io();

//elements
const chatForm = document.querySelector(".chat-form");
const locationBtn = document.querySelector(".location");
const message = document.getElementById("message");
const messages = document.getElementById("messages");

//templates
const messageTemplate = document.getElementById("message-template").innerHTML;
const locationTemplate = document.getElementById("location-template").innerHTML;
const sidebarTemplate = document.getElementById("sidebar-template").innerHTML;

//options
const { username, room } = Qs.parse(location.search, {
	ignoreQueryPrefix: true,
});

const autoscroll = () => {
	messages.scrollTop = messages.scrollHeight;
};

socket.on("message", ({ username, text, createdAt }) => {
	const html = Mustache.render(messageTemplate, {
		username,
		text,
		createdAt: moment(createdAt).format("hh:mm a"),
	});
	messages.insertAdjacentHTML("beforeend", html);
	autoscroll();
});

socket.on("locationMessage", ({ username, url, createdAt }) => {
	const html = Mustache.render(locationTemplate, {
		username,
		url,
		createdAt: moment(createdAt).format("hh:mm a"),
	});
	messages.insertAdjacentHTML("beforeend", html);
	autoscroll();
});

socket.on("roomData", ({ room, users }) => {
	const html = Mustache.render(sidebarTemplate, {
		room,
		users,
	});
	document.querySelector(".chat__sidebar").innerHTML = html;
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
		});
	});
});

socket.emit("join", { username, room }, (error) => {
	if (error) {
		alert(error);
		location.href = "/";
	}
});
