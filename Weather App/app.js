const request = require("postman-request");

const weatherURL =
	"http://api.weatherstack.com/current?access_key=6986b4f31e45b0ef6b0585c779411cee&query=New%20York";

const mapboxURL =
	"https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoiaWJyYWhpbWt1bmRsaWsxOTk3IiwiYSI6ImNra25rcDM1dDB5c3kyd3JxdDc5a3pydDgifQ.yArW8TANmUDpckWLuWe20w&limit=1";

request({ url: weatherURL, json: true }, (error, response) => {
	const data = response.body.current;
	console.log(
		`The temperature is ${data.temperature}, but it feels like ${data.feelslike} !!!`
	);
});

request({ url: mapboxURL, json: true }, (error, response) => {
	console.log(response.body.features[0].center[1]);
	console.log(response.body.features[0].center[0]);
});
