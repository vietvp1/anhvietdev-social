const {pushSocketIdToArray, emitNotifyToArray, removeSocketIdToArray} = require("../helpers/socketHelper")
const ContactModel = require('../../models/contactModel')
const UserModel = require('../../models/userModel')
const _ = require("lodash");

let userOnlineOffline = (io) => {
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

        ///////////////////////////////////////
        let listUsersOnline;
        let friendIds = [];
        //step 1: emit to user after login or f5 web page
        socket.on('check-status', async () => {
            listUsersOnline = Object.keys(clients);
            friendIds = []

            let friends = await ContactModel.getFriends(currentUserId);
            friends.forEach((item) => {
                friendIds.push(item.userId);
                friendIds.push(item.contactId)
            });
            friendIds = _.uniqBy(friendIds);
            friendIds = friendIds.filter(userId => userId != currentUserId);
            listUsersOnline = listUsersOnline.filter(id => friendIds.includes(id));
            
            let listUsersOnlinePromise = listUsersOnline.map(async userId => {
                let user = await UserModel.getNormalUserDataById(userId)
                return user;
            })
            let listUsersOnlineInfo = await Promise.all(listUsersOnlinePromise)
            let currentUser = await UserModel.getNormalUserDataById(currentUserId)
            
            socket.emit("server-send-list-users-online", listUsersOnlineInfo);
            
            if (clients[currentUserId].length === 1 ) {
                listUsersOnline.forEach(userId => {
                    emitNotifyToArray(clients, userId, io, "server-send-when-new-user-online", currentUser);
                });
            }
        })
        ///////////////////////////////////////
        socket.on("disconnect", () => {
            clients = removeSocketIdToArray(clients, currentUserId, socket);
            socket.chatGroupIds.forEach(group => {
                clients = removeSocketIdToArray(clients, group._id, socket);
            });

            // update số user online còn lại
            listUsersOnline = Object.keys(clients);
            listUsersOnline = listUsersOnline.filter(id => friendIds.includes(id));
            
            if (!clients[currentUserId]) {
                listUsersOnline.forEach(userId => {
                    emitNotifyToArray(clients, userId, io, "server-send-when-new-user-offline", currentUserId);
                });
            }
        });
    })
}

module.exports = userOnlineOffline;