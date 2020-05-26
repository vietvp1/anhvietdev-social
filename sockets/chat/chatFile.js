const {pushSocketIdToArray, emitNotifyToArray, removeSocketIdToArray} = require("../helpers/socketHelper")
const MessageModel = require('../../models/messageModel')
const ChatGroupModel = require("../../models/chatGroupModel")
const UserModel = require("../../models/userModel")

const _ = require("lodash")

let chatFile = (io) => {
    let clients = {};
    io.on("connection", (socket) => {
        let currentUserId = socket.user._id;
        clients = pushSocketIdToArray(clients, currentUserId, socket.id);
        socket.chatGroupIds.forEach(group => {
            clients = pushSocketIdToArray(clients, group._id, socket.id);
        });

        //when has new group chat
        socket.on("new-group-created" , (data) => {
            clients = pushSocketIdToArray(clients, data.groupChat._id, socket.id);
        });
        socket.on("member-received-group-chat", (data) => {
            clients = pushSocketIdToArray(clients, data.groupChatId, socket.id);
        });
        socket.on("newMember-received-group-chat", (data) => {
            clients = pushSocketIdToArray(clients, data.groupChatId, socket.id);
        });

        socket.on("chat-file" , async (data) => {
            let userChat = {
                _id: socket.user._id,
                avatar: socket.user.avatar,
                firstName: socket.user.firstName,
                lastName: socket.user.lastName
            } 

            if (data.groupId && clients[data.groupId]) {
                let conversation = await ChatGroupModel.getChatGroupById(data.groupId);
                let getMessages = await MessageModel.model.getMessagesInGroup(data.groupId, 30);
                
                let con = {
                    _id: conversation._id,
                    name: conversation.name,
                    userAmount: conversation.userAmount,
                    userId: conversation.userId,
                    members: conversation.members,
                    createdAt: conversation.createdAt,
                    updatedAt: conversation.updatedAt,
                    messages: _.reverse(getMessages),
                };

                let responseForGroup = {
                    conversation: con,
                    message: data.payload,
                    currentUserId: currentUserId
                }
                
                emitNotifyToArray(clients, data.groupId, io, "response-chat-file",responseForGroup);
            }
            if (data.contactId && clients[data.contactId]) {
                let conversation;
                let getMessages = await MessageModel.model.getMessagesInPersonal(data.contactId, currentUserId, 30);

                conversation = {
                    _id: data.idConversation
                }
                
                conversation = Object.assign(conversation, {
                    messages: _.reverse(getMessages),
                    userChat: userChat
                });

                let responseForPersonal = {
                    conversation: conversation,
                    message: data.payload,
                    currentUserId: currentUserId
                }
                emitNotifyToArray(clients, data.contactId, io, "response-chat-text-emoji", responseForPersonal);
            }
        });

        socket.on("disconnect", () => {
            clients = removeSocketIdToArray(clients, currentUserId, socket);
            socket.chatGroupIds.forEach(group => {
                clients = removeSocketIdToArray(clients, group._id, socket);
            });
        });
    })
}

module.exports = chatFile;