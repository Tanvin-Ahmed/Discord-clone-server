const mongoose = require("mongoose");
const { app } = require("../../config/config");

const Schema = mongoose.Schema;

const friendInvitationSchema = new Schema(
	{
		senderId: {
			type: mongoose.Types.ObjectId,
			ref: app.users_collection,
		},
		receiverId: {
			type: mongoose.Types.ObjectId,
			ref: app.users_collection,
		},
	},
	{
		versionKey: false,
		timestamps: true,
	}
);

module.exports = mongoose.model(
	app.friend_invitation_collection,
	friendInvitationSchema
);
