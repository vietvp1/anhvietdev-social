import React, { useState, useEffect, Fragment } from 'react'
import FbImageLibrary from '../../fb-grid';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/vi';
import Comment from '../../comment/Comment';
import { Link } from 'react-router-dom';
import PostReaction from './PostReaction';
import { useSelector } from 'react-redux';
import PostOption from './PostOption';
import pageImgae47 from '../../../images/page-img/47.png'

const PostItem = ({ post, hidePost }) => {
    const user = useSelector(state => state.auth.user);
    const [img, setImg] = useState([]);
    const [video, setVideo] = useState([]);
    const [attachment, setAttachment] = useState([]);

    useEffect(() => {
        let isSubscribed = true;
        axios.post('/post/get-file-in-post', { postId: post._id }).then(res => {
            if (isSubscribed) {
                let data = res.data;
                setImg([]);
                setAttachment([]);
                setVideo([]);
                data.photos.forEach(p => {
                    setImg(i => [...i, `${process.env.REACT_APP_UPLOADS_IMG}/${p.fileName}`])
                })
                data.attachments.forEach(f => {
                    setAttachment(i => [...i, { url: `${process.env.REACT_APP_UPLOADS_IMG}/${f.fileName}`, fileName: f.fileName }])
                })
                data.videos.forEach(p => {
                    setVideo(i => [...i, `${process.env.REACT_APP_UPLOADS_IMG}/${p.fileName}`])
                })
            }
        })
        return () => isSubscribed = false;
    }, [post])

    const display = (
        <Fragment>
            {
                img.length > 0 ?
                    <div style={{ height: "550px" }}>
                        <FbImageLibrary images={img} />
                    </div> : null
            }

            {attachment.map((f, i) =>
                <div key={i} className="file-post iq-bg-primary mt-2">
                    <div>
                        <img className="rounded-circle img-fluid avatar-40 mr-2" src={pageImgae47} alt="profile" />
                    </div>
                    <div className="preview-file-name text-overflow-three-dot">
                        <a href={`${f.url}`} download={f.fileName}>
                            {f.fileName}
                        </a>
                    </div>
                </div>
            )}

            {video.length > 0 && video.map((v, i) => <video key={i} style={{ width: '100%' }} src={v} controls ></video>)}
        </Fragment>
    )

    return user ? (
        <div className="col-sm-12">
            <div className="iq-card iq-card-block iq-card-stretch iq-card-height">
                <div className="iq-card-body">
                    <div className="user-post-data">
                        <div className="d-flex flex-wrap">
                            <div className="media-support-user-img mr-3">
                                <Link to={`/profile/${post.writer._id}`}>
                                    <img src={`${process.env.REACT_APP_UPLOADS_IMG}/${post.writer.avatar}`} className="rounded-circle img-fluid" alt="" />
                                </Link>
                            </div>
                            <div className="media-support-info mt-2">
                                <h5 className="mb-0 d-inline-block">
                                    <Link to={`/profile/${post.writer._id}`}>{post.writer.firstName} {post.writer.lastName}</Link>
                                    {
                                        post.tags.length > 0 ?
                                            <span> với
                                         <Link to={`/profile/${post.tags[0]._id}`}> {post.tags[0].firstName}&nbsp;{post.tags[0].lastName}</Link>
                                            </span> : null
                                    }
                                    {
                                        post.tags.length > 1 ?
                                            <span className="dropdown">
                                                <span className="dropdown-toggle pointer" data-toggle="dropdown" role="button">
                                                    &nbsp;và {post.tags.length - 1} người khác
                                                </span>
                                                <div className="dropdown-menu">
                                                    {
                                                        post.tags.map((user, i) =>
                                                            <Link className="dropdown-item" key={i} to={`/profile/${user._id}`}>{user.firstName}&nbsp;{user.lastName}</Link>

                                                        )
                                                    }
                                                </div>
                                            </span> : null
                                    }
                                    <span></span>
                                </h5>
                                <p className="mb-0 d-inline-block">&nbsp;{post.title}</p>
                                <p className="mb-0 text-primary">{moment(post.createdAt).locale('vi').startOf("seconds").fromNow()}</p>
                            </div>
                            <PostOption user={user} post={post} hidePost={hidePost} />
                        </div>
                    </div>
                    <div className="mt-3">
                        <div className="post-text-content">{post.text}</div>
                    </div>

                    <div className="user-post">
                        {display}
                    </div>

                    <PostReaction post={post} userId={user._id} />
                    <hr />
                    <Comment post={post} />
                </div>
            </div>
        </div>

    ) : null
}

export default PostItem