const NotificationModel = require('../models/notificationModel')
const UserModel = require('../models/userModel')
const CommentModel = require('../models/commentModel')
const _ = require("lodash")

const LIMIT = 8;

let getNotifications = (currentUserId) => {
    return new Promise( async (resolve, reject) => {
        try {
            let notifications = await NotificationModel.model.getNotifications(currentUserId, LIMIT);
            resolve(notifications);
        } catch (error) {
            reject(error);
        }
    })
}

let addNotifComment = (variable, writerPost) => {
    return new Promise( async (resolve, reject) => {
        try {
            let item, notification, receiverArr = [writerPost];
            if (variable.responseTo){
                let cmtRes = await CommentModel.getCommentResByCmtId(variable.responseTo, variable.parent)
                let comment = await CommentModel.getCommentById(variable.responseTo);

                receiverArr.push(`${comment.writer}`)
                cmtRes.forEach(cmt => {
                    if (variable.writer !== `${cmt.writer}`) {
                        receiverArr.push(`${cmt.writer}`)
                    }
                })
                receiverArr = _.uniqBy(receiverArr);
                receiverArr = receiverArr.filter(id => id !== variable.writer)  //variable.writer is current userId
                if (receiverArr.length > 0) {
                    item = {
                        sender: variable.writer,
                        receiver: receiverArr,
                        object: {
                            entity: NotificationModel.entity.COMMENT,
                            entityType: NotificationModel.entityTypes.ON_RES_COMMENT
                        },
                        post: variable.parent,
                        comment: variable.responseTo
                    }
                    notification = await (await NotificationModel.model.create(item))
                    .populate(
                    {
                        path: 'sender',
                        select: ['firstName', 'lastName', 'address', 'avatar']
                    }
                )
                    .populate('post')
                    .populate('comment')
                    .execPopulate();
                }
            }else{
                let cmtRes = await CommentModel.getCommentChildOfPost(variable.parent);
                cmtRes.forEach(cmt => {
                    if (variable.writer !== `${cmt.writer}`) {
                        receiverArr.push(`${cmt.writer}`)
                    }
                })
                receiverArr = _.uniqBy(receiverArr);
                receiverArr = receiverArr.filter(id => id !== variable.writer);
                if (receiverArr.length > 0) {
                    item = {
                        sender: variable.writer,
                        receiver: receiverArr,
                        object: {
                            entity: NotificationModel.entity.POST,
                            entityType: NotificationModel.entityTypes.ON_COMMENT_POST
                        },
                        post: variable.parent,
                    }
                    notification = await (await NotificationModel.model.create(item))
                    .populate(
                    {
                        path: 'sender',
                        select: ['firstName', 'lastName', 'address', 'avatar']
                    }
                )
                    .populate('post')
                    .execPopulate();
                }
            }
            resolve(notification);
        } catch (error) {
            reject(error);
        }
    })
}

let addNotifUpReaction = (postId, userId, writerPost) => {
    return new Promise( async (resolve, reject) => {
        try {
            let notification;
            if (userId !== writerPost) {
                let receiverArr = [writerPost]
                let item = {
                        sender: userId,
                        receiver: receiverArr,
                        object: {
                            entity: NotificationModel.entity.POST,
                            entityType: NotificationModel.entityTypes.ON_REACTION_POST
                        },
                        post: postId,
                    }
                let notifExist = await NotificationModel.model.findOneAndUpdate(item, {isRead:false, updatedAt: Date.now});
                if(!notifExist){
                    notification = await (await NotificationModel.model.create(item))
                    .populate(
                    {
                        path: 'sender',
                        select: ['firstName', 'lastName', 'address', 'avatar']
                    }
                )
                    .populate('post')
                    .execPopulate();
                }else{
                    notification = await (await NotificationModel.model.findById(notifExist._id))
                    .populate(
                    {
                        path: 'sender',
                        select: ['firstName', 'lastName', 'address', 'avatar']
                    }
                )
                    .populate('post')
                    .execPopulate();
                }
            }
            resolve(notification);
        } catch (error) {
            reject(error);
        }
    })
}

let addNotifUpReactionCmt = (postId, commentId, userId, writerComment) => {
    return new Promise( async (resolve, reject) => {
        try {
            let notification;
            if (userId !== writerComment) {
                let receiverArr = [writerComment]
                let item = {
                        sender: userId,
                        receiver: receiverArr,
                        object: {
                            entity: NotificationModel.entity.POST,
                            entityType: NotificationModel.entityTypes.ON_REACTION_COMMENT
                        },
                        post: postId,
                        comment: commentId
                    }
                let notifExist = await NotificationModel.model.findOneAndUpdate(item, {isRead:false, updatedAt: Date.now});
                if(!notifExist){
                    notification = await (await NotificationModel.model.create(item))
                    .populate(
                    {
                        path: 'sender',
                        select: ['firstName', 'lastName', 'address', 'avatar']
                    }
                )
                    .populate('post').populate('comment')
                    .execPopulate();
                }else{
                    notification = await (await NotificationModel.model.findById(notifExist._id))
                    .populate(
                    {
                        path: 'sender',
                        select: ['firstName', 'lastName', 'address', 'avatar']
                    }
                )
                    .populate('post').populate('comment')
                    .execPopulate();
                }
            }
            resolve(notification)
        } catch (error) {
            reject(error);
        }
    })
}

// count all notification unread
let countNotifUnread = (currentUserId) => {
    return new Promise( async (resolve, reject) => {
        try {
            let notificationsUnread = await NotificationModel.model.countDocuments({
                $and: [
                    {"receiverId": currentUserId},
                    {"isRead": false},
                ]
            });
            resolve(notificationsUnread);
            
        } catch (error) {
            reject(error);
        }
    })
}

let readMore = (currentUserId, skipNumberNotification) => {
    return new Promise( async (resolve, reject) => {
        try {
            let newNotifications = await NotificationModel.model.find({
                "receiverId": currentUserId,
            }).sort({"createdAt": -1}).skip(skipNumberNotification).limit(LIMIT);
            
            let getNotifiContents = newNotifications.map(async (notification) => {
                let sender = await UserModel.getNormalUserDataById(notification.senderId);
               return NotificationModel.contents.getContent(notification.type, notification.isRead, sender._id, sender.username, sender.avatar);

            })
            
            resolve(await Promise.all(getNotifiContents));
            
        } catch (error) {
            reject(error);
        }
    })
}

let markAllAsRead = (currentUserId) => {
    return new Promise( async (resolve, reject) => {
        try {
            await NotificationModel.model.updateMany({"receiver": currentUserId} , {"isRead": true})
            resolve(true);         
        } catch (error) {
            console.log(`Error when mark notification as read: ${error}`);
            reject(false);
        }
    })
}

let removeNotification = (idNotif) => {
    return new Promise( async (resolve, reject) => {
        try {
            await NotificationModel.model.deleteOne({_id: idNotif});
            resolve(true);         
        } catch (error) {
            reject(false);
        }
    })
}

module.exports = {
    getNotifications,
    countNotifUnread,
    readMore,
    markAllAsRead,
    addNotifComment,
    addNotifUpReaction,
    addNotifUpReactionCmt ,
    removeNotification
}