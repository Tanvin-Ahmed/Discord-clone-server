const messageModel = require("./message.model");
const mongoose = require("mongoose");

const saveMessage = async (data) => {
  return await messageModel.create(data);
};

module.exports = { saveMessage };
