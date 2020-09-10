const videoModel = require('../models/videoModel');

let getAllMyVideo = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let photos = await videoModel.getAllMyVideo(userId);
            resolve(photos);
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    getAllMyVideo
}