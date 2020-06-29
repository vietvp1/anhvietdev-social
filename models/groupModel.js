const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let groupSchema = new Schema({
    name: String,
    admins: [
        {
            type: Schema.Types.ObjectId,
            ref: 'user'
        }
    ],
    userAmount: { type: Number, min: 3 },
    members: [
        {
            type: Schema.Types.ObjectId,
            ref: 'user'
        }
    ],
    requestsJoin: [
        {
            type: Schema.Types.ObjectId,
            ref: 'user',
        }
    ],
    cover: {
        type: String,
        default: 'cover-default.jpg'
    },
    description: String,
    icon: String,
    privacy: {
        type: Number,
        min: 0,
        max: 1,
        default: 1  // 0: secret,  1: private
    },
}, { timestamps: true })

groupSchema.statics = {
    getGroupManaging(userId) {
        return this.find({ "admins": userId }, { "members": { $slice: 5 }, "requestsJoin": 0 }).populate(
            {
                path: 'members',
                select: ['firstName', 'lastName', 'address', 'avatar'],
                // populate: {
                //     path: "avatar",
                // }
            }
        );
    },

    getGroupJoined(userId) {
        return this.find({ "members": userId }, { "members": { $slice: 5 }, "requestsJoin": 0 }).populate(
            {
                path: 'members',
                select: ['firstName', 'lastName', 'address', 'avatar']
            }
        );
    },

    getGroup(groupId) {
        return this.findById(groupId, { "members": { $slice: 10 }, "requestsJoin": 0 })
            .populate(
                {
                    path: 'members',
                    select: ['firstName', 'lastName', 'address', 'avatar'],
                }
            ).populate(
                {
                    path: 'admins',
                    select: ['firstName', 'lastName', 'address', 'avatar'],
                }
            );
    },

    getGroupForAdmin(groupId) {
        return this.findById(groupId, { "members": { $slice: 10 }})
            .populate(
                {
                    path: 'members',
                    select: ['firstName', 'lastName', 'address', 'avatar'],
                }
            ).populate(
                {
                    path: 'admins',
                    select: ['firstName', 'lastName', 'address', 'avatar'],
                }
            ).populate('requestsJoin', ['firstName', 'lastName', 'address', 'avatar']);
    },

    updateCover(groupId, item) {
        return this.findByIdAndUpdate(groupId, item,
            {
                "members": { $slice: 10 },
                new: true
            }).populate(
                {
                    path: 'members',
                    select: ['firstName', 'lastName', 'address', 'avatar'],
                }
            ).populate(
                {
                    path: 'admins',
                    select: ['firstName', 'lastName', 'address', 'avatar'],
                }
            );
    },

    getGroupSuggestions(userId) {
        return this.find({
            //  {$nin: [userId]} cái này hiệu quả hơn trong việc sử dùng nhiều giá trị, $ne cũng tốt nếu chỉ có một giá trị(nhanh hơn)
            "admins": { $ne: userId }, //https://stackoverflow.com/questions/16221599/find-documents-with-arrays-not-containing-a-document-with-a-particular-field-val
            "members": { $ne: userId }
        })
            .populate('admins', ['firstName', 'lastName', 'address', 'avatar'])
            .populate('members', ['firstName', 'lastName', 'address', 'avatar'])
            .limit(5);
    },

    acceptJoinGroup(groupId, userId) {
        return this.findByIdAndUpdate(groupId,
            {
                $push: { "members": userId }
            }
        )
    },

    leaveGroup(groupId, userId) {
        return this.findByIdAndUpdate(groupId,
            {
                $pull: { "members": userId }
            }
        )
    },

    joinGroup(groupId, userId) {
        return this.findByIdAndUpdate(groupId,
            {
                $push: { "requestsJoin": userId }
            }
        )
    },

    removeRequestJoinGroup(groupId, userId) {
        return this.findByIdAndUpdate(groupId,
            {
                $pull: { "requestsJoin": userId }
            }
        )
    },
}

module.exports = mongoose.model('group', groupSchema);