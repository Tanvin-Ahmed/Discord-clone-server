const {
  CheckConversationPresent,
  UpdateConversation,
  CreateNewConversation,
} = require("../../apis/conversation/conversation.controller");
const { SaveDirectMessage } = require("../../apis/message/message.controller");
const { updateChatHistory } = require("./chat");

module.exports.directMessageHandler = async (socket, data) => {
  try {
    const { _id: userId } = socket.user;
    const { receiverUserId, content } = data;

    // save direct message
    const message = await SaveDirectMessage(content, userId);

    // check if the conversation is present otherwise create a new conversation
    const conversation = await CheckConversationPresent({
      userId,
      receiverId: receiverUserId,
    });

    if (conversation) {
      conversation.messages.push(message._id);
      await UpdateConversation(conversation);

      // perform and update if sender and receiver is in online
      await updateChatHistory(conversation._id.toString());
    } else {
      // create new conversation if not exists
      const newConversation = await CreateNewConversation({
        messages: [message._id],
        participants: [userId, receiverUserId],
      });

      // perform and update if sender and receiver is in online
      await updateChatHistory(newConversation._id.toString());
    }
  } catch (errors) {
    console.log(errors);
  }
};
