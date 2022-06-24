const express = require("express");
const {
	SearchPeople,
	PostFriendInvitation,
	PostAcceptInvitation,
	PostRejectInvitation,
} = require("../apis/friendInvitation/friendInvitation.controller");
const {
	postFriendInvitationSchema,
	invitationDecisionSchema,
} = require("../varification/dataValidator/dataValidator");
const router = express.Router();
const { verifyUser } = require("../varification/userValidator/verifyUser");
const validator = require("express-joi-validation").createValidator({});

router.post(
	"/invite",
	verifyUser,
	validator.body(postFriendInvitationSchema),
	PostFriendInvitation
);
router.get("/search/:username", verifyUser, SearchPeople);

router.post(
	"/accept-invitation",
	verifyUser,
	validator.body(invitationDecisionSchema),
	PostAcceptInvitation
);
router.post(
	"/reject-invitation",
	verifyUser,
	validator.body(invitationDecisionSchema),
	PostRejectInvitation
);

module.exports = router;
