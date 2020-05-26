const { OAuth2Client } = require('google-auth-library');
const User = require('../../models/userModel');
const jwt = require('jsonwebtoken');
const {transSuccess, transErrors} = require('../../lang/vi')

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET);
exports.googleLogin = (req, res) => {
    const { idToken, googleId } = req.body;
    if (!idToken || !googleId) {
        return res.status(400).json({
            error: transErrors.error_login
        });
    }
    client.verifyIdToken({ idToken, audience: process.env.GOOGLE_CLIENT_ID}).then(async response => {
        const { email_verified, name, email } = response.payload;
        if (email_verified) {
            const user = await User.findUserByEmail(email);
            if (user) {
                const token = jwt.sign({ user: user }, process.env.JWT_SECRET, { expiresIn: '7d' });
                return res.json({ message: transSuccess.loginSuccess(user.lastName), token: token});
            } else {
                let firstName = name.slice(0, name.indexOf(' '));
                let lastName =  name.slice(name.indexOf(' ') + 1, name.length);
                let user = new User({ firstName, lastName,  google: {id: googleId}, email: email });
                await user.save((err, data) => {
                    if (err) {
                        return res.status(400).json({
                            error: transErrors.google_signup_failed
                        });
                    }
                    const token = jwt.sign({ user: user }, process.env.JWT_SECRET, { expiresIn: '7d' });
                    return res.json({ message: transSuccess.loginSuccess(user.lastName), token: token});
                });
            }
        } else {
            return res.status(400).json({
                error: transErrors.error_login
            });
        }
    });
};