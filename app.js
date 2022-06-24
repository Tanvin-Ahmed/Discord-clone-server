const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();
const http = require("http");
require("./src/db/database");

const indexRouter = require("./src/routes/index");
const userRouter = require("./src/routes/users");
const friendInvitationRouter = require("./src/routes/friendInvitation");
const { registerSocketServer } = require("./src/sockets/socket");

const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);
app.use("/user", userRouter);
app.use("/friend-invitation", friendInvitationRouter);

const server = http.createServer(app);
registerSocketServer(server);

module.exports = { app: app, server: server };
