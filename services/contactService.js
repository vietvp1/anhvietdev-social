const ContactModel = require('../models/contactModel')
const UserModel = require('../models/userModel')
const NotificationModel = require('../models/notificationModel')
const _ = require("lodash");
const LIMIT = 15;

let getContacts = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let contacts = await ContactModel.getFriends(userId, LIMIT);
            let users = contacts.map(async (contact) => {
                if (contact.contactId == userId) {
                    return await UserModel.getNormalUserDataById(contact.userId);
                } else {
                    return await UserModel.getNormalUserDataById(contact.contactId);
                }
            })
            resolve(await Promise.all(users));

        } catch (error) {
            reject(error);
        }
    })
}

let getContactsSent = (currentUserId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let contacts = await ContactModel.find({
                $and: [
                    { "userId": currentUserId },
                    { "status": false }
                ]
            }).sort({ "createdAt": -1 }).limit(LIMIT);
            let users = contacts.map(async (contact) => {
                return await UserModel.getNormalUserDataById(contact.contactId);
            })

            resolve(await Promise.all(users));

        } catch (error) {
            reject(error);
        }
    })
}

let getContactsReceived = (currentUserId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let contacts = await ContactModel.find({
                $and: [
                    { "contactId": currentUserId },
                    { "status": false }
                ]
            }).sort({ "createdAt": -1 }).limit(LIMIT);
            let users = contacts.map(async (contact) => {
                return await UserModel.getNormalUserDataById(contact.userId);
            })

            resolve(await Promise.all(users));

        } catch (error) {
            reject(error);
        }
    })
}

let addNew = (currentUserId, contactId) => {
    return new Promise(async (resolve, reject) => {
        let contactExists = await ContactModel.checkContact(currentUserId, contactId);
        if (contactExists) {
            return reject(false);
        }

        // create contact
        let newContactItem = {
            userId: currentUserId,
            contactId: contactId
        };
        let newContact = await ContactModel.create(newContactItem);

        //create notification
        let notificationItem = {
            sender: currentUserId,
            receiver: [contactId],
            object: {
                entity: NotificationModel.entity.CONTACT,
                entityType: NotificationModel.entityTypes.ADD_CONTACT
            }
        };
        await NotificationModel.model.create(notificationItem);

        resolve(newContact);

    })

}

let removeContact = (currentUserId, contactId) => {
    return new Promise(async (resolve, reject) => {
        let removeContact = await ContactModel.deleteOne({
            $or: [
                {
                    $and: [
                        { "userId": currentUserId },
                        { "contactId": contactId },
                        { "status": true },
                    ]
                },
                {
                    $and: [
                        { "userId": contactId },
                        { "contactId": currentUserId },
                        { "status": true },
                    ]
                },
            ]
        });

        if (removeContact.n === 0) {
            return reject(false);
        }

        resolve(true);
    })

}

let removeRequestContact = (currentUserId, contactId) => {
    return new Promise(async (resolve, reject) => {
        let removeReq = await ContactModel.deleteOne({
            $and: [
                { "userId": currentUserId },
                { "contactId": contactId },
                { "status": false },
            ]
        });

        if (removeReq.n === 0) {
            return reject(false);
        }

        //remove notification
        await NotificationModel.model.deleteOne({
            $and: [
                { "sender": currentUserId },
                { "receiver": contactId },
                { "object.entityType": NotificationModel.entityTypes.ADD_CONTACT },
            ]
        });

        resolve(true);
    })
}

let removeRequestContactReceived = (currentUserId, contactId) => {
    return new Promise(async (resolve, reject) => {
        let removeReq = await ContactModel.deleteOne({
            $and: [
                { "contactId": currentUserId },
                { "userId": contactId },
                { "status": false },
            ]
        });

        if (removeReq.n === 0) {
            return reject(false);
        }
        resolve(true);
    })
}

let approveRequestContactReceived = (currentUserId, contactId) => {
    return new Promise(async (resolve, reject) => {
        let approveReq = await ContactModel.updateOne({
            $and: [
                { "contactId": currentUserId },
                { "userId": contactId },
                { "status": false },
            ]
        }, {
            "status": true,
            "updatedAt": Date.now(),
        });

        if (approveReq.nModified === 0) {
            return reject(false);
        }

        //create notification đã chấp nhập kết bạn trong db
        let notificationItem = {
            sender: currentUserId,
            receiver: [contactId],
            object: {
                entity: NotificationModel.entity.CONTACT,
                entityType: NotificationModel.entityTypes.APPROVE_CONTACT
            }
        };
        await NotificationModel.model.create(notificationItem);

        resolve(true);
    })
}

let findUsersContact = (currentUserId, keyword) => {
    return new Promise(async (resolve, reject) => {
        let deprecatedUserIds = [currentUserId];
        let contactsByUser = await ContactModel.find({
            $or: [
                { "userId": currentUserId },
                { "contactId": currentUserId }
            ]
        });

        contactsByUser.forEach((contact) => {
            deprecatedUserIds.push(contact.userId);
            deprecatedUserIds.push(contact.contactId)
        });
        deprecatedUserIds = _.uniqBy(deprecatedUserIds);
        // find all users để kết bạn
        let users = await UserModel.find({
            $and: [
                { "_id": { $nin: deprecatedUserIds } },
                {
                    $or: [
                        { "firstName": { "$regex": new RegExp(keyword, "i") } },
                        { "lastName": { "$regex": new RegExp(keyword, "i") } },
                    ]
                }
            ]
        }, { _id: 1, firstName: 1, lastName: 1, address: 1, avatar: 1 });
        resolve(users);
    })

}

let searchFriends = (currentUserId, keyword) => {
    return new Promise(async (resolve, reject) => {
        let friendIds = [];
        let friends = await ContactModel.getFriends(currentUserId, 20);
        friends.forEach((item) => {
            friendIds.push(item.userId);
            friendIds.push(item.contactId)
        });
        friendIds = _.uniqBy(friendIds);
        friendIds = friendIds.filter(userId => userId != currentUserId);
        let users = await UserModel.getNormalUserDataByIdAndKeyword(friendIds, keyword);
        resolve(users);
    })

}

let checkContact = (currentUserId, contactId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let isReceived = await ContactModel.findOne({
                $and: [
                    { "userId": contactId },
                    { "contactId": currentUserId },
                    { "status": false }
                ]
            })
            if (isReceived) {
                resolve('isReceived');
                return;
            }

            let isSent = await ContactModel.findOne({
                $and: [
                    { "userId": currentUserId },
                    { "contactId": contactId },
                    { "status": false }
                ]
            })
            if (isSent) {
                resolve('isSent');
                return;
            }

            let contactExists = await ContactModel.checkContact(currentUserId, contactId);
            if (!contactExists) {
                resolve('contactNotExists');
                return;
            }

            resolve('contactExists');

        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    addNew: addNew,
    removeContact: removeContact,
    getContacts: getContacts,
    getContactsSent: getContactsSent,
    getContactsReceived: getContactsReceived,
    removeRequestContact: removeRequestContact,
    removeRequestContactReceived: removeRequestContactReceived,
    approveRequestContactReceived: approveRequestContactReceived,
    searchFriends: searchFriends,
    findUsersContact: findUsersContact,
    checkContact: checkContact
}