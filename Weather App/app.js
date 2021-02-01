console.log("Starting");
setTimeout(() => {
	console.log("Inside 11");
}, 2000);
setTimeout(() => {
	console.log("Inside 22");
}, 0);
console.log("Stopping");
