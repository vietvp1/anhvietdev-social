import React from 'react'
import { lastItemOfArray, bufferToBase64 } from "../../../clientHelper/helperClient"
import { useSelector } from 'react-redux';
// import GroupChatModal from './groupChat/GroupChatModal';
import moment from 'moment';

const ChatLeft = ({ showRight, conversations }) => {
    const user = useSelector(state => state.auth.user);

    return user ? (
        <div className="col-lg-3 chat-data-left scroller">
            <div className="chat-search pt-3 pl-3">
                <div className="d-flex align-items-center">
                    <div className="chat-profile mr-3">
                        <img src={`data:${user.avatar.contentType};base64,${bufferToBase64(user.avatar.data.data)}`} alt="chat-user" className="avatar-60 " />
                    </div>
                    <div className="chat-caption">
                        <h5 className="mb-0">{user.firstName} {user.lastName}</h5>
                        <p className="m-0">Fullstack Dev</p>
                    </div>
                    <button type="submit" className="close-btn-res p-3"><i className="ri-close-fill" /></button>
                </div>
                <div className="chat-searchbar mt-4">
                    <div className="form-group chat-search-data m-0">
                        <input
                            type="text"
                            className="form-control round"
                            id="chat-search"
                            placeholder="Tìm kiếm..." />
                        <i className="far fa-search mt-1" />
                    </div>
                </div>
            </div>
            <div className="chat-sidebar-channel scroller mt-4 pl-3">
                <h5>Tất cả trò chuyện</h5>
                <ul className="iq-chat-ui nav flex-column nav-pills">
                    {
                        conversations.map((c, i) =>
                            <li key={c._id} className={!lastItemOfArray(c.messages).isReaded &&
                                lastItemOfArray(c.messages).receiver === user._id ? "readed-false" : ""}
                                id={`a_${c._id}`}>
                                <a data-toggle="pill" className={(c._id === showRight || (!showRight && i === 0)) ? "active" : ""}
                                    href={`#chatbox_${c._id}`}>
                                    <div className="d-flex align-items-center">
                                        <div className="avatar mr-2">
                                            <img src={`data:${c.userChat.avatar.contentType};base64,${bufferToBase64(c.userChat.avatar.data.data)}`} alt="chatuserimage" className="avatar-50 " />
                                            <span className="avatar-status"><i className="ri-checkbox-blank-circle-fill text-success" /></span>
                                        </div>
                                        <div className="chat-sidebar-name">
                                            <h6 className="mb-0"> {c.userChat.firstName} {c.userChat.lastName}</h6>
                                            <h6 className="preview-mess">
                                                {
                                                    (c.messages && c.messages.length > 0) ?
                                                        (lastItemOfArray(c.messages).file.length > 0) ? "Tệp đính kèm..." :
                                                            (lastItemOfArray(c.messages).video.length > 0) ? "Video..." :
                                                                `${lastItemOfArray(c.messages).text}` : null
                                                }
                                            </h6>
                                        </div>
                                        <div className="chat-meta float-right text-center mr-1">
                                            <div className="chat-msg-counter bg-primary text-white">20</div>
                                            <span className="text-nowrap">{moment(c.updatedAt).locale('vi').startOf("seconds").fromNow()}</span>
                                        </div>
                                    </div>
                                </a>
                            </li>
                        )
                    }
                </ul>
            </div>
        </div>
    ) : null
}

export default ChatLeft
