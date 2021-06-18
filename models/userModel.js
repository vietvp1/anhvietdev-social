const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: { type: String, maxlength: 20, required: true },
    lastName: { type: String, maxlength: 20, required: true },
    avatar: {
        type: String,
        default: 'avatar-default.jpg'
    },
    cover: {
        type: String,
        default: 'cover-default.jpg'
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: true,
        match: /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    },
    local: {
        password: { type: String, default: '' }
    },
    facebook: {
        id: String,
        token: String,
    },
    google: {
        id: String,
        token: String,
    },
    resetPasswordLink: {
        type: String,
        default: ''
    },
    role: { type: Number, default: 0 },
    gender: { type: String },
    birthday: { type: Date },
    phone: { type: String },
    address: {
        type: String,
    },
    another_name: { type: String, maxlength: 15 },
    introduce: { type: String, maxlength: 300 },
    description: { type: String, maxlength: 200 },
    following: [
        {
            type: Schema.Types.ObjectId,
            ref: 'user'
        }
    ],
    followers: [
        {
            type: Schema.Types.ObjectId,
            ref: 'user'
        }
    ],
    family: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'user'
            },
            relationship: String,
        }
    ],
    relationship_status: {
        status: String,
        privacy: {
            type: Number,
            min: 0,
            max: 2,
            default: 1  // 0: private, 2: friends, 1: public
        },
    },
    website: {
        type: String
    },
    status: {
        type: String,
    },
    skills: [
        { skillname: String }
    ],
    work: [
        {
            company: {
                type: String,
                required: true
            },
            position: {
                type: String,
                required: true
            },
            location: {
                type: String
            },
            from: {
                type: Date,
                required: true
            },
            to: {
                type: Date
            },
            current: {
                type: Boolean,
                default: false
            },
            description: {
                type: String
            },
            privacy: {
                type: Number,
                min: 0,
                max: 2,
                default: 1  // 0: private, 2: friends, 1: public
            },
        }
    ],
    education: [
        {
            school: {
                type: String,
                required: true
            },
            fieldofstudy: {
                type: String,
                required: true
            },
            location: {
                type: String
            },
            from: {
                type: Date,
                required: true
            },
            to: {
                type: Date
            },
            current: {
                type: Boolean,
                default: false
            },
            description: {
                type: String
            },
            privacy: {
                type: Number,
                min: 0,
                max: 2,
                default: 1  // 0: private, 2: friends, 1: public
            },
        }
    ],
    placeslived: [
        {
            placename: {
                type: String,
                required: true
            },
            from: {
                type: Date,
                required: true
            },
            privacy: {
                type: Number,
                min: 0,
                max: 2,
                default: 1  // 0: private, 2: friends, 1: public
            },
        }
    ],
    social: {
        youtubeUrl: {
            type: String
        },
        twitterUrl: {
            type: String
        },
        facebookUrl: {
            type: String
        },
        linkedinUrl: {
            type: String
        },
        instagramUrl: {
            type: String
        },
        googleUrl: {
            type: String
        }
    },
    interestedIn: {
        type: String
    },
}, { timestamps: true })

UserSchema.path('skills').validate(function (v) {
    return v.length < 2;
}, 'Bạn chỉ thêm được 1 kỹ năng cho mỗi lần thêm');

UserSchema.virtual('password')
    .set(function (password) {
        let salt = bcrypt.genSaltSync(10);
        this.local.password = bcrypt.hashSync(password, salt);
    })
    .get(function () {
        return this.local.password;
    });

UserSchema.methods = {
    comparePassword(password) {
        return bcrypt.compare(password, this.local.password); // return promise true or false
    }
}

UserSchema.statics = {
    findUserByEmail(email) {
        return this.findOne({ "email": email }, { "local.password": 0 })
    },
    findUserByIdForClientToUse(id) {
        return this.findById(id, { "local.password": 0, facebook: 0, google: 0, resetPasswordLink: 0 })
    },
    findUserByIdForServerToUse(id) {
        return this.findById(id, { "local.password": 0, facebook: 0, google: 0, resetPasswordLink: 0 });
    },
    getNormalUserDataById(id) {
        return this.findById(id, { "local.password": 0, facebook: 0, google: 0, resetPasswordLink: 0 })
    },
    getNormalUserDataByIdAndKeyword(friendIds, keyword) {
        return this.find({
            $and: [
                { "_id": { $in: friendIds } },
                {
                    $or: [
                        { "firstName": { "$regex": new RegExp(keyword, "i") } },
                        { "lastName": { "$regex": new RegExp(keyword, "i") } }
                    ]
                }
            ]
        }, { _id: 1, firstName: 1, lastName: 1, cover: 1, avatar: 1 });
    },
    getNormalUsersDataByIdsAndLimit(UserIds, limit) {
        return this.find({
            $and: [
                { "_id": { $in: UserIds } },
            ]
        }, { _id: 1, firstName: 1, lastName: 1, cover: 1, avatar: 1 }).populate('avatar').limit(limit);
    },
    getNormalUserDataByKeyword(keyword) {
        return this.find({
            $or: [
                { "firstName": { "$regex": new RegExp(keyword, "i") } },
                { "lastName": { "$regex": new RegExp(keyword, "i") } }
            ]
        }, { _id: 1, firstName: 1, lastName: 1, cover: 1, avatar: 1 });
    },
}

module.exports = mongoose.model('user', UserSchema)