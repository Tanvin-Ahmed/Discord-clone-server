const jwt = require("jsonwebtoken");
const { app } = require("../../config/config");

module.exports.generateToken = info => {
	const token = jwt.sign(info, app.jwt_secret, { expiresIn: "5d" });
	return token;
};
