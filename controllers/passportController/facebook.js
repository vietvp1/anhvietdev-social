const fetch = require('node-fetch');
const User = require('../../models/userModel');
const jwt = require('jsonwebtoken');
const {transSuccess, transErrors} = require('../../lang/vi')

exports.facebookLogin = (req, res) => {
    const { userID, accessToken } = req.body;
    const url = `https://graph.facebook.com/v2.11/${userID}/?fields=id,name,email&access_token=${accessToken}`;
    return (
        fetch(url, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(response => {
                const { email, name} = response;
                let firstName = name.slice(0, name.indexOf(' '));
                let lastName =  name.slice(name.indexOf(' ') + 1, name.length);

                User.findOne({"email": email}).exec((err, user) => {
                    if (user) {
                        const token = jwt.sign({ user: user }, process.env.JWT_SECRET, { expiresIn: '7d' });
                        return res.json({ message: "Auth successful", token: token});
                    } else {
                        user = new User({ firstName, lastName,  facebook: {id: userID}, email: email });
                        user.save((err, data) => {
                            if (err) {
                                return res.status(400).json({
                                    error: 'User signup failed with facebook'
                                });
                            }
                            const token = jwt.sign({ user: user }, process.env.JWT_SECRET, { expiresIn: '7d' });
                            return res.json({ message: "Auth successful", token: token});
                        });
                    }
                });
            })
            .catch(error => {
                res.json({
                    error: 'Facebook login failed. Try later'
                });
            })
    );
};