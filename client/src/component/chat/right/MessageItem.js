import React, { Fragment, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Moment from 'react-moment';
import FbImageLibrary from '../../fb-grid'
import { Link } from 'react-router-dom'

const MessageItem = ({ message, userChat }) => {
    const user = useSelector(state => state.auth.user);
    const [img, setImg] = useState([]);
    useEffect(() => {
        message.file.forEach(f => {
            if (f.messageType === "image") {
                setImg(i => [...i, `data:${f.contentType};base64,${bufferToBase64(f.data.data)}`]);
            }
        })
    }, [message.file])

    const bufferToBase64 = (buffer) => {
        return btoa(
            new Uint8Array(buffer)
                .reduce((data, byte) => data + String.fromCharCode(byte), "")
        );
    }

    const display = message ? (
        <div>
            {img.length > 0 ?
                <div className="chat-img">
                    <FbImageLibrary images={img} />
                </div> : null
            }

            {message.file.map((f, i) =>
                (f.messageType === "attachment") ?
                    <div key={i} className="chat-attachment">
                        <a href={`data:${f.contentType}; base64, ${bufferToBase64(f.data.data)}`} download={f.fileName}>
                            <div className="preview-file">
                                <div><i className="fad fa-file-alt"></i></div>
                                <div className="preview-file-name">{f.fileName}</div>
                            </div>
                        </a>
                    </div> : null
            )}
        </div>
    ) : null

    const displayVideo = message ? (
        <div>
            {(message.video.map((v, i) => (
                <span key={i} id="wrap-file" className={(message.file.length > 1) ? "image-message-many" : 'image-message-one'} >
                    <video key={i} style={{ width: '100%' }} type="video/mp4"
                        src={`${process.env.REACT_APP_API}/${v.url}`}
                        controls ></video>
                </span>
            )))}
        </div>
    ) : null

    return (
        <Fragment>
            {
                (message.sender._id === user._id) ?
                    (message.file.length === 0 && message.video.length === 0) ?
                        <div className="chat">
                            <div className="chat-user">
                                <Link to={`/profile/${user._id}`} className="avatar m-0">
                                    <img src={`${process.env.REACT_APP_UPLOADS_IMG}/${user.avatar}`} alt="avatar" className="avatar-35 " />
                                </Link>
                                <span className="chat-time mt-1"><Moment format='HH:mm'>{message.createdAt}</Moment></span>
                            </div>
                            <div className="chat-detail">
                                <div className="chat-message">
                                    <div className="bubble-me"> {message.text} </div>
                                </div>
                            </div>
                        </div>
                        : (message.file.length > 0) ?
                            (
                                <div className="chat">
                                    <div className="chat-user">
                                        <Link to={`/profile/${user._id}`} className="avatar m-0">
                                            <img src={`${process.env.REACT_APP_UPLOADS_IMG}/${user.avatar}`} alt="avatar" className="avatar-35 " />
                                        </Link>
                                        <span className="chat-time mt-1"><Moment format='HH:mm'>{message.createdAt}</Moment></span>
                                    </div>
                                    <div className="chat-detail">
                                        <div className="chat-message">
                                            {display}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="chat">
                                    <div className="chat-user">
                                        <Link to={`/profile/${user._id}`} className="avatar m-0">
                                            <img src={`${process.env.REACT_APP_UPLOADS_IMG}/${user.avatar}`} alt="avatar" className="avatar-35 " />
                                        </Link>
                                        <span className="chat-time mt-1"><Moment format='HH:mm'>{message.createdAt}</Moment></span>
                                    </div>
                                    <div className="chat-detail">
                                        <div className="chat-message">
                                            {displayVideo}
                                        </div>
                                    </div>
                                </div>
                            )
                    :
                    (message.file.length === 0 && message.video.length === 0) ?
                        <div className="chat chat-left">
                            <div className="chat-user">
                                <Link to={`/profile/${message.sender._id}`} className="avatar m-0">
                                    <img src={`${process.env.REACT_APP_UPLOADS_IMG}/${message.sender.avatar}`} alt="avatar" className="avatar-35 " />
                                </Link>
                                <span className="chat-time mt-1"><Moment format='HH:mm'>{message.createdAt}</Moment></span>
                            </div>
                            <div className="chat-detail">
                                <div className="chat-message">
                                    <div className="bubble-you"> {message.text} </div>
                                </div>
                            </div>
                        </div>
                        : (message.file.length > 0) ?
                            (
                                <div className="chat chat-left">
                                    <div className="chat-user">
                                        <Link to={`/profile/${message.sender._id}`} className="avatar m-0">
                                            <img src={`${process.env.REACT_APP_UPLOADS_IMG}/${message.sender.avatar}`} alt="avatar" className="avatar-35 " />
                                        </Link>
                                        <span className="chat-time mt-1"><Moment format='HH:mm'>{message.createdAt}</Moment></span>
                                    </div>
                                    <div className="chat-detail">
                                        <div className="chat-message">
                                            {display}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="chat chat-left">
                                    <div className="chat-user">
                                        <Link to={`/profile/${message.sender._id}`} className="avatar m-0">
                                            <img src={`${process.env.REACT_APP_UPLOADS_IMG}/${message.sender.avatar}`} alt="avatar" className="avatar-35 " />
                                        </Link>
                                        <span className="chat-time mt-1"><Moment format='HH:mm'>{message.createdAt}</Moment></span>
                                    </div>
                                    <div className="chat-detail">
                                        <div className="chat-message">
                                            {displayVideo}
                                        </div>
                                    </div>
                                </div>
                            )
            }
        </Fragment>
    )
}

export default MessageItem
