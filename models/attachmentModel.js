const mongoose = require('mongoose')
let Schema = mongoose.Schema

let attachmentSchema = new Schema({
    from: {
        managedBy: String,
        idManager: String
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: 'post'
    },
    album: String,
    files_id: {
        type: Schema.Types.ObjectId,
        ref: 'album'
    },
    fileName: String,
    description: String,
    tags: [
        {
            type: Schema.Types.ObjectId,
            ref: 'user'
        }
    ],
}, { timestamps: true })

attachmentSchema.statics = {
    attachmentInPost(postId){
        return this.find({"post": postId});
    },
    deleteAttachmentInPost(postId){
        return this.deleteMany( {"post": postId});
    },
}

module.exports = mongoose.model('attachment', attachmentSchema);