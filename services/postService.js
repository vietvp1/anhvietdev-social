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
                    let ContentType = fileVal.mimetype;
                    let item = {
                        post: newPost._id,
                        from: from,
                        files_id: fileVal.id,
                        fileName: fileVal.filename
                    }

                    if (ContentType === videoType[0]) {
                        await videoModel.create(item)
                        return;
                    }
                    imgType.map(type => {
                        if (type === ContentType) {
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

const getMyPosts = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let posts = await PostModel.model.getposts(userId).sort({ "updatedAt": -1 });
            if (!posts) {
                return reject
            }

            resolve(posts)
        } catch (error) {
            return reject(error);
        }

    })
}

const getpostsByUserId = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let posts = await PostModel.model.getposts(userId);
            resolve(posts);
        } catch (error) {
            return reject(error);
        }

    })
}

const getAllPosts = (currentUserId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let friendIds = [];
            let friends = await ContactModel.getAllFriends(currentUserId);
            friends.forEach((item) => {
                friendIds.push(item.userId);
                friendIds.push(item.contactId)
            });
            friendIds.push(currentUserId);
            friendIds = _.uniqBy(friendIds);
            let allPosts = await PostModel.model.getAllPosts(friendIds);
            resolve(allPosts);
        } catch (error) {
            reject(error);
        }
    })
}

const removePost = (postId, userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const removeReq = await PostModel.model.findOneAndDelete({ "_id": postId });
            if (removeReq) {
                let photo = await photoModel.findOne({ "post": postId });
                if (!photo) {
                    resolve(true);
                }
                let avatarUser = await userModel.findById(userId, { "avatar": 1, "cover": 1 });

                if (avatarUser.avatar.toString() === photo.fileName.toString()) {
                    await userModel.findByIdAndUpdate(userId, { "avatar": process.env.AVATAR_DEFAULT })
                } else if (avatarUser.cover.toString() === photo.fileName.toString()) {
                    await userModel.findByIdAndUpdate(userId, { "cover": process.env.COVER_DEFAULT })
                }

                await photoModel.deletePhotoInPost(postId);
                await attachmentModel.deleteAttachmentInPost(postId);
                await videoModel.deleteVideoInPost(postId);
                await deleteFileInDb(photo.files_id);
                await CommentModel.deleteCmtInPost(postId);
            }
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
            console.log(posts);

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
    getMyPosts,
    getAllPosts,
    getpostsByUserId,
    getPostInGroup,
    getFileInPost,
    getPostNumberOfUser
}