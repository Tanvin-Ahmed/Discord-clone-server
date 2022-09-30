const { addNewActiveRoom } = require("../../serverStorage/storage");
const { updateRooms } = require("./rooms");

module.exports.roomCreateHandler = (socket) => {
  const {
    id: socketId,
    user: { _id: userId },
  } = socket;

  const roomDetails = addNewActiveRoom(socketId, userId);
  socket.emit("room-create", { roomDetails });

  updateRooms();
};
