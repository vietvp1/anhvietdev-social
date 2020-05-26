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
    description: String,
    data: Buffer, 
    contentType: String,
    fileName: String,
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