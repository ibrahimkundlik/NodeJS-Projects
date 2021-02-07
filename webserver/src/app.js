const path = require("path");
const express = require("express");
const app = express();

// const dirPath = path.join(__dirname, "../public");
// app.use(express.static(dirPath));

app.set("view engine", "hbs");

app.get("", (req, res) => {
	res.render("index", {
		title: "Home Page",
		author: "Brad",
	});
});

app.get("/about", (req, res) => {
	res.render("about", {
		title: "About Page",
		author: "Brad",
	});
});

app.get("/help", (req, res) => {
	res.render("help", {
		title: "Help Page",
		mssg: "Contact 456 for help related queries",
	});
});

app.get("/weather", (req, res) => {
	res.send({
		forecast: 50,
		location: "Paris",
	});
});

app.listen(3000, () => {
	console.log("Express server started.");
});
