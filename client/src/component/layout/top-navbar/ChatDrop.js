import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { lastItemOfArray } from "../../../clientHelper/helperClient"
import moment from 'moment';

const ChatDrop = ({ userId }) => {
    const conversations = useSelector(state => state.conversation.conversations);
    const [count, setCount] = useState(0);
    useEffect(() => {
        if (conversations) {
            let a = 0;
            conversations.forEach(conver => {
                if (!lastItemOfArray(conver.messages).isReaded && lastItemOfArray(conver.messages).receiver === userId) {
                    a++;
                }
            })
            setCount(a);
        }
    }, [conversations, userId])
    return (
        <li className="nav-item dropdown">
            <span className="dropdown-toggle iq-waves-effect" data-toggle="dropdown">
                <i className="fal fa-envelope-open-text"></i>
                {
                    count > 0 ?
                        <div className="dots">
                            <span> {count} </span>
                        </div> : null
                }
            </span>
            <div className="dropdown-menu dropdown-menu-right iq-sub-dropdown">
                <div className="iq-card shadow-none m-0">
                    <div className="iq-card-body p-0 ">
                        <div className="bg-primary p-3 not-close-when-click">
                            <h5 className="mb-0 text-white">Tất cả cuộc trò chuyện
                            <div className="float-right">
                                    <small className="badge badge-light pt-1 mr-3">
                                        {count > 0 ? count : 0}
                                    </small>
                                    <span className="dropdown">
                                        <span className="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" role="button">
                                            <i className="far fa-ellipsis-h"></i>
                                        </span>
                                        <div className="dropdown-menu dropdown-menu-right m-0 p-0">
                                            <div className="dropdown-item p-3">
                                                <div className="d-flex align-items-top">
                                                    <div className="icon font-size-20"><i className="fal fa-check"></i></div>
                                                    <div className="data ml-2">
                                                        <h6>Đánh dấu</h6>
                                                        <p className="mb-0">Đánh dấu tất cả đã đọc.</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="dropdown-item p-3">
                                                <div className="d-flex align-items-top">
                                                    <div className="icon font-size-20"><i className="fal fa-arrow-right"></i></div>
                                                    <div className="data ml-2">
                                                        <h6>Xem tất cả</h6>
                                                        <p className="mb-0">Xem tất cả tin nhắn trong mục Chat.</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </span>
                                </div>
                            </h5>
                        </div>

                        {
                            conversations.map((c, i) =>
                                <div key={i} id={`anh${i}`} className={!lastItemOfArray(c.messages).isReaded &&
                                    lastItemOfArray(c.messages).receiver === userId ? "iq-sub-card readed-false" : "iq-sub-card"}>
                                    <div className="media align-items-center">
                                        <div>
                                            <img src={`${process.env.REACT_APP_UPLOADS_IMG}/${c.userChat.avatar}`} className="avatar-40 rounded" alt="" />
                                        </div>
                                        <div className="media-body ml-3 chat-sidebar-name">
                                            <h6 className="mb-0 text-overflow-three-dot"> {c.userChat.firstName} {c.userChat.lastName}</h6>
                                            <h6 className="preview-mess text-overflow-three-dot">
                                                {
                                                    (c.messages && c.messages.length > 0) ?
                                                        (lastItemOfArray(c.messages).file.length > 0) ? "Tệp đính kèm..." :
                                                            (lastItemOfArray(c.messages).video.length > 0) ? "Video..." :
                                                                `${lastItemOfArray(c.messages).text}` : null
                                                }
                                            </h6>
                                        </div>
                                        <div>
                                            <small className="float-right font-size-12">{moment(c.updatedAt).locale('vi').startOf("seconds").fromNow()}</small>
                                        </div>
                                    </div>
                                </div>
                            )
                        }

                        <div className="text-center not-close-when-click">
                            <span className="mr-3 btn text-primary">Xem thêm</span>
                        </div>

                    </div>
                </div>
            </div>
        </li>

    )
}

export default ChatDrop