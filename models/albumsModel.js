const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let albumsSchema = new Schema({
    name: String,
    from: {
        managedBy: String,
        idManager: String
    }
})

const FROM = {
    PERSONAL: "PERSONAL",
    GROUP: "GROUP",
}

module.exports = {
    model:mongoose.model('album', albumsSchema),
    from: FROM
}