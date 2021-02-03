setTimeout(() => {
	console.log("Waiting 2 seconds!");
}, 2000);

const add = (a, b, callback) => {
	setTimeout(() => {
		callback(a + b);
	}, 2000);
};

add(1, 4, (sum) => {
	console.log(sum);
});
