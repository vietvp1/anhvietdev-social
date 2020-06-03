const photoModel = require('../models/photoModel');

const {conn} = require('../config/db')
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');

let gfs = conn.once('open', () => {
    // Init stream
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads');
});

let getAllMyPhoto = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let photos = await photoModel.getAllMyPhoto(userId);
            resolve(photos);
        } catch (error) {
            reject(error)
        }
    })
}

let photoInPost = (postId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let photos = await photoModel.photoInPost(postId);
            resolve(photos);
        } catch (error) {
            reject(error)
        }
    })
}

let getPhotosInGroup = (groupId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let limit = 9;
            let photos = await photoModel.getPhotosInGroup(groupId, limit);
            resolve(photos);
        } catch (error) {
            reject(error)
        }
    })
}

let deleteFileInDb = (fileId) => {
    return new Promise(async (resolve, reject) => {
        try {
            gfs.remove({ _id: fileId, root: 'uploads' }, (err, gridStore) => {
                if (err) {
                    return reject(err);
                }
            });
            resolve(true);
        } catch (error) {
            reject(error)
        }
    })

}


module.exports = {
    getAllMyPhoto,
    photoInPost,
    getPhotosInGroup,
    deleteFileInDb
}