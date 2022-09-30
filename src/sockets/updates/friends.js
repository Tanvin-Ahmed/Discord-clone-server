const User = require("../../apis/users/user.model");
const FriendInvitation = require("../../apis/friendInvitation/friendInvitation.model");
const serverStore = require("../../serverStorage/storage");
const { getUserFriendInfo } = require("../../apis/users/user.service");

module.exports.updateFriendsPendingInvitation = async (userId) => {
  try {
    const receiverList = serverStore.getActiveConnections(userId);

    if (!receiverList.length) return;

    const io = serverStore.getSocketServerInstance();

    const pendingInvitations = await FriendInvitation.find({
      receiverId: userId,
    }).populate("senderId", "_id mail username");

    receiverList.forEach((receiverSocketId) => {
      io.to(receiverSocketId).emit("friends-invitations", {
        pendingInvitations,
      });
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports.updateFriendList = async (userId, callback = () => {}) => {
  try {
    // find active connection of specific id (online users)
    const receiverList = serverStore.getActiveConnections(userId);

    if (!receiverList.length) return;

    const user = await getUserFriendInfo(userId);

    if (user) {
      const friendList = user.friends;

      // get id server instance
      const io = serverStore.getSocketServerInstance();

      receiverList.forEach((receiverSocketId) => {
        io.to(receiverSocketId).emit("friend-list", {
          friends: friendList ? friendList : [],
        });
      });
      callback();
    }
  } catch (error) {
    console.log(error);
  }
};
