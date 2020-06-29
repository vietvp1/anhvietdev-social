const express = require('express')
const router = express.Router()
const { auth } = require('../middleware/auth');
let { authController,
    postController,
    userController,
    contactController,
    notificationController,
    reactionController,
    commentController,
    messageController,
    groupChat,
    photo,
    group
} = require('../controllers/index')
const { initLocal } = require('../controllers/passportController/local')
const { facebookLogin } = require("../controllers/passportController/facebook")
const { googleLogin } = require("../controllers/passportController/google")

let initRoutes = (app) => {
    router.post('/facebook-login', facebookLogin);
    router.post('/google-login', googleLogin);
    router.post("/login", initLocal);
    router.post("/register", authController.register);
    router.put('/forgot-password', authController.forgotPassword);
    router.put('/reset-password', authController.resetPassword);
    router.get("/userloaded", auth, userController.getUserLoaded);
    router.get("/get-user/:id", auth, userController.getUser);
    router.get("/user/search-user/:keyword", auth, userController.searchUser);
    router.put("/user/update-avatar", auth, userController.updateAvatar);
    router.put("/user/update-cover", auth, userController.updateCover)
    router.put("/user/update-info", auth, userController.updateInfo)
    router.put("/user/add-work", auth, userController.addWork)
    router.put("/user/add-skill", auth, userController.addSkill)
    router.put("/user/add-education", auth, userController.addEducation)
    router.put("/user/add-placelived", auth, userController.addPlaceLived)
    router.put("/user/add-introduce", auth, userController.addPlaceLived)
    router.put("/user/update-work", auth, userController.updateWork)
    router.put("/user/update-education", auth, userController.updateEducation)
    router.put("/user/update-placelived", auth, userController.updatePlaceLived)
    router.put("/user/delete-work", auth, userController.deleteWork)
    router.put("/user/delete-education", auth, userController.deleteEducation)
    router.put("/user/delete-placelived", auth, userController.deletePlaceLived)
    router.put("/user/delete-skill", auth, userController.deleteSkill)


    router.get("/post/get-all-posts", auth, postController.getAllPosts);
    router.get("/post/getmyposts", auth, postController.getMyPosts);
    router.get("/post/getposts/:id", auth, postController.getpostsByUserId);
    router.get("/post/:id", auth, postController.getOnePost);
    router.post("/post/addnew", auth, postController.addNew);
    router.delete("/post/remove/:id", auth, postController.removePost);
    router.post("/post/get-file-in-post", auth, postController.getFileInPost);

    router.get("/contact/find-users/:keyword", auth, contactController.findUsersContact)
    router.post("/contact/add-new", auth, contactController.addNewContact)
    router.get("/contact/get-contacts", auth, contactController.getContacts)
    router.get("/contact/get-contacts/:id", auth, contactController.getContactsByIdUser)
    router.get("/contact/get-contacts-sent", auth, contactController.getContactsSent)
    router.get("/contact/get-contacts-received", auth, contactController.getContactsReceived)
    router.delete("/contact/remove-contact/:id", auth, contactController.removeContact)
    router.delete("/contact/remove-request-contact-sent/:id", auth, contactController.removeRequestContact)
    router.delete("/contact/remove-request-contact-received/:id", auth, contactController.removeRequestContactReceived)
    router.put("/contact/approve-request-contact-received", auth, contactController.approveRequestContactReceived)
    // router.get("/contact/read-more-contacts", auth ,contactController.readMoreContacts)
    // router.get("/contact/read-more-contacts-sent", auth ,contactController.readMoreContactsSent)
    // router.get("/contact/read-more-contacts-received", auth ,contactController.readMoreContactsReceived)
    router.get("/contact/search-friends/:keyword", auth, contactController.searchFriends)
    // router.get("/contact/find-more-friends-to-add-groupChat/:keyword", auth ,contactController.findMoreFriendsToAddGroup)
    router.get("/contact/check-contact/:id", auth, contactController.checkContact)

    router.get("/notification/get-notification", auth, notificationController.getNotifications)
    router.get("/notification/read-more", auth, notificationController.readMore)
    router.put("/notification/mark-all-as-read", auth, notificationController.markAllAsRead)
    router.delete("/notification/delete-notification/:id", auth, notificationController.removeNotification)

    router.post("/reaction/upReaction", auth, reactionController.upReaction)
    router.post("/reaction/unReaction", auth, reactionController.unReaction)
    router.post("/reaction/upReactionComment", auth, reactionController.upReactionComment)
    router.post("/reaction/unReactionComment", auth, reactionController.unReactionComment)

    router.post("/comment/saveComment", auth, commentController.saveComment);
    router.post("/comment/getComments", auth, commentController.getComments);
    router.delete("/comment/delete-comment/:id", auth, commentController.deleteComment);

    router.post("/message/get-all-conversations", auth, messageController.allConversationWithMessages)
    router.post("/message/add-new-text-emoji", auth, messageController.addNewTextEmoji)
    router.post("/message/add-new-image", auth, messageController.addNewFile)
    router.get("/message/read-more-all-chat", auth, messageController.readMoreAllChat)
    router.get("/message/read-more-personal-chat", auth, messageController.readMorePersonalChat)
    router.get("/message/read-more-group-chat", auth, messageController.readMoreGroupChat)
    router.get("/message/read-more", auth, messageController.readMore)
    router.get("/message/find-conversations/:keyword", auth, messageController.findConversations)
    router.put("/message/delete-conversation", auth, messageController.deleteAllMessagesInPersonal)
    router.put("/message/mark-as-read", auth, messageController.markAsReadMess)

    router.post("/group-chat/add-new", auth, groupChat.addNewGroup)

    router.post("/group/new-group", auth, group.newGroup)
    router.get("/group/get-group-managing", auth, group.getGroupManaging)
    router.get("/group/get-group-joined", auth, group.getGroupJoined)
    router.get("/group/get-group-suggestions", auth, group.getGroupSuggestions)

    router.put("/group/leave-group", auth, group.leaveGroup)
    router.put("/group/join-group", auth, group.joinGroup)
    router.put("/group/remove-request-join-group", auth, group.removeRequestJoinGroup)
    router.put("/group/accept-join-group", auth, group.acceptJoinGroup)
    router.put("/group/kicked-out-group", auth, group.kickedOutGroup)
    router.get("/group/:id", auth, group.getGroup)
    router.get("/group/get-posts-in-group/:id", auth, postController.getPostInGroup)
    router.get("/group/get-photos-in-group/:id", auth, photo.getPhotosInGroup)
    router.put("/group/update-cover", auth, group.updateGroupCover)
    router.put("/group/update-group-info", auth, group.updateGroupInfo)

    router.get("/photos/:id", auth, photo.getAllMyPhoto)
    router.post("/photo/get-photo-in-post", auth, photo.photoInPost)
    router.get('/uploads/image/:filename', photo.disPlayImage);

    return app.use("/", router)
}

module.exports = initRoutes