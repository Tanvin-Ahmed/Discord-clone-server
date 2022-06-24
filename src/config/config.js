module.exports.app = {
	db_uri: process.env.DB_URI,
	users_collection: process.env.USER_COLLECTION,
	jwt_secret: process.env.JWT_SECRET,
	friend_invitation_collection: process.env.FRIEND_INVITATION_COLLECTION,
};
