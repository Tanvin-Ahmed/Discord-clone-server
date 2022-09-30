const { addNewConnectedUsers } = require("../../serverStorage/storage");
const {
  updateFriendsPendingInvitation,
  updateFriendList,
} = require("../updates/friends");
const { updateRooms } = require("../updates/rooms");

module.exports.newConnectionHandler = async (socket, io) => {
  const userDetails = socket.user;
  addNewConnectedUsers({ socketId: socket.id, userId: userDetails._id });

  // update previous created room
  const updateActiveRoomList = () => {
    updateRooms(socket.id);
  };

  // update pending friends invitation list
  await updateFriendsPendingInvitation(userDetails._id);

  // update friend list
  await updateFriendList(userDetails._id, updateActiveRoomList);
};
