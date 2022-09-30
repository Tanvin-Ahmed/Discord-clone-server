const {
  checkConversation,
  updateConversation,
  createNewConversation,
  findConversationById,
  findConversationByUsersId,
} = require("./conversation.service");

const CreateNewConversation = async (info) => {
  try {
    return await createNewConversation(info);
  } catch (error) {
    console.log("create new conversation error: " + error);
  }
};

const FindConversationById = async (id) => {
  try {
    return await findConversationById(id);
  } catch (error) {
    console.log("find conversation error: " + error);
  }
};

const FindConversationByUsersId = async (usersId) => {
  try {
    return await findConversationByUsersId(usersId);
  } catch (error) {
    console.log("find conversation error: " + error);
  }
};

const CheckConversationPresent = async (info) => {
  try {
    return await checkConversation(info);
  } catch (error) {
    console.log("Check conversation error: " + error);
  }
};

const UpdateConversation = async (updatedConversation) => {
  try {
    return await updateConversation(updatedConversation);
  } catch (error) {
    console.log("Check UpdateConversation error: " + error);
  }
};

module.exports = {
  CreateNewConversation,
  FindConversationById,
  FindConversationByUsersId,
  CheckConversationPresent,
  UpdateConversation,
};
