import React from 'react'
import { useSelector } from 'react-redux';

const ChatVideoCall = ({conversation}) => {
    let socket = useSelector(state => state.master_data.socket);
    let user = useSelector(state => state.auth.user);

      const callWithVideo = () => {
        let dataToEmit = {
            callerName: user.firstName + " " + user.lastName,
            listenerId: conversation.userChat._id,
            listenerName: conversation.userChat.firstName + " " + conversation.userChat.lastName
        }
        socket.emit("call-check-listener-online-or-not", dataToEmit);
      };

    return (
        <div>
            <i onClick={callWithVideo} className="fal fa-video"></i>
        </div>
    )
}

export default ChatVideoCall
