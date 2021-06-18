import React, { useState, useEffect } from 'react'
import MessageItem from './MessageItem'
import ScrollToBottom from 'react-scroll-to-bottom';
import ChatBoxInput from '../../chatbox/ChatBoxInput';
import ChatVideoCall from '../chatVideoCall/ChatVideoCall';
import { lastItemOfArray } from '../../../clientHelper/helperClient';
import moment from 'moment';
import 'moment/locale/vi';
import { useDispatch, useSelector } from 'react-redux';

const ChatRight = ({ i, c, showRight }) => {
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
        <div className={(showRight === c._id || (!showRight && i === 0)) ? "tab-pane fade active show" : "tab-pane fade"} role="tabpanel">
            <div className="chat-head">
                <header className="d-flex justify-content-between align-items-center bg-white pt-3 pr-3 pb-3">
                    <div className="d-flex align-items-center">
                        <div className="avatar chat-user-profile m-0 mr-3">
                            <img src={`${process.env.REACT_APP_UPLOADS_IMG}/${c.userChat.avatar}`} alt="avatar" className="avatar-50 " />
                            <span className="avatar-status"><i className="ri-checkbox-blank-circle-fill text-success" /></span>
                        </div>
                        <h5 className="mb-0">{c.userChat.firstName} {c.userChat.lastName}</h5>
                    </div>
                    <div className="chat-header-icons d-flex">
                        <span className="chat-icon-phone iq-bg-primary">
                            <i className="fal fa-phone"></i>
                        </span>

                        <span className="chat-icon-video iq-bg-primary">
                            <ChatVideoCall conversation={c} />
                        </span>

                        <span className="dropdown iq-bg-primary dropdown-toggle nav-hide-arrow cursor-pointer pr-0" id="dropdownMenuButton02" data-toggle="dropdown" >
                            <i className="far fa-ellipsis-v" />
                            <span className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton02">
                                <span className="dropdown-item"><i className="fal fa-thumbtack"></i> Gim lên đầu</span>
                                <span className="dropdown-item"><i className="fal fa-trash-alt"></i> Xóa cuộc trò chuyện</span>
                                <span className="dropdown-item"><i className="fal fa-ban"></i> Chặn trò chuyện</span>
                            </span>
                        </span>
                    </div>
                </header>
            </div>
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
                                        <img className="typing-gif" src={require('../../../images/typingg.gif')} alt=""></img>
                                    </div>
                                </div>
                            </div>
                        </div>
                        : null
                }
            </ScrollToBottom>
            <div className="text-box">
                <ChatBoxInput conversation={c} />
            </div>
        </div>
    )
}

export default ChatRight