const socket = require("socket.io");
const {
	setSocketServerInstance,
	getActiveUsers,
} = require("../serverStorage/storage");
const {
	verifySocketToken,
} = require("../varification/userValidator/verifySocketUser");
const { disconnectHandler } = require("./socketHandlers/disconnectHandler");
const {
	newConnectionHandler,
} = require("./socketHandlers/newConnectionHandler");

module.exports.registerSocketServer = server => {
	const io = socket(server, {
		cors: {
			origin: "*",
			method: ["GET", "POST"],
		},
	});

	setSocketServerInstance(io);

	io.use((socket, next) => {
		verifySocketToken(socket, next);
	});

	const emitOnlineUsers = () => {
		const onlineUsers = getActiveUsers();
		io.emit("online-users", { onlineUsers });
	};

	io.on("connect", socket => {
		newConnectionHandler(socket, io);
		emitOnlineUsers();

		socket.on("disconnect", () => {
			disconnectHandler(socket);
		});
	});

	setInterval(() => {
		emitOnlineUsers();
	}, 8000);
};
