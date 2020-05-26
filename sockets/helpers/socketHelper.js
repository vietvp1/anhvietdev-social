let pushSocketIdToArray = (clients, userId, socketId) => {
    if(clients[userId]) {
        clients[userId].push(socketId); // khi có 1 tab truy cập rồi mà muốn nick trong bật nhiều tab
    } else {
        clients[userId] = [socketId]; // khi tab đầu tiên truy cập (lần đầu tiên đăng nhập)
    }
    return clients;
}

let removeSocketIdToArray =  (clients, userId, socket) => {
    clients[userId] = clients[userId].filter(socketId => socketId !==socket.id);

    if (!clients[userId].length) {
        delete clients[userId];
    }
    return clients;
}

let emitNotifyToArray = (clients, userIdWillReceive, io, eventName, data) => {
    clients[userIdWillReceive].forEach((soketId) => {
        return io.sockets.connected[soketId].emit(eventName, data);
    })
}

module.exports = {
    pushSocketIdToArray, removeSocketIdToArray, emitNotifyToArray
}

