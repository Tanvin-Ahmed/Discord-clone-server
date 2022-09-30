const socket = require("socket.io");
const {
  setSocketServerInstance,
  getActiveUsers,
} = require("../serverStorage/storage");
const {
  verifySocketToken,
} = require("../varification/userValidator/verifySocketUser");
const { disconnectHandler } = require("./socketHandlers/disconnectHandler");
const {
  newConnectionHandler,
} = require("./socketHandlers/newConnectionHandler");
const {
  directChatHistoryHandler,
} = require("./updates/directChatHistoryHandler");
const { directMessageHandler } = require("./updates/directMessage");
const { roomLeaveHandler } = require("./updates/roomLeaveHandler");
const { roomCreateHandler } = require("./updates/roomCreateHandler");
const { roomJoinHandler } = require("./updates/roomJoinHendler");
const {
  roomInitializeConnectionHandler,
} = require("./socketHandlers/roomInitializeConnectionHandler");
const {
  roomSignalingDataHandler,
} = require("./socketHandlers/roomSignalingDataHandler");

module.exports.registerSocketServer = (server) => {
  const io = socket(server, {
    cors: {
      origin: "*",
      method: ["GET", "POST"],
    },
  });

  setSocketServerInstance(io);

  io.use((socket, next) => {
    verifySocketToken(socket, next);
  });

  const emitOnlineUsers = () => {
    const onlineUsers = getActiveUsers();
    io.emit("online-users", { onlineUsers });
  };

  io.on("connect", (socket) => {
    newConnectionHandler(socket, io);
    emitOnlineUsers();

    socket.on("direct-chat-history", (data) => {
      directChatHistoryHandler(socket, data);
    });

    socket.on("direct-message", (data) => {
      directMessageHandler(socket, data);
    });

    socket.on("room-create", () => {
      roomCreateHandler(socket);
    });

    socket.on("room-join", (data) => {
      roomJoinHandler(socket, data);
    });

    socket.on("room-leave", (data) => {
      roomLeaveHandler(socket, data);
    });

    socket.on("conn-init", (data) => {
      roomInitializeConnectionHandler(socket, data);
    });

    socket.on("conn-signal", (data) => {
      roomSignalingDataHandler(socket, data);
    });

    socket.on("disconnect", () => {
      disconnectHandler(socket);
    });
  });

  setInterval(() => {
    emitOnlineUsers();
  }, 8000);
};
