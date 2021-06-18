const mongoose = require('mongoose')
const mongoURI = process.env.MONGODB_URI;
const GridFsStorage = require('multer-gridfs-storage');
const multer = require('multer')
const path = require('path');
const crypto = require('crypto');


const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true 
        });
    } catch (error) {
        process.exit(1);
    }
}

const conn = mongoose.createConnection(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const storage = new GridFsStorage({
    url: mongoURI,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const filename = buf.toString('hex') + path.extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                    bucketName: 'uploads'
                };
                resolve(fileInfo);
            });
        });
    }
});
let uploadFileToDB = multer({
    storage: storage,
}).single("file")

let uploadFilesToDB = multer({
    storage: storage,
}).array("file")

module.exports = {
    connectDB,
    conn,
    uploadFileToDB,
    uploadFilesToDB
};