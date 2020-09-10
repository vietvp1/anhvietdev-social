const {videoService} = require('../services/index')

let getAllMyVideo = async (req, res) => {
    try {
        const userId = req.params.id;
        const videos = await videoService.getAllMyVideo(userId);
        return res.status(200).send({videos});
    } catch (error) {
        return res.status(500).send(error)
    }
}

module.exports = {
    getAllMyVideo
}