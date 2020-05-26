const {pushSocketIdToArray, emitNotifyToArray, removeSocketIdToArray} = require("../helpers/socketHelper")

let removeRequestContactReceived = (io) => {
    let clients = {};
    io.on("connection", (socket) => {
        let currentUserId = socket.user._id;
        clients = pushSocketIdToArray(clients, currentUserId, socket.id);

        socket.on("remove-request-contact-received" , (data) => {
            if (clients[data.contactId]) {
                emitNotifyToArray(clients, data.contactId, io, "response-remove-request-contact-received", currentUserId); 
            }
        });

        socket.on("disconnect", () => {
            clients = removeSocketIdToArray(clients, currentUserId, socket);
        });
    })
}

module.exports = removeRequestContactReceived;