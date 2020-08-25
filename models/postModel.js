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
    getposts(userId) {
        return this.find({ "from.managedBy": FROM.PERSONAL, "writer": userId })
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

    getAllPosts(UserIds) {
        return this.find({ "from.managedBy": FROM.PERSONAL, "writer": { $in: UserIds } })
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