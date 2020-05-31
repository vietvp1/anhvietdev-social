const {groupService} = require('../services/index')
const multer = require('multer')
const fsExtra = require('fs-extra')
const { app } = require("../config/app")
const { transErrors, transSuccess } = require('../lang/vi')

let storageCoverGroup = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, app.group_directory);
    },
    filename: (req, file, callback) => {
        let math = app.avatar_type;
        if (math.indexOf(file.mimetype) === -1) {
            return callback("wrong typeof image", null);
        }

        let avatarName = `${Date.now()}-${file.originalname}`;
        callback(null, avatarName);
    },
})

let imgUploadFile = multer({
    storage: storageCoverGroup,
    limits: { fileSize: app.avatar_limit_size }
}).single("file")

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

const updateGroupCover = async (req, res) => {
    imgUploadFile(req, res, async (error) => {
        if (error) {
            return res.json({ success: false, error })
        }
        try {
            let file = req.file;
            let title = "đã cập nhập ảnh bìa mới cho nhóm";
            const group = await groupService.updateGroupCover(req.user._id, file, "", title, req.body.groupId);
            await fsExtra.remove(`${app.group_directory}/${file.filename}`);
            return res.status(200).json({ success: true, group: group, message: "Cập nhập ảnh bìa nhóm thành công" })
        } catch (error) {
            return res.status(500).send({ error: transErrors.server_error });
        }
    })
}

module.exports = {
    newGroup: newGroup,
    getGroupManaging: getGroupManaging,
    getGroupJoined: getGroupJoined,
    getGroup: getGroup,
    updateGroupCover: updateGroupCover
}