const mongoose = require("mongoose");
const { app } = require("../../config/config");

const Schema = mongoose.Schema;

const messageSchema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: app.users_collection,
    },
    content: { type: String, required: true },
    type: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model(app.message_collection, messageSchema);
