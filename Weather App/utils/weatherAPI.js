const request = require("postman-request");

const weatherAPI = (geoData, callback) => {
	const weatherURL = `http://api.weatherstack.com/current?access_key=6986b4f31e45b0ef6b0585c779411cee&query=${geoData.latitude},${geoData.longitude}`;
	request({ url: weatherURL, json: true }, (error, response) => {
		if (error) {
			callback("Unable to connect to weather service.");
		} else if (response.body.error) {
			callback("Unable to find location.");
		} else {
			const data = response.body;
			callback(undefined, {
				temperature: data.current.temperature,
				feelslike: data.current.feelslike,
			});
		}
	});
};

module.exports = weatherAPI;
