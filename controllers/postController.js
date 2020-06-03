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
            let newPost = await postService.addNew(writerId, filesVal, text, title, groupId);
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

const getpostsByUserId = async (req,res) => {
    try {
        const userId = req.params.id;
        const posts = await postService.getpostsByUserId(userId);
        res.json(posts);
    } catch (error) {
        res.status(500).send('Server Error');
    }
}

const getMyPosts = async (req,res) => {
    try {
        const userId = req.user._id;
        
        const myPosts = await postService.getMyPosts(userId);
        
        res.json(myPosts);
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
module.exports = {
    addNew: addNew,
    getOnePost: getOnePost,
    removePost: removePost,
    getMyPosts: getMyPosts,
    getAllPosts: getAllPosts,
    getpostsByUserId: getpostsByUserId,
    getPostInGroup: getPostInGroup,
    getFileInPost: getFileInPost
}