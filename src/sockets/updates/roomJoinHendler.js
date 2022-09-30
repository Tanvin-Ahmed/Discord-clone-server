const {
  getActiveRoom,
  joinActiveRoom,
} = require("../../serverStorage/storage");
const { updateRooms } = require("./rooms");

module.exports.roomJoinHandler = (socket, data) => {
  const { roomId } = data;

  const participantDetails = {
    userId: socket.user._id,
    socketId: socket.id,
  };

  const roomDetails = getActiveRoom(roomId);
  joinActiveRoom(roomId, participantDetails);

  roomDetails.participants.forEach((participant) => {
    if (participant.socketId !== participantDetails.socketId) {
      socket.to(participant.socketId).emit("conn-prepare", {
        connUserSocketId: participantDetails.socketId,
      });
    }
  });

  updateRooms();
};
