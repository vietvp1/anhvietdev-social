const {pushSocketIdToArray, emitNotifyToArray, removeSocketIdToArray} = require("../helpers/socketHelper")

let removeContact = (io) => {
    let clients = {};
    io.on("connection", (socket) => {
        let currentUserId = socket.user._id;
        clients = pushSocketIdToArray(clients, currentUserId, socket.id);

        socket.on("remove-contact" , (data) => {
            if (clients[data.contactId]) {
                emitNotifyToArray(clients, data.contactId, io, "response-remove-contact", currentUserId); 
            }
        });

        socket.on("disconnect", () => {
            clients = removeSocketIdToArray(clients, currentUserId, socket);
        });
    })
}

module.exports = removeContact;