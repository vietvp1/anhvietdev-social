import React from 'react'
import MessageItem from './MessageItem'
import ScrollToBottom from 'react-scroll-to-bottom';
import ChatBoxInput from '../../chatbox/ChatBoxInput';
import ChatVideoCall from '../chatVideoCall/ChatVideoCall';
import { bufferToBase64 } from '../../../clientHelper/helperClient';

const ChatRight = ({ i, c, showRight }) => {
    return (
        <div className={(showRight === c._id || (!showRight && i === 0)) ? "tab-pane fade active show" : "tab-pane fade"} id={`chatbox_${c._id}`} role="tabpanel">
            <div className="chat-head">
                <header className="d-flex justify-content-between align-items-center bg-white pt-3 pr-3 pb-3">
                    <div className="d-flex align-items-center">
                        <div className="avatar chat-user-profile m-0 mr-3">
                            <img src={`data:${c.userChat.avatar.contentType};base64,${bufferToBase64(c.userChat.avatar.data.data)}`} alt="avatar" className="avatar-50 " />
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
                            <i className="far fa-ellipsis-v"/>
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
            </ScrollToBottom>
            <div className="text-box">
                <ChatBoxInput conversation={c} />
            </div>
        </div>
    )
}

export default ChatRight