const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let groupSchema = new Schema({
    name: String,
    admins: [
        {
            type: Schema.Types.ObjectId,
            ref: 'user'
        }
    ],
    members: [  
        {
            type: Schema.Types.ObjectId,
            ref: 'user'
        }
    ],
    description: String,
    icon: String,
    privacy: String,
}, {timestamps: true})

const GROUP_PRIVACY = {
    CLOSED: "CLOSED",
    SECRET: "SECRET",
}

groupSchema.statics = {
    getGroupManaging(userId) {
        return this.find({"admins": userId});
    },

    getGroupJoined(userId) {
        return this.find({"members": userId});
    },

    getGroup(groupId){
        return this.findById(groupId);
    }
}

module.exports = {
    model: mongoose.model('group', groupSchema),
    privacy: GROUP_PRIVACY,
};