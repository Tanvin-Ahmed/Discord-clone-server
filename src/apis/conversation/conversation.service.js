const conversationModel = require("./conversation.model");
const mongoose = require("mongoose");
const { app } = require("../../config/config");

const createNewConversation = async (info) => {
  return await conversationModel.create(info);
};

const findConversationById = async (id) => {
  const _id = mongoose.Types.ObjectId(id);
  return await conversationModel.findById(_id).populate({
    path: "messages",
    model: app.message_collection,
    populate: {
      path: "author",
      model: app.users_collection,
      select: "username _id",
    },
  });
};

const findConversationByUsersId = async (usersId) => {
  const { userId, receiverUserId } = usersId;

  return await conversationModel.findOne({
    participants: { $all: [userId, receiverUserId] },
  });
};

const checkConversation = async (info) => {
  const { userId, receiverId } = info;
  return await conversationModel.findOne({
    participants: { $all: [userId, receiverId] },
  });
};

const updateConversation = async (updatedConversation) => {
  const _id = mongoose.Types.ObjectId(updatedConversation._id);
  return await conversationModel.findByIdAndUpdate(_id, updatedConversation, {
    new: true,
  });
};

module.exports = {
  createNewConversation,
  findConversationById,
  findConversationByUsersId,
  checkConversation,
  updateConversation,
};
