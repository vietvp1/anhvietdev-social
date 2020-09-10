import React, { Fragment, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Moment from 'react-moment';
import FbImageLibrary from '../../fb-grid'
import { Link } from 'react-router-dom'

const MessageItem = ({ message, userChat }) => {
    const user = useSelector(state => state.auth.user);
    const [img, setImg] = useState([]);
    const [video, setVideo] = useState([]);
    const [attachment, setAttachment] = useState([]);
    useEffect(() => {
        message.file.forEach(f => {
            if (f.messageType === "image") {
                //data:${f.contentType};base64,${bufferToBase64(f.data.data)}
                setImg(i => [...i, `${process.env.REACT_APP_UPLOADS_IMG}/${f.fileName}`]);
            } else if (f.messageType === "attachment") {
                setAttachment(i => [...i, { url: `${process.env.REACT_APP_UPLOADS_IMG}/${f.fileName}`, fileName: f.fileName }])
            } else {
                setVideo(i => [...i, `${process.env.REACT_APP_UPLOADS_IMG}/${f.fileName}`])
            }
        })
    }, [message.file])

    const display = message ? (
        <div>
            {img.length > 0 ?
                <div className="chat-img">
                    <FbImageLibrary images={img} />
                </div> : null
            }

            {attachment.map((f, i) =>
                <div key={i} className="chat-attachment iq-bg-primary mb-2 br-5">
                    <a href={`${f.url}`} download={f.fileName}>
                        <div className="preview-file d-flex">
                            <div className="mr-3"><i className="fad fa-file-alt font-size-32"></i></div>
                            <div className="preview-file-name text-overflow-three-dot pt-1">{f.fileName}</div>
                        </div>
                    </a>
                </div>
            )}

            {video.map((f, i) =>
                <div key={i}>
                    <span id="wrap-file" className={(message.file.length > 1) ? "image-message-many" : 'image-message-one'} >
                        <video style={{ width: '100%' }} type="video/mp4" src={f} controls ></video>
                    </span>
                </div>
            )}
        </div>
    ) : null

    return (
        <Fragment>
            {
                (message.sender._id === user._id) ?
                    <div className="chat">
                        <div className="chat-user">
                            <Link to={`/profile/${user._id}`} className="avatar m-0">
                                <img src={`${process.env.REACT_APP_UPLOADS_IMG}/${user.avatar}`} alt="avatar" className="avatar-35 " />
                            </Link>
                            <span className="chat-time mt-1"><Moment format='HH:mm'>{message.createdAt}</Moment></span>
                        </div>
                        <div className="chat-detail">
                            <div className="chat-message">
                                {
                                    (message.file.length === 0) ?
                                        <div className="bubble-me"> {message.text} </div>
                                        : 
                                        <Fragment>
                                            {display}
                                        </Fragment>
                                }
                            </div>
                        </div>
                    </div>
                    :
                    <div className="chat chat-left">
                        <div className="chat-user">
                            <Link to={`/profile/${message.sender._id}`} className="avatar m-0">
                                <img src={`${process.env.REACT_APP_UPLOADS_IMG}/${message.sender.avatar}`} alt="avatar" className="avatar-35 " />
                            </Link>
                            <span className="chat-time mt-1"><Moment format='HH:mm'>{message.createdAt}</Moment></span>
                        </div>
                        <div className="chat-detail">
                            <div className="chat-message">
                                {
                                    (message.file.length === 0) ?
                                        <div className="bubble-you"> {message.text} </div>
                                        : 
                                        <Fragment>
                                            {display}
                                        </Fragment>
                                }
                            </div>
                        </div>
                    </div>
            }
        </Fragment>
    )
}

export default MessageItem
