const {
  FindConversationByUsersId,
} = require("../../apis/conversation/conversation.controller");
const {
  getActiveConnections,
  getSocketServerInstance,
} = require("../../serverStorage/storage");
const { updateChatHistory } = require("./chat");

const directChatHistoryHandler = async (socket, data) => {
  try {
    const { _id: userId } = socket.user;
    const { receiverUserId } = data;

    const conversation = await FindConversationByUsersId({
      userId,
      receiverUserId,
    });

    if (conversation) {
      updateChatHistory(conversation._id, socket.id);
    } else {
      // send the message to the users of the conversation as null
      const io = getSocketServerInstance();

      [userId, receiverUserId].forEach((userId) => {
        const activeConnections = getActiveConnections(userId.toString());
        activeConnections.forEach((socketId) => {
          io.to(socketId).emit("direct-chat-history", null);
        });
      });
    }
  } catch (error) {
    console.log("directChatHistoryHandler error: " + error);
  }
};

module.exports = { directChatHistoryHandler };
