const express = require("express");
const { Register, Login } = require("../apis/users/user.controller");
const router = express.Router();
const {
	registerSchema,
	loginSchema,
} = require("../varification/dataValidator/dataValidator");
const { refreshToken } = require("../varification/userValidator/refreshToken");
const validator = require("express-joi-validation").createValidator({});
const { verifyUser } = require("../varification/userValidator/verifyUser");

//* Register users api
router.post("/register", validator.body(registerSchema), Register);
router.post("/login", validator.body(loginSchema), Login);

//* generate refresh token
router.post("/generate-refresh-token", refreshToken);

module.exports = router;
