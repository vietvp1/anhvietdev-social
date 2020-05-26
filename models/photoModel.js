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
            // nếu lưu hình ảnh trong folder uploads thì khi xóa phải xóa cả hình ảnh lưu trong folder này
            //const photos = await this.find({ "post": postId })
            //photos.forEach(item => fsExtra.remove(item.url))
        return this.deleteMany({ "post": postId });
    },

    photoInPost(postId) {
        return this.find({ "post": postId });
    }
}

module.exports = mongoose.model('photo', photoSchema);