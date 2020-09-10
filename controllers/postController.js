const {postService} = require('../services/index')
const {uploadFilesToDB} = require('../config/db')


const addNew = async (req, res) => {
    uploadFilesToDB(req, res, async err => {
        if (err) {
            return res.json({ success: false, err })
        }
        try {
            let writerId = req.user._id;
            let text = req.body.text;
            let filesVal = req.files;
            let groupId = req.body.groupId? req.body.groupId : false;
            let title = req.body.title? req.body.title : "";
            let tags = req.body.tags ? req.body.tags.split(',') : []; // pass array from client => server revieve a string            
            let privacy = req.body.privacy;
            let newPost = await postService.addNew(writerId, filesVal, text, title, groupId, tags, privacy);
            return res.status(200).send({newPost , success: true})
        } catch (error) {
            return res.status(500).send(error)
        }
    })
}

const getOnePost = async (req,res) => {
    try {
        const postId = req.params.id;
        const post = await postService.getOnePost(postId);
        res.json(post);
    } catch (error) {
        res.status(500).send('Server Error');
    }
}

const getPostsByUserId = async (req,res) => {
    try {
        const userId = req.params.id;
        const currentUserId = req.user._id
        const posts = await postService.getPostsByUserId(userId, currentUserId);
        res.json(posts);
    } catch (error) {
        res.status(500).send('Server Error');
    }
}

const getAllPosts = async (req,res) => {
    try {
        let allPosts = await postService.getAllPosts(req.user._id);
        return res.status(200).send(allPosts);
    } catch (error) {
        return res.status(500).send("Server Error!");
    }
}

const removePost = async (req,res) => {
    try {
        const postId = req.params.id;
        let removeReq = await postService.removePost(postId, req.user._id);
        res.json({ success: !!removeReq });
    } catch (error) {
        res.status(500).send({ success: false });
    }
}

const getPostInGroup = async (req,res) => {
    try {
        const groupId = req.params.id;
        const posts = await postService.getPostInGroup(groupId);
        res.json(posts);
    } catch (error) {
        res.status(500).send('Server Error');
    }
}


let getFileInPost = async (req, res) => {
    try {
        const postId = req.body.postId;
        const files = await postService.getFileInPost(postId);
        return res.status(200).send(files);
    } catch (error) {
        return res.status(500).send(error)
    }
}


let getPostNumberOfUser = async (req, res) => {
    try {
        let userId = req.params.id;
        let postNumber = await postService.getPostNumberOfUser(userId);
        return res.status(200).send({postNumber});
    } catch (error) {
        return res.status(500).send({ success: false });
    }
}

module.exports = {
    addNew,
    getOnePost,
    removePost,
    getAllPosts,
    getPostsByUserId,
    getPostInGroup,
    getFileInPost,
    getPostNumberOfUser
}