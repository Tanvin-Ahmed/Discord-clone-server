const {
  getActiveRoom,
  leaveActiveRoom,
} = require("../../serverStorage/storage");
const { updateRooms } = require("./rooms");

module.exports.roomLeaveHandler = (socket, data) => {
  const { roomId } = data;
  const activeRoom = getActiveRoom(roomId);

  if (activeRoom) {
    leaveActiveRoom(roomId, socket.id);

    const updatedActiveRoom = getActiveRoom(roomId);
    if (updatedActiveRoom) {
      updatedActiveRoom.participants.forEach((participant) => {
        socket.to(participant.socketId).emit("room-participant-left", {
          connUserSocketId: socket.id,
        });
      });
    }

    updateRooms();
  }
};
