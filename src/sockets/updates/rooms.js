const {
  getActiveRooms,
  getSocketServerInstance,
} = require("../../serverStorage/storage");

module.exports.updateRooms = (toSpecificTargetId = null) => {
  const activeRooms = getActiveRooms();
  const io = getSocketServerInstance();

  if (toSpecificTargetId) {
    io.to(toSpecificTargetId).emit("active-rooms", { activeRooms });
  } else {
    io.emit("active-rooms", { activeRooms });
  }
};
