const egPromise = new Promise((resolve, reject) => {
	setInterval(() => {
		resolve("Succcesss :)");
		// reject("Request Failed :(");
	}, 2000);
});

egPromise
	.then((res) => {
		console.log(res);
	})
	.catch((err) => {
		console.log(err);
	});
