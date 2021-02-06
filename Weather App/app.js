const geocodeAPI = require("./utils/geocodeAPI");
const weatherAPI = require("./utils/weatherAPI");

const input = process.argv[2];

if (!input) {
	console.log("Please add location.");
	return;
}

geocodeAPI(input, (error, geoData) => {
	if (error) {
		console.log(error);
		return;
	}
	weatherAPI(geoData, (error, weatherData) => {
		if (error) {
			console.log(error);
			return;
		}
		const { location } = geoData;
		const { temperature, feelslike } = weatherData;
		console.log(location, temperature, feelslike);
	});
});
