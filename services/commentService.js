const CommentModel = require('../models/commentModel')

let saveComment = (variable) => {
    return new Promise(async (resolve, reject) =>{
        try {
            let comment = await (await CommentModel.create(variable)).populate('writer', ['firstName','lastName','address', 'avatar']).execPopulate();
            resolve(comment)
        } catch (error) {
            reject(error)
        }
    }) 
};

let getComments = (variable) => {
    return new Promise(async (resolve, reject) =>{
        try {
            let comments = await CommentModel.find(variable)
            .populate('writer', ['firstName','lastName','address', 'avatar'])
            .populate('likes.user', ['firstName','lastName','address', 'avatar'])
            .populate('reactions.user', ['firstName','lastName','address', 'avatar']);
            resolve(await Promise.all(comments))
        } catch (error) {
            reject(error)
        }
    }) 
};

let deleteComment = (cmtId) => {
    return new Promise(async (resolve, reject) =>{
        try {
            let removeReq = await CommentModel.deleteComment(cmtId);
            if (removeReq.n === 0) {
                return reject(false);
            }
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