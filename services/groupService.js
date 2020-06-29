const groupModel = require('../models/groupModel');
const photoModel = require('../models/photoModel');
const postService = require('./postService');


let newGroup = (item, currentUserId) => {
    return new Promise(async (resolve, reject) => {
        try {
            item.admins = [currentUserId];
            let newGroup = await groupModel.create(item);
            resolve(newGroup);
        } catch (error) {
            reject(error);
        }
    })
}

let getGroup = (groupId, userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let group;
            let membersInGroup = await groupModel.findOne({ "_id": groupId}, { "members": 1, "admins": 1, "requestsJoin": 1 });

            if (membersInGroup.length === 0) {
                resolve([]);
            }
            let members = membersInGroup.members;
            let admins = membersInGroup.admins;
            let usersRequest = membersInGroup.requestsJoin;
            
            if (admins.includes(userId)) {
                group = await groupModel.getGroupForAdmin(groupId);
                group._doc.yourRole = 'ADMIN';
            } else if (members.includes(userId)) {
                group = await groupModel.getGroup(groupId);
                group._doc.yourRole = 'MEMBER';
            } else {
                group = await groupModel.findById(groupId, { "members": 0, "requestsJoin": 0 })
                .populate( 'admins',['firstName', 'lastName', 'address', 'avatar']);
                if (usersRequest.includes(userId)) {
                    group._doc.joined = true;
                }
            }

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

let getGroupSuggestions = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let groupSuggestions = await groupModel.getGroupSuggestions(userId);
            resolve(groupSuggestions);
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

let leaveGroup = (groupId, userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            await groupModel.leaveGroup(groupId, userId)
            resolve(true)
        } catch (error) {
            reject(error)
        }
    })
};

let joinGroup = (groupId, userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let usersRequest = await groupModel.findOne({ "_id": groupId, "privacy": 1 }, { "requestsJoin": 1});
            if (!usersRequest.requestsJoin.includes(userId)) {
                await groupModel.joinGroup(groupId, userId)
                resolve(true)
            }else{
                reject(false)
            }
        } catch (error) {
            reject(error)
        }
    })
};

let removeRequestJoinGroup = (groupId, userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            await groupModel.removeRequestJoinGroup(groupId, userId)
            resolve(true)
        } catch (error) {
            reject(error)
        }
    })
};

let acceptJoinGroup = (groupId, userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            await groupModel.acceptJoinGroup(groupId, userId)
            resolve(true)
        } catch (error) {
            reject(error)
        }
    })
};

let kickedOutGroup = (groupId, currentUserId, memberId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let group = await groupModel.findOne({ "_id": groupId, "privacy": 1 }, {"admins": 1});
            let admins = group.admins;
            if (admins.includes(currentUserId)) {
                await groupModel.leaveGroup(groupId, memberId)
            }else reject('Bạn không có quyền kiểm soát thành viên');
            resolve(true)
        } catch (error) {
            reject(error)
        }
    })
};

let updateGroupInfo = (id, item) => {
    return new Promise(async (resolve, reject) => {
        try {
            const group = await groupModel.findByIdAndUpdate(id, item, {
                new: true
            });
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
    updateGroupCover: updateGroupCover,
    getGroupSuggestions: getGroupSuggestions,
    leaveGroup: leaveGroup,
    joinGroup: joinGroup,    
    acceptJoinGroup: acceptJoinGroup,
    removeRequestJoinGroup: removeRequestJoinGroup,
    kickedOutGroup: kickedOutGroup,
    updateGroupInfo: updateGroupInfo
}