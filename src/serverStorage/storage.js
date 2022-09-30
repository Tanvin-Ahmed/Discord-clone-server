const { v4: uuidv4 } = require("uuid");

const connectedUsers = new Map();
let activeRooms = [];
let io = null;

module.exports.setSocketServerInstance = (ioInstance) => {
  io = ioInstance;
};

module.exports.getSocketServerInstance = () => io;

module.exports.addNewConnectedUsers = ({ socketId, userId }) => {
  connectedUsers.set(socketId, { userId });
};

module.exports.removeConnectedUser = (socketId) => {
  if (connectedUsers.has(socketId)) {
    connectedUsers.delete(socketId);
  }
};

module.exports.getActiveConnections = (userId) => {
  const activeUsers = [];

  connectedUsers.forEach((value, key) => {
    if (value.userId === userId) {
      activeUsers.push(key);
    }
  });

  return activeUsers;
};

module.exports.getActiveUsers = () => {
  const onlineUsers = [];

  connectedUsers.forEach((value, key) => {
    onlineUsers.push({ socketId: key, userId: value.userId });
  });

  return onlineUsers;
};

//TODO: room logics
module.exports.addNewActiveRoom = (socketId, userId) => {
  const newActiveRoom = {
    roomCreator: { socketId, userId },
    participants: [{ userId, socketId }],
    roomId: uuidv4(),
  };

  activeRooms.push(newActiveRoom);
  return newActiveRoom;
};

module.exports.getActiveRooms = () => {
  return [...activeRooms];
};

module.exports.getActiveRoom = (roomId) => {
  const activeRoom = activeRooms.find((room) => room.roomId === roomId);
  if (activeRoom) return { ...activeRoom };
  return null;
};

module.exports.joinActiveRoom = (roomId, newParticipation) => {
  const room = activeRooms.find((room) => room.roomId === roomId);
  activeRooms = activeRooms.filter((room) => room.roomId !== roomId);

  const updatedRoom = {
    ...room,
    participants: [...room.participants, newParticipation],
  };

  activeRooms.push(updatedRoom);
};

module.exports.leaveActiveRoom = (roomId, participantSocketId) => {
  const activeRoom = activeRooms.find((room) => room.roomId === roomId);
  const copyOfActiveRoom = { ...activeRoom };
  activeRooms = activeRooms.filter((room) => room.roomId !== roomId);

  if (copyOfActiveRoom) {
    copyOfActiveRoom.participants = copyOfActiveRoom?.participants?.filter(
      (participant) => participant.socketId !== participantSocketId
    );
  }

  if (copyOfActiveRoom.participants.length > 0) {
    activeRooms.push(copyOfActiveRoom);
  }
};
