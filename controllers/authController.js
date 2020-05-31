const {authService} = require('../services/index')
const User = require('../models/userModel')
const jwt = require('jsonwebtoken');
const _ = require('lodash');
// sendgrid
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const {transSuccess, transErrors} = require('../lang/vi')

const register = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    if(!firstName || !lastName || !email || !password) {
        return res.status(400).json({ error: transErrors.enter_all_fields });
    }
    try {
        await authService.register(firstName, lastName, email, password);
        return res.status(200).send({message: transSuccess.signup_success, success: true});
    } catch (error) {
        res.status(500).send({error: error});
    }

}

const forgotPassword = async (req, res) => {
    const { email } = req.body;
    
    User.findOne({"email": email }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'Email không tồn tại'
            });
        }

        const token = jwt.sign({ _id: user._id, name: `${user.firstName} ${user.lastName}`}, process.env.JWT_RESET_PASSWORD, {
            expiresIn: '10m'
        });

        const emailData = {
            from: process.env.EMAIL_FROM,
            to: email,
            subject: `Liên kết đặt lại mật khẩu`,
            html: `
                <h1>Vui lòng sử dụng liên kết sau để đặt lại mật khẩu của bạn</h1>
                <p>${process.env.CLIENT_URL}/reset-password/${token}</p>
                <hr />
                <p>Email này có thể chứa thông tin nhạy cảm</p>
                <p>${process.env.CLIENT_URL}</p>
            `
        };
        
        return user.updateOne({ resetPasswordLink: token }, (err, success) => {
            if (err) {
                console.log('RESET PASSWORD LINK ERROR', err);
                return res.status(400).json({
                    error: 'Database connection error on user password forgot request'
                });
            } else {
                sgMail
                    .send(emailData)
                    .then(sent => {
                        //console.log('SIGNUP EMAIL SENT', sent)
                        return res.json({
                            message: `Yêu cầu đã được gửi tới ${email}. Làm theo hướng dẫn để kích hoạt tài khoản của bạn`
                        });
                    })
                    .catch(err => {
                        // console.log(err.response.body);
                        // console.log('SIGNUP EMAIL SENT ERROR')
                        return res.json({
                            message: err.message
                        });
                    });
            }
        });
    });
}

const resetPassword = async (req, res) => {
    const { resetPasswordLink, newPassword } = req.body;
    if (resetPasswordLink) {
        jwt.verify(resetPasswordLink, process.env.JWT_RESET_PASSWORD, function(err, decoded) {
            if (err) {
                return res.status(400).json({
                    error: 'Liên kết hết hạn. Thử lại'
                });
            }

            User.findOne({ resetPasswordLink }, (err, user) => {
                if (err || !user) {
                    return res.status(400).json({
                        error: 'Đã xảy ra lỗi. Hãy thử lại sau'
                    });
                }

                const updatedFields = {
                    password: newPassword,
                    resetPasswordLink: ''
                };
                user = _.extend(user, updatedFields);
                user.save((err, result) => {
                    if (err) {
                        return res.status(400).json({
                            error: 'Lỗi đặt lại mật khẩu người dùng'
                        });
                    }
                    res.json({
                        message: `Cập nhập mật khẩu thành công, bây giờ bạn có thể đăng nhập bằng mật khẩu mới của bạn`
                    });
                });
            });
        });
    }
}


module.exports = {
    register: register,
    forgotPassword: forgotPassword,
    resetPassword: resetPassword
}