const {reactionService, notification} = require('../services/index')

let upReaction = async (req,res) => {
    try {
        let upReaction = await reactionService.upReaction(req.body.postId, req.user._id, req.body.type);
        let notif = await notification.addNotifUpReaction(req.body.postId, req.user._id, req.body.writerId);
        return res.status(200).send({upReaction, notification: notif, success: true});
    } catch (error) {
        return res.status(500).send("Server error :(");
    }
}

let unReaction = async (req,res) => {
    try {
        let unReaction = await reactionService.unReaction(req.body.postId, req.user._id);
        return res.status(200).send({unReaction, success: true});
    } catch (error) {
        return res.status(500).send("Server error :(");
    }
}

//////////////////////////////////////////////

let upReactionComment = async (req,res) => {
    try { 
        let result = await reactionService.upReactionComment(req.body.commentId, req.user._id, req.body.type);
        let notif = await notification.addNotifUpReactionCmt(req.body.postId, req.body.commentId, req.user._id, req.body.writerId);
        return res.status(200).send({result, notification: notif, success: true});
    } catch (error) {
        return res.status(500).send("Server error :(");
    }
}

let unReactionComment = async (req,res) => {
    try {
        let unReactionComment = await reactionService.unReactionComment(req.body.commentId, req.user._id);
        return res.status(200).send({unReactionComment, success: true});
    } catch (error) {
        return res.status(500).send("Server error :(");
    }
}

module.exports = {
    upReaction: upReaction,
    unReaction: unReaction,
    upReactionComment: upReactionComment,
    unReactionComment: unReactionComment
}