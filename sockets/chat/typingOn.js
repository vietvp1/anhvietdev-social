const {pushSocketIdToArray, emitNotifyToArray, removeSocketIdToArray} = require("../helpers/socketHelper")

let typingOn = (io) => {
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

        socket.on("user-is-typing" , (data) => {
            if (data.groupId) {
                let response = {
                    currentGroupId: data.groupId,
                    currentUserId: currentUserId,
                }
                if (clients[data.groupId]) {
                    emitNotifyToArray(clients, data.groupId, io, "response-user-is-typing", response); 
                }
            }
            if (data.contactId) {
                if (clients[data.contactId]) {
                    emitNotifyToArray(clients, data.contactId, io, "response-user-is-typing", {avatar: data.avatar}); 
                }
            }
            
        });

        socket.on("user-mark-readed-mess" , (data) => {
            if (data.groupId) {
                let response = {
                    currentGroupId: data.groupId,
                    currentUserId: currentUserId,
                }
                if (clients[data.groupId]) {
                    emitNotifyToArray(clients, data.groupId, io, "response-user-mark-readed-mess", response); 
                }
            }
            if (data.contactId) {
                if (clients[data.contactId]) {
                    emitNotifyToArray(clients, data.contactId, io, "response-user-mark-readed-mess", data.data); 
                }
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

module.exports = typingOn;