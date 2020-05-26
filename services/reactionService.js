const PostModel = require("../models/postModel")
const CommentModel = require("../models/commentModel")

let upReaction = (postId, userId, type) => {
    return new Promise(async (resolve, reject) =>{
        try {
            await PostModel.model.unReaction(postId, userId);
            let reaction = await PostModel.model.upReaction(postId, userId, type);
            resolve(reaction)
        } catch (error) {
            reject(error)
        }
    }) 
};

let unReaction = (postId, userId) => {
    return new Promise(async (resolve, reject) =>{
        try {
            await PostModel.model.unReaction(postId, userId);
            resolve(true)
        } catch (error) {
            reject(error)
        }
    }) 
};

///////////////////////////////////////////
let upReactionComment = (commentId, userId, type) => {
    return new Promise(async (resolve, reject) =>{
        try {
            await CommentModel.unReactionComment(commentId, userId);
            let reaction = await CommentModel.upReactionComment(commentId, userId, type);
            resolve(reaction);
        } catch (error) {
            reject(error)
        }
    }) 
};

let unReactionComment = (commentId, userId, receiverId) => {
    return new Promise(async (resolve, reject) =>{
        try {
            await CommentModel.unReactionComment(commentId, userId);
            resolve(true)
        } catch (error) {
            reject(error)
        }
    }) 
};

module.exports = {
    upReaction: upReaction,
    unReaction: unReaction,
    upReactionComment: upReactionComment,
    unReactionComment: unReactionComment
}