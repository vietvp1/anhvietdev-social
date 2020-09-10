const mongoose = require('mongoose')
const fsExtra = require('fs-extra')
let Schema = mongoose.Schema

let videoSchema = new Schema({
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
    files_id: {
        type: Schema.Types.ObjectId,
        ref: 'album'
    },
    fileName: String,
    description: String,
    views: Number,
    tags: [
        {
            type: Schema.Types.ObjectId,
            ref: 'user'
        }
    ],
}, { timestamps: true })

videoSchema.statics = {
    videoInPost(postId){
        return this.find({"post": postId});
    },
    async deleteVideoInPost(postId){
        const videos = await this.find({"post": postId}, {"url": 1})
        videos.forEach(item => fsExtra.remove(item.url))
        return this.deleteMany( {"post": postId});
    },
    getAllMyVideo(userId) {
        return this.find({
            from: {
                managedBy: "PERSONAL",
                idManager: userId
            }
        }).sort({ "createdAt": -1 })
    },
}

module.exports = mongoose.model('video', videoSchema);