const {postService} = require('../services/index')
const {app} = require("../config/app")
const multer = require('multer')
const fsExtra = require('fs-extra')

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, app.post_directory)
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.mp4') {
            return cb(res.status(400).end('only jpg, png, mp4 is allowed'), false);
        }
        cb(null, true)
    }
})
var upload = multer({ storage: storage }).array("file")

const addNew = async (req, res) => {
    upload(req, res, async err => {
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
            for(var x = 0; x < filesVal.length; x++) {
                await fsExtra.remove(`${app.post_directory}/${filesVal[x].filename}`)
            };
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