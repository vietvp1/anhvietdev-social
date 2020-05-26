let jwt = require('jsonwebtoken')
let socketAuth = (io) => {
    io.use(function(socket, next){
        if (socket.handshake.query && socket.handshake.query.token){
          jwt.verify(socket.handshake.query.token, process.env.JWT_SECRET, function(err, decoded) {
            if(err) return next(new Error('Authentication error'));
            socket.decoded = decoded;
            socket.user = decoded.user;
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
