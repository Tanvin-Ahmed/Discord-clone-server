const {
  removeConnectedUser,
  getActiveRooms,
} = require("../../serverStorage/storage");
const { roomLeaveHandler } = require("../updates/roomLeaveHandler");

module.exports.disconnectHandler = (socket) => {
  const activeRooms = getActiveRooms();
  activeRooms.forEach((room) => {
    const userInRoom = room.participants.some(
      (participant) => participant.socketId === socket.id
    );
    if (userInRoom) {
      roomLeaveHandler(socket, { roomId: room.roomId });
    }
  });
  removeConnectedUser(socket.id);
};
