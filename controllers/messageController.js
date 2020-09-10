const {validationResult} =require("express-validator")
const {message} =require("../services/index")
const {app} =require("../config/app")
const fsExtra =require("fs-extra")
const multer = require('multer')
const {uploadFilesToDB} = require('../config/db')

let allConversationWithMessages = async (req,res) => {
    try {
        let allConversationWithMessages = await message.getAllConversationItems(req.user._id);
        return res.status(200).send(allConversationWithMessages);
    } catch (error) {
        return res.status(500).send("Error")
    }
}

let addNewTextEmoji = async (req, res) => {
    let errorArr = [];
    let validationErrors = validationResult(req)
    
    if (!validationErrors.isEmpty()) {
        let errors = Object.values(validationErrors.mapped());
        errors.forEach(item => {
            errorArr.push(item.msg)
        })
        
        return res.status(500).send(errorArr)
    }

    try {
        let senderId = req.user._id;
        let receivedId = req.body.receivedId;
        let messageVal = req.body.text;
        let isChatGroup = req.body.isChatGroup;
        let isCurrent = req.body.isCurrent;

        let result = await message.addNewTextEmoji(senderId, receivedId, messageVal, isChatGroup, isCurrent);
        
        return res.status(200).send({message: result.newMessage, newConversation: result.newConversation? result.newConversation:null});
    } catch (error) {
        return res.status(500).send(error)
    }
}

//handle image chat
let storageImageChat = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, app.image_message_directory);
    },
    filename: (req, file, callback) => {
        callback(null, `${Date.now()}_${file.originalname}`)
    },
})
let ImageMessageUploadFile = multer({
    storage: storageImageChat,
    limits: {fileSize: app.image_message_limit_size }
}).array("file")

//add by multer
let addNewFile1 = (req, res) => {
    ImageMessageUploadFile(req, res, async(error) => {
        if (error) {
            if(error.message) {
                return res.status(500).send("Error")
            }
            return res.status(500).send(error);
        }
        try {
            let senderId = req.user._id;
            let receivedId = req.body.receivedId;
            let messageVal = req.files;
            let isChatGroup = req.body.isChatGroup;
            let isCurrent = req.body.isCurrent;

            let result = await message.addNewFile(senderId, receivedId, messageVal, isChatGroup, isCurrent);
            //remove image vì ảnh đã được lưu trên mongodb
            for(var x = 0; x < result.newMessage.file.length; x++) {
                await fsExtra.remove(`${app.image_message_directory}/${result.newMessage.file[x].fileName}`);
            };

            return res.status(200).send({message: result.newMessage, newConversation: result.newConversation? result.newConversation:null});
            } catch (error) {
                return res.status(500).send(error)
            }
    });
}

let addNewFile = (req, res) => {
    uploadFilesToDB(req, res, async err => {
        if (err) {
            return res.json({ success: false, err })
        }
        try {
            let senderId = req.user._id;
            let receivedId = req.body.receivedId;
            let messageVal = req.files;
            let isChatGroup = req.body.isChatGroup;
            let isCurrent = req.body.isCurrent;
            let result = await message.addNewFile(senderId, receivedId, messageVal, isChatGroup, isCurrent);
            return res.status(200).send({message: result.newMessage, newConversation: result.newConversation? result.newConversation:null});
            } catch (error) {
                return res.status(500).send(error)
            }
    });
}

let readMoreAllChat = async (req, res) => {
    try {
        //get skip number from query param
        let skipPersonal = +(req.query.skipPersonal);
        let skipGroup = +(req.query.skipGroup);
       
        //get more item
        let newAllConversations = await message.readMoreAllChat(req.user._id, skipPersonal, skipGroup);
        
        let dataToRender = {
            newAllConversations: newAllConversations,
            user: req.user,
        };

        let leftSideData = await renderFile("src/views/main/readMoreConversations/_leftSide.ejs", dataToRender);
        let rightSideData = await renderFile("src/views/main/readMoreConversations/_rightSide.ejs", dataToRender);
        let imageModalData = await renderFile("src/views/main/readMoreConversations/_imageModal.ejs", dataToRender);
        let attachmentModalData = await renderFile("src/views/main/readMoreConversations/_attachmentModal.ejs", dataToRender);
        let membersModalData = await renderFile("src/views/main/readMoreConversations/_membersModal.ejs", dataToRender);
        
        // ejs.renderFile("src/views/main/readMoreConversations/_leftSide.ejs", dataToRender, {}, function (err, str) {})
        
        return res.status(200).send({
            leftSideData: leftSideData,
            rightSideData: rightSideData,
            imageModalData: imageModalData,
            attachmentModalData: attachmentModalData,
            membersModalData: membersModalData,
        });
        
    } catch (error) {
        return res.status(500).send(error);
    }
}

let readMorePersonalChat = async (req, res) => {
    try {
        //get skip number from query param
        let skipPersonal = +(req.query.skipPersonal);

        //get more item
        let newAllConversations = await message.readMorePersonalChat(req.user._id, skipPersonal);
        
        let dataToRender = {
            newAllConversations: newAllConversations,
            user: req.user,
        };

        let leftSideData = await renderFile("src/views/main/readMoreConversations/_leftSide.ejs", dataToRender);
        let rightSideData = await renderFile("src/views/main/readMoreConversations/_rightSide.ejs", dataToRender);
        let imageModalData = await renderFile("src/views/main/readMoreConversations/_imageModal.ejs", dataToRender);
        let attachmentModalData = await renderFile("src/views/main/readMoreConversations/_attachmentModal.ejs", dataToRender);

        
        // ejs.renderFile("src/views/main/readMoreConversations/_leftSide.ejs", dataToRender, {}, function (err, str) {})
        
        return res.status(200).send({
            leftSideData: leftSideData,
            rightSideData: rightSideData,
            imageModalData: imageModalData,
            attachmentModalData: attachmentModalData,
        });
        
    } catch (error) {
        return res.status(500).send(error);
    }
}

let readMoreGroupChat = async (req, res) => {
    try {
        //get skip number from query param
        let skipGroupChat = +(req.query.skipGroupChat);

        //get more item
        let newAllConversations = await message.readMoreGroupChat(req.user._id, skipGroupChat);
        
        let dataToRender = {
            newAllConversations: newAllConversations,
            user: req.user,
        };

        let leftSideData = await renderFile("src/views/main/readMoreConversations/_leftSide.ejs", dataToRender);
        let rightSideData = await renderFile("src/views/main/readMoreConversations/_rightSide.ejs", dataToRender);
        let imageModalData = await renderFile("src/views/main/readMoreConversations/_imageModal.ejs", dataToRender);
        let attachmentModalData = await renderFile("src/views/main/readMoreConversations/_attachmentModal.ejs", dataToRender);
        let membersModalData = await renderFile("src/views/main/readMoreConversations/_membersModal.ejs", dataToRender);
        
        // ejs.renderFile("src/views/main/readMoreConversations/_leftSide.ejs", dataToRender, {}, function (err, str) {})
        
        return res.status(200).send({
            leftSideData: leftSideData,
            rightSideData: rightSideData,
            imageModalData: imageModalData,
            attachmentModalData: attachmentModalData,
            membersModalData: membersModalData,
        });
        
    } catch (error) {
        return res.status(500).send(error);
    }
}

let readMore = async (req, res) => {
    try {
        //get skip number from query param
        let skipMessage = +(req.query.skipMessage);
        let targetId = req.query.targetId;
        let chatInGroup = (req.query.chatInGroup === "true");

        //get more item
        let newMessages = await message.readMore(req.user._id, skipMessage, targetId, chatInGroup);
        
        let dataToRender = {
            newMessages: newMessages,
            user: req.user,
        };

        let rightSideData = await renderFile("src/views/main/readMoreMessages/_rightSide.ejs", dataToRender);
        let imageModalData = await renderFile("src/views/main/readMoreMessages/_imageModal.ejs", dataToRender);
        let attachmentModalData = await renderFile("src/views/main/readMoreMessages/_attachmentModal.ejs", dataToRender);
        // ejs.renderFile("src/views/main/readMoreMessages/_leftSide.ejs", dataToRender, {}, function (err, str) {})
        
        return res.status(200).send({
            rightSideData: rightSideData,
            imageModalData: imageModalData,
            attachmentModalData: attachmentModalData,
        });
        
    } catch (error) {
        return res.status(500).send(error);
    }
}

let findConversations = async (req, res) => {
    // let errorArr = [];
    // let validationErrors = validationResult(req)
    
    // if (!validationErrors.isEmpty()) {
    //     let errors = Object.values(validationErrors.mapped());
    //     errors.forEach(item => {
    //         errorArr.push(item.msg)
    //     })
    //     console.log(errorArr);
    //     return res.status(500).send(errorArr)
    // }

    try {
        let currentUserId = req.user._id;
        let keyword = req.params.keyword;
        
        let conversations = await message.findConversations(currentUserId, keyword);
        return res.status(200).send({conversations})

    } catch (error) {
        return res.status(500).send(error);
    }
}

let deleteAllMessagesInPersonal = async (req,res) => {
    try {
        let currentUserId = req.user._id;
        let userChatId = req.body.userChatId;
        await message.deleteAllMessagesInPersonal(currentUserId, userChatId);
        return res.status(200).send({success: true})
    } catch (error) {
        return res.status(500).send("error Server :))");
    }
}

let markAsReadMess = async (req,res) => {
    try {
        let messageId = req.body.messageId;
        let mess = await message.markAsReadMess(messageId);
        return res.status(200).send({success: true, message: mess})
    } catch (error) {
        return res.status(500).send("error Server :))");
    }
}

module.exports = {
    allConversationWithMessages: allConversationWithMessages,
    addNewTextEmoji: addNewTextEmoji,
    addNewFile: addNewFile,
    readMoreAllChat: readMoreAllChat,
    readMorePersonalChat: readMorePersonalChat,
    readMoreGroupChat: readMoreGroupChat,
    readMore: readMore,
    findConversations: findConversations,
    deleteAllMessagesInPersonal: deleteAllMessagesInPersonal,
    markAsReadMess: markAsReadMess
}