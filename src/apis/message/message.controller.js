const { saveMessage } = require("./message.service");

const SaveDirectMessage = async (content, userId) => {
  try {
    return await saveMessage({
      content,
      type: "DIRECT",
      author: userId,
    });
  } catch (error) {
    console.log("direct message save error: " + error);
  }
};

module.exports = { SaveDirectMessage };
