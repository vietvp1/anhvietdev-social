const mongoose = require('mongoose')
let Schema = mongoose.Schema;

let followerSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    followerId: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
}, { timestamps: true })

followerSchema.statics = {
    findFollowExist(currentUserId, followerId) {
        return this.findOne({
            $and: [
                { "userId": currentUserId },
                { "followerId": followerId }
            ]
        })
    },

    removeFollower(currentUserId, followerId) {
        return this.deleteOne({
            $and: [
                { "userId": currentUserId },
                { "followerId": followerId }
            ]
        })
    },
}

module.exports = mongoose.model('follower', followerSchema)