const UserModel = require('../models/userModel')
const photoModel = require('../models/photoModel')
const postService = require('./postService')

let updatePassword = (id, item) => {
    return UserModel.findByIdAndUpdate(id, item);
};

let updateInfo = (id, item) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await UserModel.findByIdAndUpdate(id, item, {
                fields: { "local.password": 0, facebook: 0, google: 0, resetPasswordLink: 0 },
                new: true
            }).populate('avatar').populate('cover');
            resolve(user)
        } catch (error) {
            reject(error)
        }
    })
};

let update_Avatar_Cover = (id, file, text, title, typeUpdate) => {
    return new Promise(async (resolve, reject) => {
        try {
            let post = await postService.addNew(id, [file], text, title, false);
            let photo = await photoModel.photoInPost(post._id);
            let item = {
                [typeUpdate]: photo[0]._id
            }
            const user = await UserModel.findByIdAndUpdate(id, item, {
                fields: { "local.password": 0, facebook: 0, google: 0, resetPasswordLink: 0 },
                new: true
            }).populate('avatar').populate('cover');
            resolve(user)
        } catch (error) {
            reject(error)
        }
    })
};

let getUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await UserModel.findUserByIdForClientToUse(userId);
            resolve(user)
        } catch (error) {
            reject(error)
        }
    })
};

let searchUser = (keyword) => {
    return new Promise(async (resolve, reject) => {
        try {
            const users = await UserModel.getNormalUserDataByKeyword(keyword);
            resolve(users)
        } catch (error) {
            reject(error)
        }
    })
}

let addWork = (id, work) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await UserModel.findByIdAndUpdate(id,
                {
                    $push: { "work": work } // hoạt động nhưng update xong k trả về giá trị sau update neeus k cos new:true
                },
                {
                    fields: { "local.password": 0, facebook: 0, google: 0, resetPasswordLink: 0 },
                    new: true
                }
            ).populate('avatar').populate('cover');
            resolve(user)
        } catch (error) {
            reject(error)
        }
    })
};

let updateWork = (id, work) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await UserModel.findOneAndUpdate(
                {
                    _id: id,
                    work: { $elemMatch: { _id: { $eq: work._id } } }
                },
                { $set: { "work.$": work } },
                {
                    fields: { "local.password": 0, facebook: 0, google: 0, resetPasswordLink: 0 },
                    new: true
                }
            ).populate('avatar').populate('cover');
            resolve(user)
        } catch (error) {
            reject(error)
        }
    })
};

let addSkill = (id, skill) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await UserModel.findOneAndUpdate({ _id: id },
                {
                    $push: { "skills": { skillname: skill } }
                },
                {
                    fields: { "local.password": 0, facebook: 0, google: 0, resetPasswordLink: 0 },
                    new: true,
                    runValidators: true,
                }
            ).populate('avatar').populate('cover');
            resolve(user)
        } catch (error) {
            reject(error)
        }
    })
};

let deleteSkill = (id, skillId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await UserModel.findByIdAndUpdate(id,
                {
                    $pull: { "skills": { _id: skillId } }
                },
                {
                    fields: { "local.password": 0, facebook: 0, google: 0, resetPasswordLink: 0 },
                    new: true,
                    runValidators: true,
                }
            ).populate('avatar').populate('cover');
            resolve(user)
        } catch (error) {
            reject(error)
        }
    })
};

let addEducation = (id, education) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await UserModel.findByIdAndUpdate(id,
                {
                    $push: { "education": education }
                },
                {
                    fields: { "local.password": 0, facebook: 0, google: 0, resetPasswordLink: 0 },
                    new: true
                }
            ).populate('avatar').populate('cover');
            resolve(user)
        } catch (error) {
            reject(error)
        }
    })
};

let updateEducation = (id, education) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await UserModel.findOneAndUpdate(
                {
                    _id: id,
                    education: { $elemMatch: { _id: { $eq: education._id } } }
                },
                { $set: { "education.$": education } },
                {
                    fields: { "local.password": 0, facebook: 0, google: 0, resetPasswordLink: 0 },
                    new: true
                }
            ).populate('avatar').populate('cover');
            resolve(user)
        } catch (error) {
            reject(error)
        }
    })
};

let addPlaceLived = (id, placelived) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await UserModel.findByIdAndUpdate(id,
                {
                    $push: { "placeslived": placelived }
                },
                {
                    fields: { "local.password": 0, facebook: 0, google: 0, resetPasswordLink: 0 },
                    new: true
                }
            ).populate('avatar').populate('cover');
            resolve(user)
        } catch (error) {
            reject(error)
        }
    })
};

let updatePlaceLived = (id, placelived) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await UserModel.findOneAndUpdate(
                {
                    _id: id,
                    placeslived: { $elemMatch: { _id: { $eq: placelived._id } } }
                },
                { $set: { "placeslived.$": placelived } },
                {
                    fields: { "local.password": 0, facebook: 0, google: 0, resetPasswordLink: 0 },
                    new: true
                }
            ).populate('avatar').populate('cover');
            resolve(user)
        } catch (error) {
            reject(error)
        }
    })
};

let deleteWork = (id, workId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await UserModel.findByIdAndUpdate(id,
                {
                    $pull: { "work": { _id: workId } }
                },
                {
                    fields: { "local.password": 0, facebook: 0, google: 0, resetPasswordLink: 0 },
                    new: true,
                    runValidators: true,
                }
            ).populate('avatar').populate('cover')
            resolve(user)
        } catch (error) {
            reject(error)
        }
    })
};

let deleteEducation = (id, eduId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await UserModel.findByIdAndUpdate(id,
                {
                    $pull: { "education": { _id: eduId } }
                },
                {
                    fields: { "local.password": 0, facebook: 0, google: 0, resetPasswordLink: 0 },
                    new: true,
                    runValidators: true,
                }
            ).populate('avatar').populate('cover')
            resolve(user)
        } catch (error) {
            reject(error)
        }
    })
};

let deletePlaceLived = (id, placeId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await UserModel.findByIdAndUpdate(id,
                {
                    $pull: { "placeslived": { _id: placeId } }
                },
                {
                    fields: { "local.password": 0, facebook: 0, google: 0, resetPasswordLink: 0 },
                    new: true,
                    runValidators: true,
                }
            ).populate('avatar').populate('cover')
            resolve(user)
        } catch (error) {
            reject(error)
        }
    })
};

module.exports = {
    getUser,
    updateInfo,
    updatePassword,
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
    deletePlaceLived,
    update_Avatar_Cover
}