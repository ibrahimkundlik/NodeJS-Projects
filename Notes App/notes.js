const fs = require("fs");
const chalk = require("chalk");

//addNotes
const addNotes = (title, body) => {
	const notes = loadNotes();
	const duplicateNotes = notes.find((note) => note.title === title);

	if (!duplicateNotes) {
		notes.push({
			title: title,
			body: body,
		});
		saveNotes(notes);
		console.log(chalk.hex("#000").bgGreen.bold("Note added"));
	} else {
		console.log(
			chalk.hex("#000").bgRed.bold("Note with above title already exist")
		);
	}
};
//removeNotes
const removeNotes = (title) => {
	const notes = loadNotes();
	const deleteNote = notes.findIndex((note) => note.title === title);
	if (deleteNote >= 0) {
		notes.splice(deleteNote, 1);
		saveNotes(notes);
		console.log(chalk.hex("#000").bgGreen.bold("Note removed"));
	} else {
		console.log(chalk.hex("#000").bgRed.bold("No such note found!"));
	}
};
//listNotes
const listNotes = () => {
	const notes = loadNotes();
	if (notes.length > 0) {
		console.log(chalk.hex("#000").bgGreen.bold("Your notes:-"));
		notes.forEach((note) => {
			console.log(chalk.hex("#000").bgBlue.bold(note.title));
		});
	} else {
		console.log(chalk.hex("#000").bgRed.bold("No notes found!"));
	}
};
//readNotes
const readNotes = (title) => {
	const notes = loadNotes();
	const noteFound = notes.findIndex((note) => note.title === title);
	if (noteFound >= 0) {
		console.log(chalk.hex("#000").bgGreen.bold(notes[noteFound].title));
		console.log(chalk.hex("#000").bgMagenta.bold(notes[noteFound].body));
	} else {
		console.log(chalk.hex("#000").bgRed.bold("Note not found!"));
	}
};
//loadNotes
const loadNotes = () => {
	try {
		return JSON.parse(fs.readFileSync("notes.json").toString());
	} catch {
		return [];
	}
};
//saveNotes
const saveNotes = (notes) => {
	const JSONdata = JSON.stringify(notes);
	fs.writeFileSync("notes.json", JSONdata);
};

module.exports = {
	addNotes: addNotes,
	removeNotes: removeNotes,
	listNotes: listNotes,
	readNotes: readNotes,
};
