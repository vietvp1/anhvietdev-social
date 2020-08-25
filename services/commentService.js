const CommentModel = require('../models/commentModel');
const postModel = require('../models/postModel');

let saveComment = (variable) => {
    return new Promise(async (resolve, reject) => {
        try {
            let comment = await (await CommentModel.create(variable)).populate(
                {
                    path: 'writer',
                    select: ['firstName', 'lastName', 'address', 'avatar']
                }
            ).execPopulate();
            let post = await postModel.model.findById(variable.postId);
            post.numberComments++;
            post.save();
            resolve(comment)
        } catch (error) {
            reject(error)
        }
    })
};

let getComments = (variable) => {
    return new Promise(async (resolve, reject) => {
        try {
            let comments = await CommentModel.find(variable)
                .populate(
                    {
                        path: 'writer',
                        select: ['firstName', 'lastName', 'address', 'avatar']
                    }
                )
                .populate(
                    {
                        path: 'likes.user',
                        select: ['firstName', 'lastName', 'address', 'avatar']
                    }
                )
                .populate(
                    {
                        path: 'reactions.user',
                        select: ['firstName', 'lastName', 'address', 'avatar']
                    }
                )
            resolve(await Promise.all(comments))
        } catch (error) {
            reject(error)
        }
    })
};

let deleteComment = (cmtId, postId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let removeReq = await CommentModel.deleteComment(cmtId);
            if (removeReq.n === 0) {
                return reject(false);
            }
            let post = await postModel.model.findById(postId);
            post.numberComments = post.numberComments - removeReq.n;
            post.save();
            
            resolve(true)
        } catch (error) {
            reject(error)
        }
    })
};

module.exports = {
    saveComment: saveComment,
    getComments: getComments,
    deleteComment: deleteComment
}