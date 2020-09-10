const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    writer: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    from: {
        managedBy: String,
        idManager: String
    },
    title: String,
    numberComments: {
        type: Number,
        default: 0,
        min: 0
    },
    text: {
        type: String
    },
    tags: [
        {
            type: Schema.Types.ObjectId,
            ref: 'user'
        }
    ],
    reactions: [
        {
            createdAt: {
                type: Date,
                default: Date.now
            },
            user: {
                type: Schema.Types.ObjectId,
                ref: 'user',
            },
            typeReact: String
        }
    ],
    privacy: {
        type: Number,
        min: 0,
        max: 2,
        default: 1  // 0: private, 2: friends, 1: public
    },

}, { timestamps: true })

const FROM = {
    PERSONAL: "PERSONAL",
    GROUP: "GROUP",
}

PostSchema.statics = {
    getPosts(userId, currentUserId, friendIds) {
        return this.find({
            "from.managedBy": FROM.PERSONAL,
            $or: [
                {
                    "tags": userId
                },

                {
                    "writer": userId,
                    $or: [
                        {
                            "privacy": { $eq: 1 }
                        },
                        {
                            "writer": { $in: friendIds },
                            "privacy": { $eq: 2 }
                        },
                        {
                            "writer": currentUserId,
                            "privacy": { $eq: 0 }
                        },
                    ]
                }
            ]
        })
            .populate(
                {
                    path: 'writer',
                    select: ['firstName', 'lastName', 'address', 'avatar']
                }
            )
            .populate('reactions.user', ['firstName', 'lastName'])
            .populate('tags', ['firstName', 'lastName'])
            .sort({ "updatedAt": -1 });
    },

    getAllPosts(followingIds, friendIds, currentUserId) {
        return this.find({
            "from.managedBy": FROM.PERSONAL,
            $or: [
                {
                    "writer": { $in: followingIds },
                    "privacy": { $eq: 1 }
                },
                {
                    $and: [
                        { "writer": { $in: friendIds } },
                        { "writer": { $in: followingIds } },
                    ],
                    "privacy": { $eq: 2 }
                },
                {
                    "writer": currentUserId,
                },
            ]
        })
            .populate(
                {
                    path: 'writer',
                    select: ['firstName', 'lastName', 'address', 'avatar']
                }
            )
            .populate('reactions.user', ['firstName', 'lastName'])
            .populate('tags', ['firstName', 'lastName'])
            .sort({ "updatedAt": -1 });
    },

    getPostInGroup(item) {
        return this.find(item)
            .populate(
                {
                    path: 'writer',
                    select: ['firstName', 'lastName', 'address', 'avatar']
                }
            )
            .populate('reactions.user', ['firstName', 'lastName'])
            .populate('tags', ['firstName', 'lastName'])
            .sort({ "updatedAt": -1 });
    },

    upReaction(id, userId, type) {
        return this.findByIdAndUpdate(id,
            {
                $push: { "reactions": { user: userId, typeReact: type } }
            }
        )
    },

    unReaction(id, userId) {
        return this.findByIdAndUpdate(id,
            {
                $pull: { "reactions": { user: userId } }
            }
        )
    },
}

module.exports = {
    model: mongoose.model('post', PostSchema),
    from: FROM
}