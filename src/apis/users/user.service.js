const PostUser = require("./user.model");
const mongoose = require("mongoose");

module.exports.checkEmailDuplication = async mail => {
	return await PostUser.exists({ mail: mail.toLowerCase() });
};

module.exports.saveUserInfo = async user => {
	return await PostUser.create(user);
};

module.exports.updateUserInfo = async user => {
	const _id = mongoose.Types.ObjectId(user._id);
	return await PostUser.findByIdAndUpdate(_id, user);
};

module.exports.login = async mail => {
	return await PostUser.findOne({ mail: mail.toLowerCase() });
};

module.exports.getUserInfo = async id => {
	const _id = mongoose.Types.ObjectId(id);
	return await PostUser.findById(_id).select("-password");
};

module.exports.getUserFriendInfo = async id => {
	const _id = mongoose.Types.ObjectId(id);
	return await PostUser.findById(_id, { _id: 1, friends: 1 }).populate(
		"friends",
		"_id username mail"
	);
};
