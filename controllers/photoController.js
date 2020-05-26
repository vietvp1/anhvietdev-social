const {photo} = require('../services/index')

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

module.exports = {
    getAllMyPhoto: getAllMyPhoto,
    photoInPost: photoInPost
}