const {commentService, notification} = require('../services/index')

let saveComment = async (req,res) => {
    try {
        if (!req.body.variables.content) {
            return res.status(500).send("Server error :(");
        }
        let result = await commentService.saveComment(req.body.variables);
        let notif = await notification.addNotifComment(req.body.variables, req.body.writerPost);

        return res.status(200).json({ success: true, result });
    } catch (error) {
        return res.status(500).send("Server error :(");
    }
}

let getComments = async (req, res) => {
    try {
        let comments = await commentService.getComments(req.body);
        res.status(200).json({ success: true, comments })
    } catch (error) {
        return res.status(500).send("Server error :(");
    }
}

let deleteComment = async (req, res) => {
    try {
        await commentService.deleteComment(req.body.cmtId, req.body.postId);
        res.status(200).json({ success: true })
    } catch (error) {
        return res.status(500).send("Server error :(");
    }
}


module.exports = {
    saveComment: saveComment,
    getComments: getComments,
    deleteComment: deleteComment
};
