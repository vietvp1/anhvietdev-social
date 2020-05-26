const {groupService} = require('../services/index')

const newGroup = async (req, res) => {
    try {
        let newGroup = await groupService.newGroup(req.body, req.user._id);
        return res.status(200).send({newGroup, success: true});
    } catch (error) {
        return res.status(500).send(error);
    }
}

const getGroup = async (req, res) => {
    try {
        let group = await groupService.getGroup(req.params.id);
        return res.status(200).send({group});
    } catch (error) {
        return res.status(500).send(error);
    }
}

const getGroupManaging = async(req,res) => {
    try {
        let groupManaging = await groupService.getGroupManaging(req.user._id);
        return res.status(200).send({groupManaging})
    } catch (error) {
        return res.status(500).send(error);
    }
}

const getGroupJoined = async(req,res) => {
    try {
        let groupJoined = await groupService.getGroupJoined(req.user._id);
        return res.status(200).send({groupJoined})
    } catch (error) {
        return res.status(500).send(error);
    }
}

module.exports = {
    newGroup: newGroup,
    getGroupManaging: getGroupManaging,
    getGroupJoined: getGroupJoined,
    getGroup: getGroup
}