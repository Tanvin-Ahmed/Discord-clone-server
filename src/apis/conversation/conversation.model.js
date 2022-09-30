const mongoose = require("mongoose");
const { app } = require("../../config/config");

const Schema = mongoose.Schema;

const coneversationSchema = new Schema(
  {
    participants: [
      {
        type: Schema.Types.ObjectId,
        ref: app.users_collection,
      },
    ],
    messages: [
      {
        type: Schema.Types.ObjectId,
        ref: app.message_collection,
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model(
  app.conversation_collection,
  coneversationSchema
);
