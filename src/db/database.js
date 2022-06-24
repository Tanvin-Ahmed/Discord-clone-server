const mongoose = require("mongoose");
const { app } = require("../config/config");

const url = app.db_uri;

if (!url) console.log("Environment variable not found");
else
	mongoose.connect(url, err => {
		if (err) console.error(err);
		else console.log("connect to database");
	});

module.exports = mongoose;
