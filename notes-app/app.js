const chalk = require("chalk");
const notesUtil = require("./notes.js");
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
	handler(argv) {
		notesUtil.addNotes(argv.title, argv.body);
	},
});

yargs.command({
	command: "remove",
	describe: "Remove a note",
	builder: {
		title: {
			describe: "Specify title of note to be removed",
			demandOption: true,
			type: "string",
		},
	},
	handler(argv) {
		notesUtil.removeNotes(argv.title);
	},
});

yargs.command({
	command: "list",
	describe: "List all notes",
	handler() {
		notesUtil.listNotes();
	},
});

yargs.command({
	command: "read",
	describe: "Read a note",
	builder: {
		title: {
			describe: "Specify title of note",
			demandOption: true,
			type: "string",
		},
	},
	handler(argv) {
		notesUtil.readNotes(argv.title);
	},
});

yargs.parse();
