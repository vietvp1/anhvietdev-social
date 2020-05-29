const { pushSocketIdToArray, emitNotifyToArray, removeSocketIdToArray } = require("../helpers/socketHelper")
const NotificationModel = require('../../models/notificationModel');

let approveRequestContactReceived = (io) => {
    let clients = {};
    io.on("connection", (socket) => {
        let currentUserId = socket.user._id;
        clients = pushSocketIdToArray(clients, currentUserId, socket.id);

        socket.on("approve-request-contact-received", async (data) => {
            let currentUser = {
                _id: currentUserId,
                firstName: socket.user.firstName,
                lastName: socket.user.lastName,
                avatar: socket.user.avatar,
                address: (socket.user.address !== null) ? socket.user.address : ""
            };
            let notif = await NotificationModel.model.findOne({
                $and: [
                    { "sender": currentUserId },
                    { "receiver": data.contactId },
                    { "object.entityType": NotificationModel.entityTypes.APPROVE_CONTACT },
                ]
            });
            notif = await notif.populate(
                {
                    path: 'sender',
                    select: ['firstName', 'lastName', 'address', 'avatar'],
                    populate: {
                        path: "avatar",
                    }
                }
            ).execPopulate();

            if (clients[data.contactId]) {
                emitNotifyToArray(clients, data.contactId, io, "response-approve-request-contact-received", { currentUser, notif });
            }
        });

        socket.on("disconnect", () => {
            clients = removeSocketIdToArray(clients, currentUserId, socket);
        });
    })
}

module.exports = approveRequestContactReceived;