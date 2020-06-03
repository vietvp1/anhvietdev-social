const {photo} = require('../services/index')
const {conn} = require('../config/db')
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');

// Init gfs
let gfs = conn.once('open', () => {
    // Init stream
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads');
});

let getAllMyPhoto = async (req, res) => {
    try {
        const userId = req.params.id;
        const photos = await photo.getAllMyPhoto(userId);
        return res.status(200).send({photos});
    } catch (error) {
        return res.status(500).send(error)
    }
}

let photoInPost = async (req, res) => {
    try {
        const postId = req.body.postId;
        const photos = await photo.photoInPost(postId);
        return res.status(200).send({photos});
    } catch (error) {
        return res.status(500).send(error)
    }
}

let getPhotosInGroup = async (req, res) => {
    try {
        const groupId = req.params.id;
        const photos = await photo.getPhotosInGroup(groupId);
        return res.status(200).send({photos});
    } catch (error) {
        return res.status(500).send(error)
    }
}

let disPlayImage = (req, res) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
      // Check if file
      if (!file || file.length === 0) {
        return res.status(404).json({
          err: 'No file exists'
        });
      }
  
      // Check if image
      if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
        // Read output to browser
        const readstream = gfs.createReadStream(file.filename);
        readstream.pipe(res);
      } else {
        res.status(404).json({
          err: 'Not an image'
        });
      }
    });
};

module.exports = {
    getAllMyPhoto,
    photoInPost,
    getPhotosInGroup,
    disPlayImage
}