import {pushSocketIdToArray, emitNotifyToArray, removeSocketIdToArray} from "../../helpers/socketHelper"
import ChatGroupModel from "../../models/chatGroupModel"

let chatVideoGroup = (io) => {
    let clients = {};
    var channels = {};
    var sockets = {};
    io.on("connection", (socket) => {
        let currentUserId = socket.request.user._id;
        clients = pushSocketIdToArray(clients, currentUserId, socket.id);
        socket.request.user.chatGroupIds.forEach(group => {
            clients = pushSocketIdToArray(clients, group._id, socket.id);
        });

        //when has new group chat
        socket.on("new-group-created" , (data) => {
            clients = pushSocketIdToArray(clients, data.groupChat._id, socket.id);
        });
        socket.on("member-received-group-chat", (data) => {
            clients = pushSocketIdToArray(clients, data.groupChatId, socket.id);
        });
        socket.on("newMember-received-group-chat", (data) => {
            clients = pushSocketIdToArray(clients, data.groupChatId, socket.id);
        });

        ////////////////////////////
        socket.on("call-members-join" ,async (data) => {
            let groupChat = await ChatGroupModel.getChatGroupById(data.groupChatId)

            data.arrayIds.forEach(id => {
                if (clients[id] && id != currentUserId) {
                    let response = {
                        groupChatId: data.groupChatId,
                        callerId: currentUserId,
                        listenerId: id,
                        groupChatName: groupChat.name
                    };
                    emitNotifyToArray(clients, id, io, "server-send-request-call-group-to-members", response);
                }
            })
            
        });

        socket.on("caller-cancel-request-call-group-to-server" , (data) => {
            let response = {
                groupChatName: data.groupChatName
            };
            if (clients[data.listenerId]) {
                emitNotifyToArray(clients, data.listenerId, io, "server-send-cancel-call-to-members", response);
            }
        });

        socket.on("members-reject-request-call-to-server" , (data) => {
            let response = {
                groupChatName: data.groupChatName
            };
            if (clients[data.callerId]) {
                emitNotifyToArray(clients, data.callerId, io, "server-send-reject-call-group-to-caller", response);
            }
        });
        
        socket.on("members-accept-request-call-to-server" , (data) => {
            let response = {
                groupChatName: data.groupChatName
            };
            if (clients[data.callerId]) {
                emitNotifyToArray(clients, data.callerId, io, "server-send-accept-call-group-to-caller", response);
            }

            if (clients[data.listenerId]) {
                emitNotifyToArray(clients, data.listenerId, io, "server-send-accept-call-group-to-members", response);
            }
        });
        
        socket.channels = {};
        sockets[socket.id] = socket;
        socket.on('join', function (data) {
            var channel = data.channel;
    
            if (channel in socket.channels) {
                return;
            }
    
            if (!(channel in channels)) {
                channels[channel] = {};
            }
            
            for (let id in channels[channel]) {
                channels[channel][id].emit('addPeer', {'socket_id': socket.id, 'should_create_offer': false});
                socket.emit('addPeer', {'socket_id': id, 'should_create_offer': true});
            }
    
            channels[channel][socket.id] = socket;
            socket.channels[channel] = channel;
        });
    
        socket.on('relayICECandidate', function(data) {
            var socket_id = data.socket_id;
            var ice_candidate = data.ice_candidate;
    
            if (socket_id in sockets) {
                sockets[socket_id].emit('iceCandidate', {'socket_id': socket.id, 'ice_candidate': ice_candidate});
            }
        });
    
        socket.on('relaySessionDescription', function(data) {
            var socket_id = data.socket_id;
            var session_description = data.session_description;
    
            if (socket_id in sockets) {
                sockets[socket_id].emit('sessionDescription', {'socket_id': socket.id, 'session_description': session_description});
            }
        });

        socket.on("off-video-group", function () {
            for (var channel in socket.channels) {
                part(channel);
            }
            delete sockets[socket.id];
        });

        function part(channel) {
            if (!(channel in socket.channels)) {
                return;
            }
    
            delete socket.channels[channel];
            delete channels[channel][socket.id];
    
            for (let id in channels[channel]) {
    
                channels[channel][id].emit('removePeer', {'socket_id': socket.id});
                socket.emit('removePeer', {'socket_id': id});
            }
        }
        socket.on('part', part);

        socket.on("disconnect", () => {
            clients = removeSocketIdToArray(clients, currentUserId, socket);
            socket.request.user.chatGroupIds.forEach(group => {
                clients = removeSocketIdToArray(clients, group._id, socket);
            });
        });
    })
}

module.exports = chatVideoGroup;