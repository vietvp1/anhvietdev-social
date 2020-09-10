const contactModel = require('../models/contactModel')
const followerModel = require('../models/followerModel');
const _ = require('lodash');

const getListFriendId = async (userId) => {
    let friendIds = [];
    let friends = await contactModel.getAllFriends(userId);
    friends.forEach((item) => {
        friendIds.push(item.userId);
        friendIds.push(item.contactId)
    });
    friendIds.push(userId);
    friendIds = _.uniqBy(friendIds);
    return friendIds
}

const getListFollowingId = async (userId) => {
    let followingIds = [];
    let followings = await followerModel.getAllFollowing(userId);
    followings.forEach((item) => {
        followingIds.push(item.followerId);
    });
    followingIds.push(userId);
    followingIds = _.uniqBy(followingIds);
    return followingIds;
}

module.exports = {
    getListFriendId,
    getListFollowingId
}