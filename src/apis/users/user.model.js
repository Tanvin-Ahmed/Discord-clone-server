const mongoose = require("mongoose");
const { app } = require("../../config/config");

const userSchema = new mongoose.Schema(
  {
    mail: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    username: { type: String, required: true },
    friends: [
      { type: mongoose.Schema.Types.ObjectId, ref: app.users_collection },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model(app.users_collection, userSchema);
