const geocodeAPI = require("./utils/geocodeAPI");
const weatherAPI = require("./utils/weatherAPI");

const command = process.argv[2];

if (!command) {
	console.log("Please add location.");
	return;
}

geocodeAPI(command, (error, geoData) => {
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
