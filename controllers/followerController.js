const { followerService } = require("../services/index")

let addNewFollower = async (req, res) => {
    try {
        let currentUserId = req.user._id;
        let followerId = req.body.followerId;
        let newFollower = await followerService.addNewFollower(currentUserId, followerId);
        return res.status(200).send({ success: !!newFollower });
    } catch (error) {
        return res.status(500).send({ success: false });
    }
}

let removeFollower = async (req, res) => {
    try {
        let currentUserId = req.user._id;
        let followerId = req.params.id;
        await followerService.removeFollower(currentUserId, followerId);
        return res.status(200).send({ success: true });
    } catch (error) {
        return res.status(500).send({ success: false });
    }
}

let checkFollow = async (req, res) => {
    try {
        let currentUserId = req.user._id;
        let followerId = req.params.id;
        let isFollowExists = await followerService.checkFollow(currentUserId, followerId);
        return res.status(200).send({ isFollow: isFollowExists });
    } catch (error) {
        return res.status(500).send({ success: false });
    }
}

let getFollowNumber = async (req, res) => {
    try {
        let userId = req.params.id;
        let followNumber = await followerService.getFollowNumber(userId);
        return res.status(200).send({
            followerNumber: followNumber.followerNumber,
            followingNumber: followNumber.followingNumber
        });
    } catch (error) {
        return res.status(500).send({ success: false });
    }
}

module.exports = {
    addNewFollower,
    checkFollow,
    removeFollower,
    getFollowNumber
}