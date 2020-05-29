const mongoose = require('mongoose');
let Schema = mongoose.Schema;

const conversationSchema = new Schema({
    firstOne: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    secondOne: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
}, { timestamps: true })

conversationSchema.statics = {
    getConversations(id, limit) {
        return this.find({
            $or: [
                { "firstOne": id },
                { "secondOne": id }
            ]
        })
            .populate(
                {
                    path: 'firstOne',
                    select: ['firstName', 'lastName', 'address', 'avatar'],
                    populate: {
                        path: "avatar",
                    }
                }
            )
            .populate(
                {
                    path: 'secondOne',
                    select: ['firstName', 'lastName', 'address', 'avatar'],
                    populate: {
                        path: "avatar",
                    }
                }
            )
            .sort({ "updatedAt": -1 })
            .limit(limit);
    },

    updateWhenHasNewMessage(firstOne, secondOne) {
        return this.updateOne({
            $or: [
                {
                    $and: [
                        { "firstOne": firstOne },
                        { "secondOne": secondOne }
                    ]
                },
                {
                    $and: [
                        { "firstOne": secondOne },
                        { "secondOne": firstOne }
                    ]
                },
            ]
        }, {
            "updatedAt": Date.now()
        });
    },

    getOneConversation(firstOne, secondOne) {
        return this.findOne({
            $or: [
                {
                    $and: [
                        { "firstOne": firstOne },
                        { "secondOne": secondOne }
                    ]
                },
                {
                    $and: [
                        { "firstOne": secondOne },
                        { "secondOne": firstOne }
                    ]
                },
            ]
        });
    },

    deleteOneConversation(firstOne, secondOne) {
        return this.deleteOne({
            $or: [
                {
                    $and: [
                        { "firstOne": firstOne },
                        { "secondOne": secondOne }
                    ]
                },
                {
                    $and: [
                        { "firstOne": secondOne },
                        { "secondOne": firstOne }
                    ]
                },
            ]
        });
    },

    readMoreConversations(id, skipNumber, limit) {
        return this.find({
            $or: [
                { "firstOne": id },
                { "secondOne": id }
            ]
        }).sort({ "updatedAt": -1 }).skip(skipNumber).limit(limit);
    },

}

module.exports = mongoose.model('conversation', conversationSchema);