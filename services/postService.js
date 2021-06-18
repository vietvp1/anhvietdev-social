const PostModel = require('../models/postModel')
const ContactModel = require('../models/contactModel')
const CommentModel = require('../models/commentModel')
const videoModel = require('../models/videoModel')
const photoModel = require('../models/photoModel')
const attachmentModel = require('../models/attachmentModel')
const userModel = require('../models/userModel')
const _ = require('lodash');
const { videoType, imgType } = require('../config/mimeType')
const { deleteFileInDb } = require('../services/photoService')
const { getListFriendId, getListFollowingId } = require('./helper')

/**
 * 
 * @param {String} writerId id of user
 * @param {Array} filesVal array file
 * @param {String} text 
 * @param {String} title 
 * @param {String} groupId id of group
 */
const addNew = (writerId, filesVal, text, title, groupId, tags, privacy) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!text && filesVal.length == 0) {
                return reject(false);
            }
            let from = {
                managedBy: groupId ? PostModel.from.GROUP : PostModel.from.PERSONAL,
                idManager: groupId ? groupId : writerId
            };
            let newPostItem = {
                text: text ? text : '',
                from: from,
                writer: writerId,
                title: title,
                tags: tags,
                privacy: privacy
            };
            let newPost = await (await PostModel.model.create(newPostItem)).populate(
                {
                    path: 'writer',
                    select: ['firstName', 'lastName', 'address', 'avatar']
                }
            ).populate('tags', ['firstName', 'lastName', 'address', 'avatar']).execPopulate();
            if (filesVal.length > 0) {
                let arrayFilesPromise = filesVal.map(async fileVal => {
                    let checkImg = 0;
                    let contentType = fileVal.mimetype;
                    let item = {
                        post: newPost._id,
                        from: from,
                        files_id: fileVal.id,
                        fileName: fileVal.filename
                    }

                    if (contentType === videoType[0]) {
                        await videoModel.create(item)
                        return;
                    }
                    imgType.map(type => {
                        if (type === contentType) {
                            checkImg = 1;
                            return;
                        }
                    })
                    if (checkImg) {
                        await photoModel.create(item)
                    } else {
                        await attachmentModel.create(item)
                    }
                });
                await Promise.all(arrayFilesPromise);
            }
            resolve(newPost);
        } catch (error) {
            reject(error)
        }
    })
}

const getOnePost = (postId) => {
    return new Promise(async (resolve, reject) => {
        const post = await PostModel.model.findById(postId);
        if (!post) {
            return reject(false)
        }
        resolve(post)
    })
}

const getPostsByUserId = (userId, currentUserId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let friendIds = await getListFriendId(currentUserId);
            let posts = await PostModel.model.getPosts(userId, currentUserId, friendIds);
            resolve(posts);
        } catch (error) {
            return reject(error);
        }

    })
}

const getAllPosts = (currentUserId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let friendIds = await getListFriendId(currentUserId);
            ////////////////////////////////////////////////////////////////
            let followingIds = await getListFollowingId(currentUserId);
            let allPosts = await PostModel.model.getAllPosts(followingIds, friendIds, currentUserId);
            resolve(allPosts);

        } catch (error) {
            reject(error);
        }
    })
}

const removePost = (postId, userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let photo = await photoModel.find({ "post": postId });
            let attachment = await attachmentModel.find({ "post": postId });
            let video = await videoModel.find({ "post": postId });
            if (photo.length>0) {
                let avatarUser = await userModel.findById(userId, { "avatar": 1, "cover": 1 });
                if (avatarUser.avatar.toString() === photo[0].fileName.toString()) {
                    await userModel.findByIdAndUpdate(userId, { "avatar": process.env.AVATAR_DEFAULT })
                } else if (avatarUser.cover.toString() === photo[0].fileName.toString()) {
                    await userModel.findByIdAndUpdate(userId, { "cover": process.env.COVER_DEFAULT })
                }
            }
            let files = photo.concat(attachment).concat(video);
            await Promise.all(
                files.map(async(f) => {
                    await deleteFileInDb(f.files_id);
                })
            )
            
            await photoModel.deletePhotoInPost(postId);
            await attachmentModel.deleteAttachmentInPost(postId);
            await videoModel.deleteVideoInPost(postId);
            await CommentModel.deleteCmtInPost(postId);
            await PostModel.model.findOneAndDelete({ "_id": postId });
            resolve(true);
        } catch (error) {
            reject(error);
        }
    })
}

const getPostInGroup = (groupId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let item = {
                from: {
                    managedBy: PostModel.from.GROUP,
                    idManager: groupId
                }
            }
            let posts = await PostModel.model.getPostInGroup(item);
            resolve(posts)
        } catch (error) {
            return reject(error);
        }

    })
}

let getFileInPost = (postId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let photos = await photoModel.photoInPost(postId);
            let attachments = await attachmentModel.attachmentInPost(postId);
            let videos = await videoModel.videoInPost(postId);
            resolve({ photos, attachments, videos });
        } catch (error) {
            reject(error)
        }
    })
}

let getPostNumberOfUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        let postNumber = await PostModel.model.find({
            writer: userId,
            from: {
                managedBy: PostModel.from.PERSONAL,
                idManager: userId
            },
        }).countDocuments();
        resolve(postNumber)
    })
}

module.exports = {
    addNew,
    getOnePost,
    removePost,
    getAllPosts,
    getPostsByUserId,
    getPostInGroup,
    getFileInPost,
    getPostNumberOfUser
}