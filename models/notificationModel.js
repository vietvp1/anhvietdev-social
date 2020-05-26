const mongoose = require('mongoose')
let Schema = mongoose.Schema;

let NotificationeSchema = new Schema({
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    } ,
    receiver: [  
        {
            type: Schema.Types.ObjectId,
            ref: 'user'
        }
    ],
    object: {
        entity: String,
        entityType: String,
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: 'post',
        default: null
    },
    comment: {
        type: Schema.Types.ObjectId,
        ref: 'comment',
        default: null
    },
    isRead: {type: Boolean, default: false}
}, { timestamps: true })

NotificationeSchema.statics = {
    getNotifications(userId, LIMIT){
        return this.find({
            "receiver": userId
        })
        .populate('sender', ['firstName','lastName','address', 'avatar'])
        .populate('post')
        .populate('comment')
        .sort({"updatedAt": -1}).limit(LIMIT);
    }
}

const NOTIFICATION_ENTITY_TYPES = {
    ON_REACTION_POST: "ON_REACTION_POST",
    ON_COMMENT_POST: "ON_COMMENT_POST",
    ON_REACTION_COMMENT: "ON_REACTION_COMMENT",
    ON_RES_COMMENT: "ON_RES_COMMENT",
    ADD_CONTACT: "ADD_CONTACT",
    APPROVE_CONTACT: "APPROVE_CONTACT",
}

const NOTIFICATION_ENTITY = {
    POST: "POST",
    CONTACT: "CONTACT",
    COMMENT: "COMMENT"
}

module.exports = {
    model: mongoose.model('notification', NotificationeSchema),
    entity: NOTIFICATION_ENTITY,
    entityTypes: NOTIFICATION_ENTITY_TYPES
}