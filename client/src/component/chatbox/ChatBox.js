import React, { Fragment } from 'react'
import ChatBoxInput from './ChatBoxInput'
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import ChatVideoCall from '../chat/chatVideoCall/ChatVideoCall';
import Swal from 'sweetalert2';
import axios from 'axios'
import ChatBoxContent from './ChatBoxContent';

const ChatBox = () => {
    const conversations = useSelector(state => state.messdrop.conversations);
    const dispatch = useDispatch();
    const closeSingleChat = (id) => {
        dispatch({
            type: 'DELETE_MESSDROP',
            payload: id
        });
    }

    const onDelete = (conversation) => {
        Swal.fire({
            title: `Bạn có chắc muốn xóa cuộc trò chuyện này?`,
            text: "Nếu xóa bạn sẽ không thể khôi phục cuộc trò chuyện!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'OK'
        }).then(async (result) => {
            if (result.value) {
                const res = await axios.put('/message/delete-conversation', {userChatId: conversation.userChat._id});
                if (res.data.success) {
                    dispatch({
                        type: 'DELETE_CONVERSATIONS',
                        payload: conversation._id
                    });
                    dispatch({
                        type: 'DELETE_MESSDROP',
                        payload: conversation._id
                    });
                    Swal.fire({
                        title: `Bạn có chắc muốn xóa cuộc trò chuyện này?`,
                        icon: 'success'
                    })
                }
            }
        })
    }

    return (
        <Fragment>
            <TransitionGroup className="line-list-conversation">
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
                                        <div className="name-chat-box text-overflow-three-dot">{c.userChat.firstName}&nbsp;{c.userChat.lastName}</div>
                                        <div className="more">
                                            <ChatVideoCall conversation={c} />
                                            <div className="more-optns"><i className="far fa-ellipsis-h"></i>
                                                <ul>
                                                    <li><i className="fal fa-thumbtack"></i> Gim lên đầu</li>
                                                    <li onClick={e=>onDelete(c)}><i className="fal fa-trash-alt"></i> Xóa cuộc trò chuyện</li>
                                                    <li><i className="fal fa-ban"></i> Chặn trò chuyện</li>
                                                </ul>
                                            </div>
                                            <div onClick={e => closeSingleChat(c._id)}><i className="fas fa-times"></i></div>
                                        </div>
                                    </div>
                                    <div className="chat-list">
                                        <ChatBoxContent c={c}/>
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
