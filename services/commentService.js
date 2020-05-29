const CommentModel = require('../models/commentModel')

let saveComment = (variable) => {
    return new Promise(async (resolve, reject) => {
        try {
            let comment = await (await CommentModel.create(variable)).populate(
                {
                    path: 'writer',
                    select: ['firstName', 'lastName', 'address', 'avatar'],
                    populate: {
                        path: "avatar",
                    }
                }
            ).execPopulate();
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
                        select: ['firstName', 'lastName', 'address', 'avatar'],
                        populate: {
                            path: "avatar",
                        }
                    }
                )
                .populate(
                    {
                        path: 'likes.user',
                        select: ['firstName', 'lastName', 'address', 'avatar'],
                        populate: {
                            path: "avatar",
                        }
                    }
                )
                .populate(
                    {
                        path: 'reactions.user',
                        select: ['firstName', 'lastName', 'address', 'avatar'],
                        populate: {
                            path: "avatar",
                        }
                    }
                )
            resolve(await Promise.all(comments))
        } catch (error) {
            reject(error)
        }
    })
};

let deleteComment = (cmtId) => {
    return new Promise(async (resolve, reject) => {
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