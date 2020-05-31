let jwt = require('jsonwebtoken')
let userModel = require('../models/userModel')

let socketAuth = (io) => {
    io.use(function(socket, next){
        if (socket.handshake.query && socket.handshake.query.token){
          jwt.verify(socket.handshake.query.token, process.env.JWT_SECRET, async function(err, decoded) {
            if(err) return next(new Error('Authentication error'));
            socket.decoded = decoded;
            let user = await userModel.findUserByIdForClientToUse(decoded.user._id)
            socket.user = user;
            socket.chatGroupIds = decoded.chatGroupIds? decoded.chatGroupIds : [];
            next();
          });
        } else {
            next(new Error('Authentication error'));
        }    
    })
}

module.exports = {
    socketAuth
}
