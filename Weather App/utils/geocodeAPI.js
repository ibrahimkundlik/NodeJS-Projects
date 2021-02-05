const request = require("postman-request");

const geocodeAPI = (address, callback) => {
	const mapboxURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
		address
	)}.json?access_token=pk.eyJ1IjoiaWJyYWhpbWt1bmRsaWsxOTk3IiwiYSI6ImNra25rcDM1dDB5c3kyd3JxdDc5a3pydDgifQ.yArW8TANmUDpckWLuWe20w&limit=1`;

	request({ url: mapboxURL, json: true }, (error, response) => {
		if (error) {
			callback("Unable to connect to location service.");
		} else if (response.body.features.length === 0) {
			callback(
				"Unable to find co-ordinates for given location. Try another search."
			);
		} else {
			const { features } = response.body;
			callback(undefined, {
				longitude: features[0].center[0],
				latitude: features[0].center[1],
				location: features[0].place_name,
			});
		}
	});
};

module.exports = geocodeAPI;
