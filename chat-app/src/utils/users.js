const users = [];

const addUser = ({ id, username, room }) => {
	//clean the data
	username = username.trim().toLowerCase();
	room = room.trim().toLowerCase();
	//validate data
	if (!username || !room) {
		return {
			error: "Username and room are required.",
		};
	}
	//check existing user
	const userExists = users.find((user) => {
		return user.username === username && user.room === room;
	});
	//validate username
	if (userExists) {
		return {
			error: "Username is already in use.",
		};
	}
	//store user
	const user = { id, username, room };
	users.push(user);
	return { user };
};

const removeUser = (id) => {
	const index = users.findIndex((user) => user.id === id);
	if (index !== -1) {
		return users.splice(index, 1)[0];
	}
};

const getUser = (id) => {
	return users.find((user) => user.id === id);
};

const getUsersInRoom = (room) => {
	return users.filter((user) => user.room === room);
};

module.exports = {
	addUser,
	removeUser,
	getUser,
	getUsersInRoom,
};
