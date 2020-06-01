import React, { Fragment } from 'react'
import ChatBoxInput from './ChatBoxInput'
import { useDispatch, useSelector } from 'react-redux';
import ScrollToBottom from 'react-scroll-to-bottom';
import MessageItem from '../chat/right/MessageItem';
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import ChatVideoCall from '../chat/chatVideoCall/ChatVideoCall';

const ChatBox = () => {
    const conversations = useSelector(state => state.messdrop.conversations);
    const dispatch = useDispatch();
    const closeSingleChat = (id) => {
        dispatch({
            type: 'DELETE_MESSDROP',
            payload: id
        });
    }
    return (
        <Fragment>
            <TransitionGroup>
                {
                    conversations.map((c, i) => (
                        <CSSTransition
                            key={i}
                            timeout={400}
                            classNames="slide"
                        >
                            <div className="chat-friendz">
                                <div className="chat-box">
                                    <div className="chat-head">
                                        <div className="status"><i className="fas fa-circle"></i></div>
                                        <div className="name-chat-box">{c.userChat.firstName}&nbsp;{c.userChat.lastName}</div>
                                        <div className="more">
                                            <ChatVideoCall conversation={c} />
                                            <div className="more-optns"><i className="far fa-ellipsis-h"></i>
                                                <ul>
                                                    <li><i className="fal fa-thumbtack"></i> Gim lên đầu</li>
                                                    <li><i className="fal fa-trash-alt"></i> Xóa cuộc trò chuyện</li>
                                                    <li><i className="fal fa-ban"></i> Chặn trò chuyện</li>
                                                </ul>
                                            </div>
                                            <div onClick={e => closeSingleChat(c._id)}><i className="fas fa-times"></i></div>
                                        </div>
                                    </div>
                                    <div className="chat-list">
                                        <ScrollToBottom className="chat-content scroller">
                                            {
                                                c.messages.map((message, i) => (
                                                    <MessageItem message={message} key={i} userChat={c.userChat} />
                                                ))
                                            }
                                        </ScrollToBottom>
                                        <div className="text-box">
                                            <ChatBoxInput conversation={c} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CSSTransition>
                    ))
                }
            </TransitionGroup>
        </Fragment>

    )
}

export default ChatBox
