const mongoose = require('mongoose')
let Schema = mongoose.Schema;

let ChatGroupSchema = new Schema({
    name: String,
    userAmount: { type: Number, min: 3, max: 200 },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    members: [
        {
            type: Schema.Types.ObjectId,
            ref: 'user'
        }
    ]
}, { timestamps: true })

ChatGroupSchema.statics = {
    getChatGroups(userId, limit) {
        return this.find({
            "members": { $elemMatch: { "$eq": userId } }
        })
            .populate(
                {
                    path: 'members',
                    select: ['firstName', 'lastName', 'address', 'avatar'],
                }
            )
            .sort({ "updatedAt": -1 })
            .limit(limit).exec();
    },

    getChatGroupById(id) {
        return this.findById(id)
            .populate(
                {
                    path: 'members',
                    select: ['firstName', 'lastName', 'address', 'avatar'],
                }
            )
            .select('-__v');
    },

    updateWhenHasNewMessage(id) {
        return this.findByIdAndUpdate(id, {
            "updatedAt": Date.now(),
        });
    },

    getChatGroupIdsByUser(userId) {
        return this.find({
            "members": { $elemMatch: { "$eq": userId } }
        }, { _id: 1 });
    },

    readMoreChatGroups(userId, skip, limit) {
        return this.find({
            "members": { $elemMatch: { "$eq": userId } }
        }).sort({ "updatedAt": -1 }).skip(skip).limit(limit);
    },

    getChatGroupsByKeyword(userId, keyword, limit) {
        return this.find({
            $and: [
                { "members": { $elemMatch: { "$eq": userId } } },
                {
                    $or: [
                        { "name": { "$regex": new RegExp(keyword, "i") } },
                    ]
                }
            ]
        }).sort({ "updatedAt": -1 }).limit(limit);
    },

    addMoreMembersForGroup(id, arrayMemberIds, numberOfMembers) {
        return this.findByIdAndUpdate(id,
            {
                "userAmount": numberOfMembers,
                $push: { "members": { $each: arrayMemberIds } }
            }
        )
    },

    removeMembers(id, arrayMemberIds) {
        return this.findByIdAndUpdate(id,
            {
                $pull: { "members": { $each: arrayMemberIds } }
            }
        )
    }
}

module.exports = mongoose.model('chat-group', ChatGroupSchema)