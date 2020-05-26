const auth = require('./authController')
const post = require('./postController')
const user = require('./userController')
const contact = require('./contactController')
const notification = require('./notificationController')
const reaction = require('./reactionController')
const comment = require('./commentController')
const message = require('./messageController')
const groupChatController = require('./groupChatController')
const photoController = require('./photoController')
const groupController = require('./groupController')

module.exports = {
    authController: auth,
    userController: user,
    postController: post,
    contactController: contact,
    notificationController: notification,
    reactionController: reaction,
    commentController: comment,
    messageController: message,
    groupChat: groupChatController,
    group: groupController,
    photo: photoController
}