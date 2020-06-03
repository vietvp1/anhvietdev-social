const mongoose = require('mongoose')
let Schema = mongoose.Schema;

let MessageSchema = new Schema({
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    receiver: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    conversationType: String,
    userCurrent: [
        {
            type: Schema.Types.ObjectId,
            ref: 'user'
        }
    ],
    isReaded: { type: Boolean, default: false },
    text: String,
    video: [
        {
            url: String,
            contentType: String,
            fileName: String,
            messageType: String,
        }
    ],
    file: [
        {
            data: Buffer,
            contentType: String,
            fileName: String,
            messageType: String,
        }
    ],
}, { timestamps: true })

// MessageSchema.path('text').validate(function(v) {
//     console.log("vao mess");
//   });

MessageSchema.statics = {
    getMessagesInPersonal(currentId, receiver, limit) {
        return this.find({
            $or: [
                {
                    $and: [
                        { "sender": currentId },
                        { "receiver": receiver },
                        { "userCurrent": { $elemMatch: { "$eq": currentId } } }
                    ]
                },
                {
                    $and: [
                        { "receiver": currentId },
                        { "sender": receiver },
                        { "userCurrent": { $elemMatch: { "$eq": currentId } } }
                    ]
                },
            ]
        })
            .populate(
                {
                    path: 'sender',
                    select: ['firstName', 'lastName', 'address', 'avatar']
                }
            )
            .sort({ "createdAt": -1 }).limit(limit);
    },

    deleteAllMessagesFisrtUser(sender, userChatId) {
        return this.updateMany({
            $or: [
                {
                    $and: [
                        { "sender": sender },
                        { "receiver": userChatId },
                        { "userCurrent": { $elemMatch: { "$eq": sender } } }
                    ]
                },
                {
                    $and: [
                        { "receiver": sender },
                        { "sender": userChatId },
                        { "userCurrent": { $elemMatch: { "$eq": sender } } }
                    ]
                },
            ]
        }, {
            "userCurrent": [{ userId: userChatId }]
            // {
            //     $filter: {
            //         input: "$userCurrent",
            //         as: "userId",
            //         cond: { $ne: [{"$$userId": sender}] }
            //     }
            // }
        });
    },

    deleteAllMessages(sender, userChatId) {
        return this.deleteMany({
            $or: [
                {
                    $and: [
                        { "sender": sender },
                        { "receiver": userChatId },
                        { "userCurrent": { $elemMatch: { "$eq": sender } } },
                        { "userCurrent": { $size: 1 } }
                    ]
                },
                {
                    $and: [
                        { "receiver": sender },
                        { "sender": userChatId },
                        { "userCurrent": { $elemMatch: { "$eq": sender } } },
                        { "userCurrent": { $size: 1 } }
                    ]
                },
            ]
        });
    },

    //receiver là id của group chat
    getMessagesInGroup(receiver, limit) {
        return this.find({ "receiver": receiver })
            .populate(
                {
                    path: 'sender',
                    select: ['firstName', 'lastName', 'address', 'avatar']
                }
            )
            .sort({ "createdAt": -1 }).limit(limit);
    },

    readMoreMessagesInPersonal(sender, receiver, skip, limit) {
        return this.find({
            $or: [
                {
                    $and: [
                        { "sender": sender },
                        { "receiver": receiver }
                    ]
                },
                {
                    $and: [
                        { "receiver": sender },
                        { "sender": receiver }
                    ]
                },
            ]
        }).sort({ "createdAt": -1 }).skip(skip).limit(limit);
    },

    readMoreMessagesInGroup(receiver, skip, limit) {
        return this.find({ "receiver": receiver }).sort({ "createdAt": -1 }).skip(skip).limit(limit);
    },

}

const MESSAGE_CONVERSATION_TYPES = {
    PERSONAL: "personal",
    GROUP: "group",
};

const MESSAGE_TYPES = {
    TEXT: "text",
    IMAGE: "image",
    ATTACHMENT: "attachment",
    VIDEO: "video"
}

module.exports = {
    model: mongoose.model('message', MessageSchema),
    conversationTypes: MESSAGE_CONVERSATION_TYPES,
    messageTypes: MESSAGE_TYPES,
}