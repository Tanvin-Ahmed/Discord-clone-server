const jwt = require("jsonwebtoken");
const { app } = require("../../config/config");

module.exports.verifySocketToken = (socket, next) => {
	const token = socket.handshake.auth?.token;

	try {
		const decoded = jwt.verify(token, app.jwt_secret);
		socket.user = decoded;
	} catch (error) {
		const socketError = new Error("NOT_AUTHORIZED");
		next(socketError);
	}

	next();
};
