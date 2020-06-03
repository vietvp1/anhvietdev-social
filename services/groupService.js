const groupModel = require('../models/groupModel');
const photoModel = require('../models/photoModel');
const postService = require('./postService');


let newGroup = (item, currentUserId) => {
    return new Promise( async (resolve, reject) => {
        try {
            item.admins = [currentUserId];
            let newGroup = await groupModel.create(item);
            resolve(newGroup);
        } catch (error) {
            reject(error);   
        }
    })
}

let getGroup = (groupId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let group = await groupModel.getGroup(groupId);
            resolve(group);
        } catch (error) {
            reject(error)
        }
    })
}

let getGroupManaging = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let groupManaging = await groupModel.getGroupManaging(userId);
            resolve(groupManaging);
        } catch (error) {
            reject(error)
        }
    })
}

let getGroupJoined = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let groupJoined = await groupModel.getGroupJoined(userId);
            resolve(groupJoined);
        } catch (error) {
            reject(error)
        }
    })
}

let updateGroupCover = (id, file, text, title, groupId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let post = await postService.addNew(id, [file], text, title, groupId);
            let photo = await photoModel.photoInPost(post._id);
            let item = {
                cover: file.filename
            }
            const group = await groupModel.updateCover(groupId, item);
            resolve(group)
        } catch (error) {
            reject(error)
        }
    })
};

module.exports = {
    newGroup: newGroup,
    getGroupManaging: getGroupManaging,
    getGroupJoined: getGroupJoined,
    getGroup: getGroup,
    updateGroupCover: updateGroupCover
}