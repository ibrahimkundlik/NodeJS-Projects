const path = require("path");
const express = require("express");
const hbs = require("hbs");

const app = express();

//path variables
const dirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");
//static content (css, js, images)
app.use(express.static(dirPath));
//dynamic content (hbs files)
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialPath);

app.get("", (req, res) => {
	res.render("index", {
		title: "Weather",
		author: "Andrew",
	});
});

app.get("/about", (req, res) => {
	res.render("about", {
		title: "About",
		author: "Andrew",
	});
});

app.get("/help", (req, res) => {
	res.render("help", {
		title: "Help",
		author: "Andrew",
		mssg: "Contact 999 for help related queries",
	});
});

app.get("/weather", (req, res) => {
	res.send({
		forecast: 50,
		location: "Paris",
	});
});

app.get("/help/*", (req, res) => {
	res.render("errorPage", {
		title: "Error",
		author: "Andrew",
		mssg: "404 error on /help - Page not found",
	});
});

app.get("*", (req, res) => {
	res.render("errorPage", {
		title: "Error",
		author: "Andrew",
		mssg: "404 error - Page not found",
	});
});

app.listen(3000, () => {
	console.log("Express server started.");
});
