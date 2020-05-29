const multer = require('multer')
const { userService, postService } = require('../services/index')
const UserModel = require('../models/userModel')
const fsExtra = require('fs-extra')
const { app } = require("../config/app")
const { transErrors, transSuccess } = require('../lang/vi')

let storageAvatar = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, app.avatar_directory);
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

let avatarUploadFile = multer({
    storage: storageAvatar,
    limits: { fileSize: app.avatar_limit_size }
}).single("file")

let updateAvatar = (req, res) => {
    avatarUploadFile(req, res, async (error) => {
        if (error) {
            return res.json({ success: false, error })
        }
        try {
            // let url = req.file.path.replace(/\\/g, '/');
            let text = req.body.text;
            let file = req.file;
            let title = "đã cập nhập ảnh đại diện mới"
            let user = await userService.update_Avatar_Cover(req.user._id, file, text, title, "avatar");
            await fsExtra.remove(`${app.avatar_directory}/${file.filename}`);
            return res.status(200).json({ success: true, user: user, message: transSuccess.user_info_updated })
        } catch (error) {
            return res.status(500).send({ error: transErrors.server_error });
        }
    })
}

let updateCover = (req, res) => {
    avatarUploadFile(req, res, async (error) => {
        if (error) {
            return res.json({ success: false, error })
        }
        try {
            let file = req.file;
            let title = "đã cập nhập ảnh bìa mới";
            const user = await userService.update_Avatar_Cover(req.user._id, file, "", title, "cover");
            await fsExtra.remove(`${app.avatar_directory}/${file.filename}`);
            return res.status(200).json({ success: true, user: user, message: transSuccess.user_info_updated })
        } catch (error) {
            return res.status(500).send({ error: transErrors.server_error });
        }
    })
}

let updateInfo = async (req, res) => {
    try {
        let updateUserItem = req.body;
        const user = await userService.updateInfo(req.user._id, updateUserItem);
        return res.status(200).send({ success: true, user: user });

    } catch (error) {
        return res.status(500).send({ success: false });
    }
}

let getUserLoaded = async (req, res) => {
    try {
        const user = await UserModel.findUserByIdForClientToUse(req.user._id);
        res.json(user);
    } catch (err) {
        res.status(500).send({ error: transErrors.enter_account });
    }
}

let getUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await userService.getUser(userId);
        return res.status(200).send({ user: user });
    } catch (error) {
        return res.status(500).send("Server Error");
    }
}

let searchUser = async (req, res) => {
    try {
        let keyword = req.params.keyword;
        let users = await userService.searchUser(keyword);
        return res.status(200).send({ users, success: true })
    } catch (error) {
        return res.status(500).send("server Error");
    }
}

let addWork = async (req, res) => {
    try {
        let work = req.body;
        const user = await userService.addWork(req.user._id, work);
        return res.status(200).send({ success: true, user: user });

    } catch (error) {
        return res.status(500).send({ success: false });
    }
}

let updateWork = async (req, res) => {
    try {
        let work = req.body;
        const user = await userService.updateWork(req.user._id, work);
        return res.status(200).send({ success: true, user: user });

    } catch (error) {
        return res.status(500).send({ success: false });
    }
}

let addSkill = async (req, res) => {
    try {
        let skill = req.body.skill;
        const user = await userService.addSkill(req.user._id, skill);
        return res.status(200).send({ success: true, user: user });

    } catch (error) {
        return res.status(500).send({ success: false });
    }
}

let deleteSkill = async (req, res) => {
    try {
        let skillId = req.body.skillId;
        const user = await userService.deleteSkill(req.user._id, skillId);
        return res.status(200).send({ success: true, user: user });

    } catch (error) {
        return res.status(500).send({ success: false });
    }
}

let addEducation = async (req, res) => {
    try {
        let work = req.body;
        const user = await userService.addEducation(req.user._id, work);
        return res.status(200).send({ success: true, user: user });

    } catch (error) {
        return res.status(500).send({ success: false });
    }
}

let updateEducation = async (req, res) => {
    try {
        let work = req.body;
        const user = await userService.updateEducation(req.user._id, work);
        return res.status(200).send({ success: true, user: user });

    } catch (error) {
        return res.status(500).send({ success: false });
    }
}

let addPlaceLived = async (req, res) => {
    try {
        let placelived = req.body;
        const user = await userService.addPlaceLived(req.user._id, placelived);
        return res.status(200).send({ success: true, user: user });

    } catch (error) {
        return res.status(500).send({ success: false });
    }
}

let updatePlaceLived = async (req, res) => {
    try {
        let placelived = req.body;
        const user = await userService.updatePlaceLived(req.user._id, placelived);
        return res.status(200).send({ success: true, user: user });

    } catch (error) {
        return res.status(500).send({ success: false });
    }
}

let deleteWork = async (req, res) => {
    try {
        let workId = req.body.workId;
        const user = await userService.deleteWork(req.user._id, workId);
        return res.status(200).send({ success: true, user: user });

    } catch (error) {
        return res.status(500).send({ success: false });
    }
}

let deleteEducation = async (req, res) => {
    try {
        let eduId = req.body.eduId;
        const user = await userService.deleteEducation(req.user._id, eduId);
        return res.status(200).send({ success: true, user: user });

    } catch (error) {
        return res.status(500).send({ success: false });
    }
}

let deletePlaceLived = async (req, res) => {
    try {
        let placeId = req.body.placeId;
        const user = await userService.deletePlaceLived(req.user._id, placeId);
        return res.status(200).send({ success: true, user: user });

    } catch (error) {
        return res.status(500).send({ success: false });
    }
}

module.exports = {
    getUser,
    updateInfo,
    updateAvatar,
    updateCover,
    getUserLoaded,
    searchUser,
    addWork,
    updateWork,
    addSkill,
    deleteSkill,
    addEducation,
    updateEducation,
    addPlaceLived,
    updatePlaceLived,
    deleteWork,
    deleteEducation,
    deletePlaceLived
}