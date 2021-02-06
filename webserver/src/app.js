const path = require("path");
const express = require("express");

const app = express();

const dirPath = path.join(__dirname, "../public");
app.use(express.static(dirPath));

app.get("/weather", (req, res) => {
	res.send({
		forecast: 50,
		location: "Paris",
	});
});

app.listen(3000, () => {
	console.log("Express server started.");
});
