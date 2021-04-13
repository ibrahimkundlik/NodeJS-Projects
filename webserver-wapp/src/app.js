const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocodeAPI = require("./utils/geocodeAPI");
const weatherAPI = require("./utils/weatherAPI");

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
		author: "Ibrahim",
	});
});

app.get("/about", (req, res) => {
	res.render("about", {
		title: "About",
		author: "Ibrahim",
	});
});

app.get("/help", (req, res) => {
	res.render("help", {
		title: "Help",
		author: "Ibrahim",
		mssg: "Contact 999 for help related queries",
	});
});

app.get("/weather", (req, res) => {
	if (!req.query.address) {
		return res.send({
			error: "Please provide address in input!",
		});
	}

	geocodeAPI(req.query.address, (error, geoData) => {
		if (error) {
			return res.send({ error });
		}
		weatherAPI(geoData, (error, weatherData) => {
			if (error) {
				return res.send({ error });
			}
			const { location } = geoData;
			const { temperature, feelslike } = weatherData;
			const { address } = req.query;
			return res.send({ location, temperature, feelslike, address });
		});
	});
});

app.get("/help/*", (req, res) => {
	res.render("errorPage", {
		title: "Error",
		author: "Ibrahim",
		mssg: "404 error on /help - Page not found",
	});
});

app.get("*", (req, res) => {
	res.render("errorPage", {
		title: "Error",
		author: "Ibrahim",
		mssg: "404 error - Page not found",
	});
});

app.listen(3000, () => {
	console.log("Express server started.");
});
