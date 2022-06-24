const { addNewConnectedUsers } = require("../../serverStorage/storage");
const {
	updateFriendsPendingInvitation,
	updateFriendList,
} = require("../updates/friends");

module.exports.newConnectionHandler = async (socket, io) => {
	const userDetails = socket.user;
	addNewConnectedUsers({ socketId: socket.id, userId: userDetails._id });

	// update pending friends invitation list
	await updateFriendsPendingInvitation(userDetails._id);

	// update friend list
	await updateFriendList(userDetails._id);
};
