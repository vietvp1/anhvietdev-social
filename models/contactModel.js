const mongoose = require('mongoose')
let Schema = mongoose.Schema;

let ContactSchema = new Schema({
    userId: String,
    contactId: String,
    status: {type: Boolean, default: false}
},{ timestamps: true })

ContactSchema.statics = {
    checkContact(currentUserId, contactId) {
        return this.findOne({
            $or: [
                {$and: [
                    {"userId": currentUserId},
                    {"contactId": contactId}
                ]},
                {$and: [
                    {"userId": contactId},
                    {"contactId": currentUserId}
                ]},
            ]
        })
    },

    getFriends(id, limit) {
        return this.find({
            $and: [   
                {$or: [
                    {"userId": id},
                    {"contactId": id}
                ]},
                {"status": true}
            ]
        }).sort({"updatedAt": -1}).limit(limit);
    },

    readMoreContacts(id, skipNumber, limit){
        return this.find({
            $and: [   
                {$or: [
                    {"userId": id},
                    {"contactId": id}
                ]},
                {"status": true}
            ]
        }).sort({"updatedAt": -1}).skip(skipNumber).limit(limit);
    },

    getAllFriends(id) {
        return this.find({
            $and: [   
                {$or: [
                    {"userId": id},
                    {"contactId": id}
                ]},
                {"status": true}
            ]
        }).sort({"updatedAt": -1});
    },
}

module.exports = mongoose.model('contact', ContactSchema)