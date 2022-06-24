const Joi = require("joi");

module.exports.registerSchema = Joi.object({
	username: Joi.string().min(3).max(12).required(),
	password: Joi.string().min(6).max(12).required(),
	mail: Joi.string().email().required(),
});

module.exports.loginSchema = Joi.object({
	password: Joi.string().min(6).max(12).required(),
	mail: Joi.string().email().required(),
});

module.exports.postFriendInvitationSchema = Joi.object({
	targetMailAddress: Joi.string().email().required(),
});

module.exports.invitationDecisionSchema = Joi.object({
	id: Joi.string().required(),
	username: Joi.string(),
});
