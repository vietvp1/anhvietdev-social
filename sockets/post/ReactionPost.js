const {pushSocketIdToArray, emitNotifyToArray, removeSocketIdToArray} = require("../helpers/socketHelper")

let addNewContact = (io) => {
    let clients = {};
    io.on("connection", (socket) => {
        let currentUserId = socket.user._id;
        clients = pushSocketIdToArray(clients, currentUserId, socket.id);
        
        socket.on("upReaction" ,async (data) => {
            if (clients[data.contactId] && data.contactId !== currentUserId) {
                emitNotifyToArray(clients, data.contactId, io, "response-upReaction", {notification: data.notification}); 
            }
        });

        socket.on("upReaction-cmt" ,async (data) => {
            if (clients[data.contactId] && data.contactId !== currentUserId) {
                emitNotifyToArray(clients, data.contactId, io, "response-upReaction-cmt", {notification: data.notification}); 
            }
        });

        socket.on("disconnect", () => {
            clients = removeSocketIdToArray(clients, currentUserId, socket);
        });
    })
}

module.exports = addNewContact;