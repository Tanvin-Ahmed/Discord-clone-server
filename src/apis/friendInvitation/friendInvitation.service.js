const userModel = require("../users/user.model");
const invitationModel = require("./friendInvitation.model");
const mongoose = require("mongoose");

module.exports.searchPeople = async username => {
	return await userModel.find({ username: new RegExp(username, "i") });
};

module.exports.findUser = async mail => {
	return await userModel.findOne({ mail });
};

module.exports.findUserById = async id => {
	const _id = mongoose.Types.ObjectId(id);
	return await userModel.findOne({ _id });
};

module.exports.findInvitation = async (senderId, receiverId) => {
	return await invitationModel.findOne({ senderId, receiverId });
};

module.exports.setInvitationInDB = async (senderId, receiverId) => {
	return await invitationModel.create({ senderId, receiverId });
};

module.exports.getInvitation = async id => {
	const _id = mongoose.Types.ObjectId(id);
	return await invitationModel.findById(_id);
};

module.exports.isInvitationExist = async id => {
	const _id = mongoose.Types.ObjectId(id);
	return await invitationModel.exists({ _id });
};

module.exports.deleteInvitation = async id => {
	const _id = mongoose.Types.ObjectId(id);
	return await invitationModel.findByIdAndDelete(_id);
};
