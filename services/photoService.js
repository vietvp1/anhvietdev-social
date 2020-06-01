const photoModel = require('../models/photoModel');

let getAllMyPhoto = (userId) => {
    return new Promise( async (resolve, reject) => {
        try {
            let photos = await photoModel.getAllMyPhoto(userId);
            resolve(photos);
        } catch (error) {
            reject(error)
        }
    })
}

let photoInPost = (postId) => {
    return new Promise( async (resolve, reject ) => {
        try {
            let photos = await photoModel.photoInPost(postId);
            resolve(photos);
        } catch (error) {
            reject(error)
        }
    })
}

let getPhotosInGroup = (groupId) => {
    return new Promise( async (resolve, reject) => {
        try {
            let limit = 9;
            let photos = await photoModel.getPhotosInGroup(groupId, limit);
            resolve(photos);
        } catch (error) {
            reject(error)
        }
    })
}


module.exports = {
    getAllMyPhoto,
    photoInPost,
    getPhotosInGroup,
}