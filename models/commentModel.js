const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = mongoose.Schema({
    writer: {
        type: Schema.Types.ObjectId,
        ref: 'user',
    }, 
    postId: {
        type: Schema.Types.ObjectId,
        ref: 'post',
    },
    responseTo: {
        type: Schema.Types.ObjectId,
        ref: 'comment',
        default: null
    },
    content: String,
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
}, { timestamps: true })

commentSchema.statics = {
    deleteCmtInPost(postId){
        return this.deleteMany({"postId" : postId });
    },

    deleteComment(commentId){
        return this.deleteMany({
            $or: [
                {"_id": commentId},
                {"responseTo": commentId}
            ]
        })
    },

    upReactionComment(id , userId, type){
        return this.findByIdAndUpdate(id, 
            {
                $push: {"reactions": { user: userId, typeReact: type } }
            }
        )
    },

    unReactionComment(id , userId){
        return this.findByIdAndUpdate(id, 
            {
                $pull: { "reactions": { user: userId } } 
            }
        )
    },

    getCommentResByCmtId(cmtResId , postId){
        return this.find({
            $and: [
                {"postId": postId},
                {"responseTo": cmtResId}
            ]
        })
    },

    getCommentById(cmtId){
        return this.findById(cmtId);
    },

    getCommentChildOfPost(postId){
        return this.find({
            $and: [
                {"postId": postId},
                {"responseTo": null}
            ]
        })
    }
}


module.exports = mongoose.model('comment', commentSchema);


