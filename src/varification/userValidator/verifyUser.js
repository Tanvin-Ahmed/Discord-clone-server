const jwt = require("jsonwebtoken");
const { app } = require("../../config/config");

module.exports.verifyUser = (req, res, next) => {
	try {
		let token =
			req.body.token || req.query.token || req.headers["authorization"];
		token = token.split(" ")[1];
		const decoded = jwt.verify(token, app.jwt_secret);
		req.user = decoded;
		return next();
	} catch (error) {
		return res.status(401).json({ message: "Invalid token!" });
	}
};
