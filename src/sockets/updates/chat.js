const {
  FindConversationById,
} = require("../../apis/conversation/conversation.controller");
const {
  getSocketServerInstance,
  getActiveConnections,
} = require("../../serverStorage/storage");

const updateChatHistory = async (conversationId, toSpecificSocketId = null) => {
  const conversation = await FindConversationById(conversationId);

  if (conversation) {
    const io = getSocketServerInstance();

    if (toSpecificSocketId) {
      // initial update of chat history
      return io.to(toSpecificSocketId).emit("direct-chat-history", {
        messages: conversation.messages,
        participants: conversation.participants,
      });
    }

    // check users of this conversation are online
    // if yes emit to them update of messages
    conversation.participants.forEach((userId) => {
      const activeConnections = getActiveConnections(userId.toString());

      activeConnections.forEach((socketId) => {
        io.to(socketId).emit("direct-chat-history", {
          messages: conversation.messages,
          participants: conversation.participants,
        });
      });
    });
  }
};

module.exports = { updateChatHistory };
