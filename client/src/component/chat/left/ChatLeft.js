import React, { useState, useRef } from 'react'
import { lastItemOfArray } from "../../../clientHelper/helperClient"
import { useSelector } from 'react-redux';
import axios from 'axios';
import moment from 'moment';
import { Link } from 'react-router-dom';

const ChatLeft = ({ showRight, conversations }) => {
    const user = useSelector(state => state.auth.user);
    const [foundChats, setFoundChats] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const typingTimeoutRef = useRef(null);

    const handleSearchTermChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }

        if (value === "") {
            setFoundChats([]);
        }
        else {
            typingTimeoutRef.current = setTimeout(async () => {
                console.log(value);
                let res = await axios.get(`/contact/search-friends/${value}`)
                setFoundChats(res.data.users);
            }, 400)
        }
    }

    return user ? (
        <div className="col-lg-3 chat-data-left scroller">
            <div className="chat-search pt-3 pl-3">
                <div className="d-flex align-items-center">
                    <div className="chat-profile mr-3">
                        <img src={`${process.env.REACT_APP_UPLOADS_IMG}/${user.avatar}`} alt="chat-user" className="avatar-60 " />
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
                            id="chat-search1"
                            placeholder="Tìm kiếm..."
                            onChange={handleSearchTermChange}
                        />
                        <i className="far fa-search mt-1" />
                    </div>
                </div>
            </div>

            {
                foundChats.length > 0 ?
                    <div className="chat-search-result pl-3 pt-3">
                        <h6>Kết quả tìm kiếm</h6>
                        {
                            foundChats.map((user, i) =>
                                <Link key={i} to={`/chat/${user._id}`}>
                                    <div className="user-finded pointer iq-bg-primary-hover br-5">
                                        <img
                                            src={`${process.env.REACT_APP_UPLOADS_IMG}/${user.avatar}`}
                                            alt=''
                                            className="avatar-40 rounded mr-2 ml-2"
                                        />
                                        {user.firstName}&nbsp;{user.lastName}
                                    </div>
                                </Link>
                            )
                        }
                    </div> : null
            }

            <div className="chat-sidebar-channel scroller mt-4 pl-3">
                <h5>Tất cả trò chuyện</h5>
                <ul className="iq-chat-ui nav flex-column">
                    {
                        conversations.map((c, i) =>
                            <li key={c._id} className={!lastItemOfArray(c.messages).isReaded &&
                                lastItemOfArray(c.messages).receiver === user._id ?
                                "readed-false iq-bg-primary-hover br-5 border-dark-1" : "iq-bg-primary-hover br-5 border-dark-1"}
                            >
                                <Link className={(c._id === showRight || (!showRight && i === 0)) ? "active br-5" : "br-5"}
                                    to={`/chat/${c.userChat._id}`}
                                >
                                    <div className="d-flex align-items-center">
                                        <div className="avatar mr-2 ml-2">
                                            <img src={`${process.env.REACT_APP_UPLOADS_IMG}/${c.userChat.avatar}`} alt="chatuserimage" className="avatar-50 " />
                                            <span className="avatar-status"><i className="ri-checkbox-blank-circle-fill text-success" /></span>
                                        </div>
                                        <div className="chat-sidebar-name">
                                            <h6 className="mb-0 text-overflow-three-dot" style={{ width: "60%" }}>
                                                {c.userChat.firstName} {c.userChat.lastName}
                                            </h6>
                                            <h6 className="preview-mess text-overflow-three-dot" style={{ width: "60%" }}>
                                                {
                                                    (c.messages && c.messages.length > 0) ?
                                                        (lastItemOfArray(c.messages).file.length > 0) ? "Tệp đính kèm..." :
                                                                `${lastItemOfArray(c.messages).text}` : null
                                                }
                                            </h6>
                                        </div>
                                        <div className="chat-meta float-right text-center mr-1">
                                            <div className="chat-msg-counter bg-primary text-white">20</div>
                                            <span className="text-nowrap">{moment(c.updatedAt).locale('vi').startOf("seconds").fromNow()}</span>
                                        </div>
                                    </div>
                                </Link>
                            </li>
                        )
                    }
                </ul>
            </div>
        </div>
    ) : null
}

export default ChatLeft
