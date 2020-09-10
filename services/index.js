const auth = require('./authService')
const post = require('./postService')
const user = require('./userService')
const contact = require('./contactService')
const notificationService = require("./notificationService")
const reactionService = require("./reactionService")
const commentService = require("./commentService")
const messageService = require("./messageService")
const groupChatService = require("./groupChatService")
const photoService = require("./photoService");
const videoService = require("./videoService");
const groupService = require("./groupService");
const followerService = require("./followerService");

module.exports = {
    authService: auth,
    userService: user,
    postService: post,
    contact: contact,
    notification: notificationService,
    reactionService: reactionService,
    commentService: commentService,
    message: messageService,
    groupChat: groupChatService,
    photo: photoService,
    videoService,
    groupService,
    followerService
}