import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import PostForm from '../../../home/newsfeed/PostForm';
import PostItem from '../../../home/newsfeed/PostItem';
import { CSSTransition, TransitionGroup } from 'react-transition-group'

const Timeline = ({ user }) => {
    const [Posts, setPosts] = useState([]);
    const [photos, setPhotos] = useState([]);
    const [list, setList] = useState([]);
    useEffect(() => {
        let isSubscribed = true;

        axios.get(`/post/getposts/${user._id}`).then(res => {
            if (isSubscribed) setPosts(res.data);
        })
        axios.get(`/photos/${user._id}`).then(res => {
            if (isSubscribed) setPhotos(res.data.photos);
        });
        axios.get(`/contact/get-contacts/${user._id}`).then(res => {
            if (isSubscribed) setList(res.data);
        })
        return () => isSubscribed = false;
    }, [user._id])

    const updatePost = (newPost) => {
        setPosts([newPost, ...Posts]);
    }

    const hidePost = (postId) => {
        setPosts(Posts.filter(p => p._id !== postId));
    }

    return (
        <div className="tab-pane fade active show" id="timeline" role="tabpanel">
            <div className="iq-card-body p-0">
                <div className="row">
                    <div className="col-lg-4">
                        <div className="iq-card">
                            <div className="iq-card-header d-flex justify-content-between">
                                <div className="iq-header-title">
                                    <h4 className="card-title">Ảnh</h4>
                                </div>
                            </div>
                            <div className="iq-card-body">
                                <ul className="profile-img-gallary d-flex flex-wrap p-0 m-0">
                                    {
                                        photos.map((p, i) =>
                                            <li key={i} className="col-md-4 col-6 pl-2 pr-0 pb-3">
                                                <span>
                                                    <img src={`${process.env.REACT_APP_UPLOADS_IMG}/${p.fileName}`}
                                                        style={{ width: "83px", height: "83px" }}
                                                        alt="gallary-img" className="img-fluid" />
                                                </span>
                                            </li>
                                        )
                                    }
                                </ul>
                            </div>
                        </div>
                        <div className="iq-card">
                            <div className="iq-card-header d-flex justify-content-between">
                                <div className="iq-header-title">
                                    <h4 className="card-title">Bạn bè</h4>
                                </div>
                            </div>
                            <div className="iq-card-body">
                                <ul className="profile-img-gallary d-flex flex-wrap p-0 m-0">
                                    {
                                        list.map((user, i) =>
                                            <li key={i} className="col-md-4 col-6 pl-2 pr-0 pb-3">
                                                <Link to={`/profile/${user._id}`}>
                                                    <img src={`${process.env.REACT_APP_UPLOADS_IMG}/${user.avatar}`} 
                                                        style={{ width: "83px", height: "83px" }}
                                                        alt="gallary-img" className="img-fluid" />
                                                </Link>
                                                <h6 className="mt-2"> {user.firstName} {user.lastName}</h6>
                                            </li>
                                        )
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-8">
                        <PostForm updatePost={updatePost} />
                        <div className="iq-card">
                            <div className="met-vl">
                                <TransitionGroup>
                                    {
                                        Posts.map((post, i) =>
                                            <CSSTransition key={i} timeout={1000} classNames="fade">
                                                <PostItem key={post._id} post={post} hidePost={hidePost} />
                                            </CSSTransition>
                                        )
                                    }
                                </TransitionGroup>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Timeline
