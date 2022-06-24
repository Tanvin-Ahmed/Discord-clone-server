const {
	checkEmailDuplication,
	saveUserInfo,
	login,
} = require("./user.service");
const bcrypt = require("bcryptjs");
const {
	generateToken,
} = require("../../varification/userValidator/GenerateToken");

module.exports.Register = async (req, res) => {
	try {
		const { username, mail, password } = req.body;
		const mailExists = await checkEmailDuplication(mail);

		if (mailExists) {
			return res
				.status(409)
				.json({ message: "Email already exists!", error: true });
		}

		const hashedPassword = await bcrypt.hash(password, 10);
		const userInfo = {
			username,
			mail: mail.toLowerCase(),
			password: hashedPassword,
		};
		const registeredUser = await saveUserInfo(userInfo);
		const user = JSON.parse(JSON.stringify(registeredUser));
		delete user.password;
		const token = generateToken(user);
		return res.status(201).json({ ...user, token });
	} catch (error) {
		return res
			.status(500)
			.json({ message: "Error occurs. Please try again!", error: true });
	}
};

module.exports.Login = async (req, res) => {
	try {
		const { mail, password } = req.body;
		const loggedInUser = await login(mail);
		const user = JSON.parse(JSON.stringify(loggedInUser));

		if (!user || !(await bcrypt.compare(password, user.password))) {
			return res
				.status(400)
				.json({ message: "Invalid credentials. Please try again!" });
		}

		delete user.password;
		const token = generateToken(user);

		return res.status(200).json({ ...user, token });
	} catch (error) {
		return res.status(500).json({ message: "Error occurs. Please try again!" });
	}
};
