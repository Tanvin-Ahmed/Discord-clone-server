const connectedUsers = new Map();

let io = null;

module.exports.setSocketServerInstance = ioInstance => {
	io = ioInstance;
};

module.exports.getSocketServerInstance = () => io;

module.exports.addNewConnectedUsers = ({ socketId, userId }) => {
	connectedUsers.set(socketId, { userId });
};

module.exports.removeConnectedUser = socketId => {
	if (connectedUsers.has(socketId)) {
		connectedUsers.delete(socketId);
	}
};

module.exports.getActiveConnections = userId => {
	const activeUsers = [];

	connectedUsers.forEach((value, key) => {
		if (value.userId === userId) {
			activeUsers.push(key);
		}
	});

	return activeUsers;
};

module.exports.getActiveUsers = () => {
	const onlineUsers = [];

	connectedUsers.forEach((value, key) => {
		onlineUsers.push({ socketId: key, userId: value.userId });
	});

	return onlineUsers;
};
