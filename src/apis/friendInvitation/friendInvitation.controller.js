const {
	updateFriendsPendingInvitation,
	updateFriendList,
} = require("../../sockets/updates/friends");
const { saveUserInfo, updateUserInfo } = require("../users/user.service");
const {
	searchPeople,
	findUser,
	findInvitation,
	setInvitationInDB,
	isInvitationExist,
	deleteInvitation,
	getInvitation,
	findUserById,
} = require("./friendInvitation.service");

module.exports.SearchPeople = async (req, res) => {
	try {
		const username = req.params.username;
		const people = await searchPeople(username);
		return res.status(200).json(people);
	} catch (error) {
		return res.status(404).json({ message: "No user found!", error: true });
	}
};

module.exports.PostFriendInvitation = async (req, res) => {
	try {
		const { targetMailAddress } = req.body;
		const { _id, mail } = req.user;

		console.log(targetMailAddress, _id, mail);

		if (targetMailAddress.toLowerCase() === mail.toLowerCase()) {
			return res.status(409).json({
				message: "Sorry! You can't become friend with yourself.",
				error: true,
			});
		}

		const targetedUser = await findUser(targetMailAddress);

		if (!targetedUser) {
			return res
				.status(404)
				.json({ message: "Friend has been not found.", error: true });
		}

		const invitationAlreadyReceived = await findInvitation(
			_id,
			targetedUser._id
		);

		if (invitationAlreadyReceived) {
			return res
				.status(409)
				.json({ message: "Invitation already send", error: true });
		}

		const usersAlreadyFriends = targetedUser.friends.find(
			friendId => friendId.toString() === _id.toString()
		);

		if (usersAlreadyFriends) {
			return res.status(409).json({
				message: "Friend already added. Please check friend list",
				error: true,
			});
		}

		await setInvitationInDB(_id, targetedUser._id);

		updateFriendsPendingInvitation(targetedUser._id.toString());

		return res
			.status(201)
			.json({ message: "Invitation has been sent!", success: true });
	} catch (error) {
		console.log(error);
	}
};

module.exports.PostAcceptInvitation = async (req, res) => {
	try {
		const { id } = req.body;
		const invitation = await getInvitation(id);

		if (!invitation) {
			return res
				.status(404)
				.json({ message: "Error occurred. Please try again.", error: true });
		}

		const { senderId, receiverId } = invitation;

		let senderUser = await findUserById(senderId);
		senderUser.friends = [...senderUser.friends, receiverId];

		let receiverUser = await findUserById(receiverId);
		receiverUser.friends = [...receiverUser.friends, senderId];
		await updateUserInfo(senderUser);
		await updateUserInfo(receiverUser);
		await deleteInvitation(id);

		// update friend pending invitation list
		await updateFriendsPendingInvitation(receiverId.toString());

		// update friend list
		await updateFriendList(senderId.toString());
		await updateFriendList(receiverId.toString());

		return res.status(200).json({ message: "Friend successfully added" });
	} catch (error) {
		return res
			.status(500)
			.json({ message: "Something is wrong. Please try again.", error: true });
	}
};

module.exports.PostRejectInvitation = async (req, res) => {
	try {
		const { id } = req.body;
		const { _id: userId } = req.user;

		// remove invitation from DB
		const invitationExists = await isInvitationExist(id);

		if (invitationExists) {
			await deleteInvitation(id);
		}

		// update invitation list
		updateFriendsPendingInvitation(userId);

		return res
			.status(201)
			.json({ message: "Invitation successfully rejected!" });
	} catch (error) {
		return res
			.status(500)
			.json({ message: "Something went wrong. Please try again!" });
	}
};
