const PostModel = require('../models/postModel')
const ContactModel = require('../models/contactModel')
const CommentModel = require('../models/commentModel')
const videoModel = require('../models/videoModel')
const photoModel = require('../models/photoModel')
const attachmentModel = require('../models/attachmentModel')
const _ = require('lodash');
const fsExtra = require('fs-extra')
const {videoType, imgType} = require('../config/mimeType')

const addNew = (writerId, filesVal, text, groupId) => {
    return new Promise(async (resolve, reject) =>{
        try {
            if (!text && filesVal.length == 0) {
                return reject(false);
            }
            let from = {
                managedBy: groupId? PostModel.from.GROUP: PostModel.from.PERSONAL,
                idManager: groupId? groupId: writerId
            };
            let newPostItem = {
                text: text? text:'',
                from: from,
                writer: writerId,
            };
            let newPost = await (await PostModel.model.create(newPostItem))
            .populate('writer', ['firstName','lastName','address', 'avatar'])
            .execPopulate();
            if (filesVal.length > 0) {
                let arrayFilesPromise = filesVal.map(async fileVal => {
                    let checkImg = 0;
                    let BufferFile = await fsExtra.readFile(fileVal.path);
                    // let url = fileVal.path.replace(/\\/g, '/');
                    let ContentType = fileVal.mimetype;
                    let Name = fileVal.filename;
                    
                    if (ContentType === videoType[0]) {
                        await videoModel.create({
                            post: newPost._id,
                            from: from,
                            contentType: ContentType,
                            fileName: Name})
                        return;
                    }
                    imgType.map(type => {
                        if (type === ContentType) {
                            checkImg = 1;
                            return;
                        }
                    })
                    if (checkImg) {
                        await photoModel.create({
                            post: newPost._id,
                            from: from, 
                            data: BufferFile, 
                            contentType: ContentType, 
                            fileName: Name})
                    }else{
                        await attachmentModel.create({
                            post: newPost._id,
                            from: from,
                            data: BufferFile, 
                            contentType: ContentType, 
                            fileName: Name})
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
    return new Promise(async (resolve, reject) =>{
        const post = await PostModel.model.findById(postId);
        if (!post) {
            return reject(false)
        }
        resolve(post)
    })   
}

const getMyPosts = (userId) => {
    return new Promise(async (resolve, reject) =>{
        try {
            let posts = await PostModel.model.getposts(userId).sort({"updatedAt": -1});
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
    return new Promise(async (resolve, reject) =>{
        try {
            let posts = await PostModel.model.getposts(userId);
            resolve(posts);
        } catch (error) {
            return reject(error);
        }
        
    })   
}

const getAllPosts = (currentUserId) => {
    return new Promise( async (resolve, reject) => {
        try {
            let friendIds = [];
            let friends = await ContactModel.getFriends(currentUserId);
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

const removePost = (postId) => {
    return new Promise(async (resolve, reject) =>{
        try {
            const removeReq = await PostModel.model.findOneAndDelete({"_id": postId});
            if (removeReq) {
                await photoModel.deletePhotoInPost(postId);
                await attachmentModel.deleteAttachmentInPost(postId);
                await videoModel.deleteVideoInPost(postId);
                await CommentModel.deleteCmtInPost(postId);
            }
            resolve(true);
        } catch (error) {
            reject(error);
        }
    })   
}

const getPostInGroup = (groupId) => {
    return new Promise(async (resolve, reject) =>{
        try {
            let item = {
                from: {
                    managedBy: PostModel.from.GROUP,
                    idManager: groupId
                }
            }
            let posts = await PostModel.model.getPostInGroup(item).sort({"updatedAt": -1});
            resolve(posts)
        } catch (error) {
            return reject(error);
        }
        
    })   
}

let getFileInPost = (postId) => {
    return new Promise( async (resolve, reject ) => {
        try {
            let photos = await photoModel.photoInPost(postId);
            let attachments = await attachmentModel.attachmentInPost(postId);
            let videos = await videoModel.videoInPost(postId);
            resolve({photos, attachments, videos});
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    addNew: addNew,
    getOnePost: getOnePost,
    removePost: removePost,
    getMyPosts: getMyPosts,
    getAllPosts: getAllPosts,
    getpostsByUserId: getpostsByUserId,
    getPostInGroup: getPostInGroup,
    getFileInPost: getFileInPost
}