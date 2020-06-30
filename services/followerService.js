const FollowerModel = require('../models/followerModel')

let addNewFollower = (currentUserId, followerId) => {
    return new Promise(async (resolve, reject) => {
        let followExists = await FollowerModel.findFollowExist(currentUserId, followerId);
        if (followExists) {
            return reject(false);
        }

        // create contact
        let newItem = {
            userId: currentUserId,
            followerId: followerId
        };
        let newFollower = await FollowerModel.create(newItem);
        resolve(newFollower);
    })
}

let removeFollower = (currentUserId, followerId) => {
    return new Promise(async (resolve, reject) => {
        await FollowerModel.removeFollower(currentUserId, followerId);
        resolve(true);
    })
}

let checkFollow = (currentUserId, followerId) => {
    return new Promise(async (resolve, reject) => {
        let followExists = await FollowerModel.findFollowExist(currentUserId, followerId);
        if (!followExists) {
            resolve(false)
        }
        resolve(true);
    })
}

module.exports = {
    addNewFollower,
    checkFollow,
    removeFollower
}