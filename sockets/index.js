const addNewContact = require("./contact/addNewContact")
const removeRequestContact = require("./contact/removeRequestContact")
const removeRequestContactReceived = require("./contact/removeRequestContactReceived")
const approveRequestContactReceived = require("./contact/approveRequestContactReceived")
const removeContact = require("./contact/removeContact")
const chatTextEmoji = require("./chat/chatTextEmoji")
const chatFile = require("./chat/chatFile")
// const chatAttachment = require("./chat/chatAttachment")
const chatVideo = require("./chat/chatVideo")
const typingOn = require("./chat/typingOn")
const typingOff = require("./chat/typingOff")
const userOnlineOffline = require("./status/userOnlineOffline")
const newGroupChat = require("./group/newGroupChat")
// const newMemberAdded = require("./group/newMemberAdded")
// const chatVideoGroup = require("./chat/chatVideoGroup")
const ReactionPost = require("./post/ReactionPost")

let initSockets = (io) => {
    addNewContact(io);
    removeRequestContact(io);
    removeRequestContactReceived(io);
    approveRequestContactReceived(io);
    removeContact(io);
    chatTextEmoji(io);
    chatFile(io);
    // chatAttachment(io);
    chatVideo(io);
    typingOn(io);
    typingOff(io);
    userOnlineOffline(io);
    newGroupChat(io);
    // newMemberAdded(io);
    // chatVideoGroup(io);
    ReactionPost(io);
}

module.exports = initSockets