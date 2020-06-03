const UserModel = require("../models/userModel")
const ChatGroupModel = require("../models/chatGroupModel")
const MessageModel = require("../models/messageModel")
const ConversationModel = require("../models/conversationModel")
const {app} = require("../config/app")
const _ = require("lodash")
const fsExtra = require("fs-extra")
const {imgType, videoType} = require('../config/mimeType')

const LIMIT_CONVERSATIONS_TAKEN = 25;
const LIMIT_MESSAGES_TAKEN = 30;
const LIMIT_MEMBERS_TAKEN = 19;

let getAllConversationItems = (currentUserId) => {
    return new Promise( async (resolve, reject) =>  {
        try {
            let convers = await ConversationModel.getConversations(currentUserId, LIMIT_CONVERSATIONS_TAKEN);
            let userConversations = convers.map((conver) => {
                return {
                    _id: conver._id,
                    userChat: (conver.secondOne._id == currentUserId)? conver.firstOne : conver.secondOne,
                    createdAt: conver.createdAt,
                    updatedAt: conver.updatedAt,
                };
            });
            let groupConversations = await ChatGroupModel.getChatGroups(currentUserId, LIMIT_CONVERSATIONS_TAKEN); // ***
            let allConversations = userConversations.concat(groupConversations);
            allConversations = _.sortBy(allConversations, (item) => {
                return -item.updatedAt
            })
            let allConversationsToRender = []; // ***
            let lengthToGet = allConversations.length < LIMIT_CONVERSATIONS_TAKEN ? allConversations.length : LIMIT_CONVERSATIONS_TAKEN;
            if (allConversations.length) {
                for (let index = 0; index < lengthToGet; index++) {
                    allConversationsToRender.push(allConversations[index]);
                }
            }
            // get messages of all chat to apply in screen chat
            let allConversationWithMessagesPromise = allConversationsToRender.map( async(conversation) => {
                if (conversation.members) {
                    let getMessages = await MessageModel.model.getMessagesInGroup(conversation._id, LIMIT_MESSAGES_TAKEN);
                    conversation = {...conversation._doc, messages: _.reverse(getMessages)}
                } else {
                    let getMessages = await MessageModel.model.getMessagesInPersonal(currentUserId, conversation.userChat._id, LIMIT_MESSAGES_TAKEN);
                    conversation.messages = _.reverse(getMessages);
                }
                return conversation;
            })
            let allConversationWithMessages = await Promise.all(allConversationWithMessagesPromise);

            for (let i = allConversationWithMessages.length - 1; i >=0; i--) { //splice trong for
                if (allConversationWithMessages[i].messages.length < 1 && !allConversationWithMessages[i].members) {
                    allConversationWithMessages.splice(i,1)
                }
            }
            allConversationWithMessages = _.sortBy(allConversationWithMessages, (item) => {
                return -item.updatedAt
            })
            resolve(allConversationWithMessages);
        } catch (error) {
            return reject(error);
        }
    })
}

let addNewTextEmoji = (senderId, receivedId, messageVal, isChatGroup, isCurrent) => {
    return new Promise( async (resolve, reject) => {
        try {
            if (isChatGroup) {
                let getChatGroupReceiver = await ChatGroupModel.getChatGroupById(receivedId);
                if (!getChatGroupReceiver) {
                    return reject("Error");
                }

                let newMessageItem = {
                    sender: senderId,
                    receiver: receivedId,
                    userCurrent: getChatGroupReceiver.members,
                    conversationType: MessageModel.conversationTypes.GROUP,
                    text: messageVal,
                };

                //create new message
                let newMessage = await (await MessageModel.model.create(newMessageItem)).populate(
                    {
                        path: 'sender',
                        select: ['firstName', 'lastName', 'address', 'avatar']
                    }
                ).execPopulate();

                //update group chat
                await ChatGroupModel.updateWhenHasNewMessage(receivedId);
               
                resolve({newMessage});

            } else {
                let newConversation;
                if (!isCurrent) {
                    let conversation = await ConversationModel.getOneConversation(senderId, receivedId);
                    if (conversation) {
                        newConversation = conversation
                    }else{
                        let newConversationItem = {
                            firstOne: senderId,
                            secondOne: receivedId
                        }
                        newConversation = await ConversationModel.create(newConversationItem);
                    }
                }
                let newMessageItem = {
                    sender: senderId,
                    receiver: receivedId,
                    userCurrent: [senderId, receivedId],
                    conversationType: MessageModel.conversationTypes.PERSONAL,
                    text: messageVal,
                };
                //create new message
                let newMessage = await (await MessageModel.model.create(newMessageItem)).populate(
                    {
                        path: 'sender',
                        select: ['firstName', 'lastName', 'address', 'avatar']
                    }
                ).execPopulate();
                //update
                await ConversationModel.updateWhenHasNewMessage(senderId, receivedId);
                (!isCurrent)? resolve({newMessage, newConversation}) : resolve({newMessage})
            }
        } catch (error) {
            reject(error);
        }
    })
}

let addNewFile = (senderId, receivedId, messageVal, isChatGroup, isCurrent) => {
    return new Promise( async (resolve, reject) => {
        try {
            if (isChatGroup === "true") {
                let getChatGroupReceiver = await ChatGroupModel.getChatGroupById(receivedId);
                if (!getChatGroupReceiver) {
                    return reject("Error");
                }
                let newMessageItem;
                let arrayImagesMess = [];
                let arrayVideosMess = [];
                if (messageVal.length > 0) {
                    let arrayFilesPromise = messageVal.map(async fileVal => {
                        let checkImg = 0;
                        let BufferFile = await fsExtra.readFile(fileVal.path);
                        let ContentType = fileVal.mimetype;
                        let Name = fileVal.filename;
                        
                        if (ContentType === videoType[0]) {
                            arrayVideosMess.push({contentType: ContentType, fileName: Name, messageType: "video"});
                            return arrayVideosMess;
                        }

                        allTypes.map(type => {
                            if (type === ContentType) {
                                checkImg = 1;
                                return;
                            }
                        })
                        
                        arrayImagesMess.push({
                            data: BufferFile, 
                            contentType: ContentType, 
                            fileName: Name, 
                            messageType: (checkImg)? (MessageModel.messageTypes.IMAGE):(MessageModel.messageTypes.ATTACHMENT),
                        })
                        return arrayImagesMess;
                    });
                    await Promise.all(arrayFilesPromise);

                    newMessageItem = {
                        sender: senderId,
                        receiver: receivedId,
                        userCurrent: getChatGroupReceiver.members,
                        conversationType: MessageModel.conversationTypes.GROUP,
                        file: arrayImagesMess.length ? arrayImagesMess : [],
                        video: arrayVideosMess.length ? arrayVideosMess : []
                    };
                }

                //create new message
                let newMessage = await (await MessageModel.model.create(newMessageItem)).populate(
                    {
                        path: 'sender',
                        select: ['firstName', 'lastName', 'address', 'avatar']
                    }
                ).execPopulate();
        
                //update group chat
                await ChatGroupModel.updateWhenHasNewMessage(receivedId);
                resolve({newMessage});

            } else {
                let newConversation;
                if (isCurrent === "false") {
                    let conversation = await ConversationModel.getOneConversation(senderId, receivedId);
                    if (conversation) {
                        newConversation = conversation
                    }else{
                        let newConversationItem = {
                            firstOne: senderId,
                            secondOne: receivedId
                        }
                        newConversation = await ConversationModel.create(newConversationItem);
                    }
                }

                let newMessageItem;
                let arrayImagesMess = [];
                let arrayVideosMess = [];
                if (messageVal.length > 0) {
                    let arrayFilesPromise = messageVal.map(async fileVal => {
                        let checkImg = 0;
                        let BufferFile = await fsExtra.readFile(fileVal.path);
                        let ContentType = fileVal.mimetype;
                        let Name = fileVal.filename;
                        if (ContentType === videoType[0]) {
                            arrayVideosMess.push({contentType: ContentType, fileName: Name, messageType: "video", url: fileVal.path});
                            return arrayVideosMess;
                        }
                        imgType.map(type => {
                            if (type === ContentType) {
                                checkImg = 1;
                                return;
                            }
                        })
                        arrayImagesMess.push({
                            data: BufferFile, 
                            contentType: ContentType, 
                            fileName: Name, 
                            messageType: checkImg?MessageModel.messageTypes.IMAGE: MessageModel.messageTypes.ATTACHMENT
                        })
                        return arrayImagesMess;
                    });
                    await Promise.all(arrayFilesPromise);
                    newMessageItem = {
                        sender: senderId,
                        receiver: receivedId,
                        userCurrent: [senderId, receivedId],
                        conversationType: MessageModel.conversationTypes.PERSONAL,
                        file: arrayImagesMess.length > 0? arrayImagesMess : [],
                        video: arrayVideosMess.length > 0? arrayVideosMess : []
                    };
                }
                //create new message
                let newMessage = await (await MessageModel.model.create(newMessageItem)).populate(
                    {
                        path: 'sender',
                        select: ['firstName', 'lastName', 'address', 'avatar']
                    }
                ).execPopulate();;
 
                await ConversationModel.updateWhenHasNewMessage(senderId, receivedId);

                (!isCurrent)? resolve({newMessage, newConversation}) : resolve({newMessage})
            }
        } catch (error) {
            reject(error);
        }
    })
}

let readMoreAllChat = (currentUserId, skipPersonal, skipGroup) => {
    return new Promise( async (resolve, reject) =>  {
        try {
            let convers = await ConversationModel.readMoreConversations(currentUserId, skipPersonal, LIMIT_CONVERSATIONS_TAKEN);
            let userConversationPromise = convers.map(async (conver) => {
                if (conver.secondOne == currentUserId) {
                    let getUser = await UserModel.getNormalUserDataById(conver.firstOne);
                    conver = {...conver._doc, userChat: getUser}
                    return conver;
                }else{
                    let getUser = await UserModel.getNormalUserDataById(conver.secondOne);
                    conver = {...conver._doc, userChat: getUser}
                    return conver;
                }
            });

            let userConversations = await Promise.all(userConversationPromise);
            
            let groupConversations = await ChatGroupModel.readMoreChatGroups(currentUserId, skipGroup, LIMIT_CONVERSATIONS_TAKEN);
            let allConversations = userConversations.concat(groupConversations);

            allConversations = _.sortBy(allConversations, (item) => {
                return -item.updatedAt
            })

            let allConversationsToRender = [];
            let lengthToGet = allConversations.length < LIMIT_CONVERSATIONS_TAKEN ? allConversations.length : LIMIT_CONVERSATIONS_TAKEN;
            if (allConversations.length) {
                for (let index = 0; index < lengthToGet; index++) {
                    allConversationsToRender.push(allConversations[index]);
                }
            }
            //console.log(allConversationsToRender); nếu k có if(allConversations.length) thì allConversationsToRender bị undedine chws k  phải []
            
            // get messages to apply in screen chat
            let allConversationWithMessagesPromise = allConversationsToRender.map( async(conversation) => {
                // conversation = conversation.toObject();
                if (conversation.members) {
                    let getMessages = await MessageModel.model.getMessagesInGroup(conversation._id, LIMIT_MESSAGES_TAKEN);
                    conversation.messages = _.reverse(getMessages);

                    // lấy data info  để render ra client danh sách thành viên nhóm/////////////////////
                    conversation.membersInfo = [];
                    let memberIds = [];
                    for(let member of conversation.members){
                        if (member.userId == currentUserId) {
                            let myInfo = await UserModel.getNormalUserDataById(currentUserId);
                            conversation.membersInfo.push(myInfo);
                        }else{
                            memberIds.push(member.userId)
                        }
                    };
                    //lấy userInfo của các thành viên khác
                    let usersInfo = await UserModel.getNormalUsersDataByIdsAndLimit(memberIds, LIMIT_MEMBERS_TAKEN);
                    for(let member of usersInfo){
                        conversation.membersInfo.push(member);
                    }
                    ////////////////////////////////////////////////////////
                } else {
                    let getMessages = await MessageModel.model.getMessagesInPersonal(currentUserId, conversation._id, LIMIT_MESSAGES_TAKEN);
                    conversation.messages = _.reverse(getMessages);
                }
                return conversation;
            })

            let allConversationWithMessages = await Promise.all(allConversationWithMessagesPromise);
            allConversationWithMessages = _.sortBy(allConversationWithMessages, (item) => {
                return -item.updatedAt
            })

            resolve(allConversationWithMessages);
        } catch (error) {
            return reject(error);
        }
    })
}

let readMorePersonalChat = (currentUserId, skipPersonal) => {
    return new Promise( async (resolve, reject) =>  {
        try {
            let convers = await ConversationModel.readMoreConversations(currentUserId, skipPersonal, 1);
            let userConversationPromise = convers.map(async (conver) => {
                if (conver.secondOne == currentUserId) {
                    let getUser = await UserModel.getNormalUserDataById(conver.firstOne);
                    conver = {...conver._doc, userChat: getUser}
                    return conver;
                }else{
                    let getUser = await UserModel.getNormalUserDataById(conver.secondOne);
                    conver = {...conver._doc, userChat: getUser}
                    return conver;
                }
            });
            let userConversations = await Promise.all(userConversationPromise);

            userConversations = _.sortBy(userConversations, (item) => {
                return -item.updatedAt
            })
            
            // get messages to apply in screen chat
            let userConversationWithMessagesPromise = userConversations.map( async(conversation) => {
                // conversation = conversation.toObject();
                let getMessages = await MessageModel.model.getMessagesInPersonal(currentUserId, conversation._id, LIMIT_MESSAGES_TAKEN);
                conversation.messages = _.reverse(getMessages);
                return conversation;
            })
            let userConversationWithMessages = await Promise.all(userConversationWithMessagesPromise);
            
            userConversationWithMessages = _.sortBy(userConversationWithMessages, (item) => {
                return -item.updatedAt
            })
            
            resolve(userConversationWithMessages);
        } catch (error) {
            return reject(error);
        }
    })
}

let readMoreGroupChat = (currentUserId, skipGroup) => {
    return new Promise( async (resolve, reject) =>  {
        try {
            let groupConversations = await ChatGroupModel.readMoreChatGroups(currentUserId, skipGroup, LIMIT_CONVERSATIONS_TAKEN);
        
            let groupConversationWithMessagesPromise = groupConversations.map( async(conversation) => {
                let getMessages = await MessageModel.model.getMessagesInGroup(conversation._id, LIMIT_MESSAGES_TAKEN);
                conversation.messages = _.reverse(getMessages);

                // lấy data info  để render ra client danh sách thành viên nhóm/////////////////////
                conversation.membersInfo = [];
                let memberIds = [];
                for(let member of conversation.members){
                    if (member.userId == currentUserId) {
                        let myInfo = await UserModel.getNormalUserDataById(currentUserId);
                        conversation.membersInfo.push(myInfo);
                    }else{
                        memberIds.push(member.userId)
                    }
                };
                //lấy userInfo của các thành viên khác
                let usersInfo = await UserModel.getNormalUsersDataByIdsAndLimit(memberIds, LIMIT_MEMBERS_TAKEN);
                for(let member of usersInfo){
                    conversation.membersInfo.push(member);
                }
                ////////////////////////////////////////////////////////
                return conversation;
            })
            let groupConversationWithMessages = await Promise.all(groupConversationWithMessagesPromise);
            
            groupConversationWithMessages = _.sortBy(groupConversationWithMessages, (item) => {
                return -item.updatedAt
            })

            resolve(groupConversationWithMessages);
        } catch (error) {
            return reject(error);
        }
    })
}

let readMore = (currentUserId, skipMessage, targetId, chatInGroup) => {
    return new Promise( async (resolve, reject) =>  {
        try {
            //message in group
            if (chatInGroup) {
                let getMessages = await MessageModel.model.readMoreMessagesInGroup(targetId, skipMessage, LIMIT_MESSAGES_TAKEN);
                
                getMessages = _.reverse(getMessages);

                return resolve(getMessages);
            } 
            //message in personal
            let getMessages = await MessageModel.model.readMoreMessagesInPersonal(currentUserId, targetId, skipMessage, LIMIT_MESSAGES_TAKEN);
            getMessages = _.reverse(getMessages);
            return resolve(getMessages);

        } catch (error) {
            return reject(error);
        }
    })
}

let findConversations = (currentUserId, keyword) => {
    return new Promise( async (resolve, reject) =>  {
        try {
            let deprecatedUserIds = [];
            let conversationsByUser = await ConversationModel.find({
                $or: [
                    {"firstOne": currentUserId},
                    {"secondOne": currentUserId}
                ]
            });
            
            conversationsByUser.forEach((conver) => {
                deprecatedUserIds.push(conver.firstOne);
                deprecatedUserIds.push(conver.secondOne)
            });
            deprecatedUserIds = _.uniqBy(deprecatedUserIds);
            deprecatedUserIds = deprecatedUserIds.filter(userId => userId != currentUserId)

            let users = await UserModel.getNormalUserDataByIdAndKeyword(deprecatedUserIds,keyword)
            
            let groupConversations = await ChatGroupModel.getChatGroupsByKeyword(currentUserId, keyword ,LIMIT_CONVERSATIONS_TAKEN);
            
            let conversations = users.concat(groupConversations);

            //console.log(conversations);
            resolve(conversations);
        } catch (error) {
            return reject(error);
        }
    })
}

let deleteAllMessagesInPersonal = (currentUserId, userChatId) => {
    return new Promise( async (resolve, reject) =>  {
        try {
            let deleteAllMessages = await MessageModel.model.deleteAllMessages(currentUserId, userChatId);
            if (deleteAllMessages.n === 0) {
                await MessageModel.model.deleteAllMessagesFisrtUser(currentUserId, userChatId);
            }else{
                await ConversationModel.deleteOneConversation(currentUserId, userChatId);
            }
            resolve(true)
        } catch (error) {
            return reject(error);
        }
    })
}

let markAsReadMess = (messageId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let message = await MessageModel.model.findOneAndUpdate({"_id": messageId}, {"isReaded": true}, {returnOriginal: false});
            resolve(message);
        } catch (error) {
            reject(error);
        }
    })
}

module.exports = {
    getAllConversationItems: getAllConversationItems,
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