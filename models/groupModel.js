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
    members: [
        {
            type: Schema.Types.ObjectId,
            ref: 'user'
        }
    ],
    cover: {
        type: Schema.Types.ObjectId,
        ref: 'photo',
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
        return this.find({ "admins": userId }, { "members": { $slice: 5 } }).populate(
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
        return this.find({ "members": userId }, { "members": { $slice: 5 } }).populate(
            {
                path: 'members',
                select: ['firstName', 'lastName', 'address', 'avatar']
            }
        );
    },

    getGroup(groupId) {
        return this.findById(groupId, { "members": { $slice: 10 } })
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
    }
}

module.exports = mongoose.model('group', groupSchema);