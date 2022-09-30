module.exports.roomSignalingDataHandler = (socket, data) => {
  const { connUserSocketId, signal } = data;

  const signalingData = { connUserSocketId: socket.id, signal };

  socket.to(connUserSocketId).emit("conn-signal", signalingData);
};
