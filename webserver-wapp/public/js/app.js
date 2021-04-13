const form = document.querySelector("form");
const input = document.querySelector("#address");
const weather = document.querySelector(".weather");

form.addEventListener("submit", (e) => {
	e.preventDefault();
	const url = `http://localhost:3000/weather?address=${input.value}`;

	weather.innerText = "Loading...";

	fetch(url)
		.then((response) => response.json())
		.then((data) => {
			if (data.error) {
				weather.innerHTML = `<p class="error">${data.error}</p>`;
			} else {
				weather.innerHTML = `<p>Location : ${data.location}</p>
        <p>Temperature : ${data.temperature}°C</p>
        <p>Feels Like : ${data.feelslike}°C</p>`;
			}
		});
});
