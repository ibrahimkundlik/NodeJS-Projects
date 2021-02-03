const geocodeAPI = require("./utils/geocodeAPI");
const weatherAPI = require("./utils/weatherAPI");

geocodeAPI("bncbvncb", (error, geoData) => {
	if (error) {
		console.log(error);
		return;
	}
	weatherAPI(geoData, (error, weatherData) => {
		if (error) {
			console.log(error);
			return;
		}
		console.log(geoData.location);
		console.log(weatherData.temperature);
		console.log(weatherData.feelslike);
	});
});
