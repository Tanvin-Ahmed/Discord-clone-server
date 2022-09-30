const {
  FindConversationByUsersId,
} = require("../../apis/conversation/conversation.controller");
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
    }
  } catch (error) {
    console.log("directChatHistoryHandler error: " + error);
  }
};

module.exports = { directChatHistoryHandler };
