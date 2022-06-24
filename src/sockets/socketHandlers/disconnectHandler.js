const { removeConnectedUser } = require("../../serverStorage/storage");

module.exports.disconnectHandler = socket => {
	removeConnectedUser(socket.id);
};
