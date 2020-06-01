const mongoose = require('mongoose')
let Schema = mongoose.Schema

let photoSchema = new Schema({
    from: {
        managedBy: String,
        idManager: String
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: 'post'
    },
    album: {
        type: Schema.Types.ObjectId,
        ref: 'album'
    },
    data: Buffer,
    description: String,
    contentType: String,
    fileName: String,
    tags: [
        {
            type: Schema.Types.ObjectId,
            ref: 'user'
        }
    ],
}, { timestamps: true })

photoSchema.statics = {
    getAllMyPhoto(userId) {
        return this.find({
            from: {
                managedBy: "PERSONAL",
                idManager: userId
            }
        }).sort({ "createdAt": -1 })
    },

    getPhotosByPostId(userId) {
        return this.find({
            from: {
                managedBy: "PERSONAL",
                idManager: userId
            }
        }).sort({ "createdAt": -1 })
    },

    deletePhotoInPost(postId) {
        return this.deleteMany({ "post": postId });
    },

    photoInPost(postId) {
        return this.find({ "post": postId });
    },

    getPhotosInGroup(groupId, limit) {
        return this.find({
            from: {
                managedBy: "GROUP",
                idManager: groupId
            }
        }).limit(limit).sort({ "createdAt": -1 })
    },
    
}

module.exports = mongoose.model('photo', photoSchema);