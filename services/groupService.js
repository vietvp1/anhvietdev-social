const groupModel = require('../models/groupModel');

let newGroup = (item, currentUserId) => {
    return new Promise( async (resolve, reject) => {
        try {
            item.admins = [currentUserId];
            let newGroup = await groupModel.model.create(item);
            resolve(newGroup);
        } catch (error) {
            reject(error);   
        }
    })
}

let getGroup = (groupId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let group = await groupModel.model.getGroup(groupId);
            resolve(group);
        } catch (error) {
            reject(error)
        }
    })
}

let getGroupManaging = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let groupManaging = await groupModel.model.getGroupManaging(userId);
            resolve(groupManaging);
        } catch (error) {
            reject(error)
        }
    })
}

let getGroupJoined = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let groupJoined = await groupModel.model.getGroupJoined(userId);
            resolve(groupJoined);
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    newGroup: newGroup,
    getGroupManaging: getGroupManaging,
    getGroupJoined: getGroupJoined,
    getGroup: getGroup
}