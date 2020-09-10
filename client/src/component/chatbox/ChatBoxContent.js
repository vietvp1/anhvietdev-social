import React, { useState, useEffect } from 'react'
import ScrollToBottom from 'react-scroll-to-bottom';
import MessageItem from '../chat/right/MessageItem';
import { lastItemOfArray } from '../../clientHelper/helperClient';
import moment from 'moment';
import 'moment/locale/vi';
import { useSelector, useDispatch } from 'react-redux';

const ChatBoxContent = ({ c }) => {
    const user = useSelector(state => state.auth.user)
    const socket = useSelector(state => state.master_data.socket)
    const dispatch = useDispatch();
    const [isTyping, setIsTyping] = useState(false);
    const [avatarTyping, setAvatarTyping] = useState(null);
    const [isReaded, setIsReaded] = useState(false);
    useEffect(() => {
        if (socket) {
            socket.on("response-user-is-typing", res => {
                setAvatarTyping(res.avatar);
                setIsTyping(true);
            })
            socket.on("response-user-is-not-typing", res => {
                setAvatarTyping(null);
                setIsTyping(false);
            })
            socket.on("response-user-mark-readed-mess", res => {
                dispatch({
                    type: 'MARK_AS_READ_MESSAGE',
                    payload: {
                        conversationId: res.conversationId,
                        messageId: res.messageId,
                        time: res.time
                    }
                });
            })
            return () => {
                socket.off("response-user-is-typing");
                socket.off("response-user-is-not-typing");
                socket.off("response-user-mark-readed-mess");
            }
        }
    }, [socket, dispatch])

    useEffect(() => {
        setIsReaded(false);
        if (user && lastItemOfArray(c.messages).isReaded && lastItemOfArray(c.messages).receiver !== user._id) {
            setIsReaded(true);
        }
    }, [user, c.messages])
    return (
        <ScrollToBottom className="chat-content scroller">
            {
                c.messages.map((message, i) => (
                    <MessageItem message={message} key={i} userChat={c.userChat} />
                ))
            }

            {
                isReaded ?
                    <div className="isReadedMess">Đã xem&nbsp;
                {moment(lastItemOfArray(c.messages).updatedAt).locale('vi').startOf("seconds").fromNow()}
                    </div> : null
            }
            {
                 isTyping && avatarTyping ?
                    <div className="chat chat-left">
                        <div className="chat-user">
                            <img src={`${process.env.REACT_APP_UPLOADS_IMG}/${avatarTyping}`} alt="avatar" className="avatar-35 " />
                        </div>
                        <div className="chat-detail">
                            <div className="chat-message">
                                <div>
                                    <img className="typing-gif" src={require('../../images/typingg.gif')} alt=""></img>
                                </div>
                            </div>
                        </div>
                    </div>
                    : null
            }
        </ScrollToBottom>
    )
}

export default ChatBoxContent
