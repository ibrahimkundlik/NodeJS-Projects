const chalk = require("chalk");
const getNotes = require("./notes.js");
const yargs = require("yargs");

//Get input from command line
// const command = process.argv[2];
// if (command === "add") {
// 	console.log("Adding Note...");
// }
// if (command === "remove") {
// 	console.log("Removing Note...");
// }

//Get input from command line using yargs
yargs.version("1.1.0");

yargs.command({
	command: "add",
	describe: "Add a note",
	builder: {
		title: {
			describe: "Add title of note",
			demandOption: true,
			type: "string",
		},
		body: {
			describe: "Add text of note",
			demandOption: true,
			type: "string",
		},
	},
	handler: function (argv) {
		console.log(argv.title + " | " + argv.body);
	},
});

yargs.command({
	command: "remove",
	describe: "Remove a note",
	handler: function () {
		console.log("Removing note");
	},
});

yargs.command({
	command: "list",
	describe: "List all notes",
	handler: function () {
		console.log("Listing all the notes");
	},
});

yargs.command({
	command: "read",
	describe: "Read a note",
	handler: function () {
		console.log("Reading a note");
	},
});

yargs.parse();
