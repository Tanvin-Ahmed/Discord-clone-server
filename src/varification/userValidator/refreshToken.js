const jwt = require("jsonwebtoken");
const { app } = require("../../config/config");

module.exports.refreshToken = async (req, res) => {
	try {
		const token = req.body.token;
		let decoded = jwt.verify(token, app.jwt_secret);
		delete decoded.exp;
		if (decoded) {
			const newToken = jwt.sign(decoded, app.jwt_secret, {
				expiresIn: "5d",
			});
			return res.status(200).json(newToken);
		}
		return res
			.status(401)
			.json({ message: "Refresh token not generated!", error: true });
	} catch (error) {
		return res
			.status(401)
			.json({ message: "Refresh token not generated!", error: true });
	}
};
