import React, { useState, useEffect }  from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import PostForm from '../../../home/newsfeed/PostForm';
import PostItem from '../../../home/newsfeed/PostItem';

const Timeline = ({user}) => {
    const [Posts, setPosts] = useState([]);
    const [photos, setPhotos] = useState([]);
    const [list, setList] = useState([]);
    useEffect(() => {
        let isSubscribed = true;
        if (user) {
            axios.get(`/post/getposts/${user._id}`).then(res => {
                if (isSubscribed) {
                    setPosts(res.data);
                }
            })
            axios.get(`/photos/${user._id}`).then(res => {
                if(isSubscribed) setPhotos(res.data.photos);
            });

            axios.get(`/contact/get-contacts/${user._id}`).then(res => {
                if(isSubscribed) setList(res.data);
            })
        }
        return () => isSubscribed = false;
    },[user])

    const updatePost = (newPost) => {
        setPosts([newPost, ...Posts]);
    }

    const hidePost = (postId) => {
        setPosts(Posts.filter(p => p._id!== postId));
    }

    return (
        <div className="tab-pane fade" id="timeline" role="tabpanel">
            <div className="iq-card-body p-0">
                <div className="row">
                <div className="col-lg-4">
                    <div className="iq-card">
                    <div className="iq-card-body">
                        <a href="/"><span className="badge badge-pill badge-primary font-weight-normal ml-auto mr-1"><i className="ri-star-line" /></span> 27 Items for yoou</a>
                    </div>
                    </div>
                    <div className="iq-card">
                        <div className="iq-card-header d-flex justify-content-between">
                            <div className="iq-header-title">
                            <h4 className="card-title">Life Event</h4>
                            </div>
                            <div className="iq-card-header-toolbar d-flex align-items-center">
                            <p className="m-0"><span> Tạo </span></p>
                            </div>
                        </div>
                        <div className="iq-card-body">
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="event-post position-relative">
                                    <a href="/"><img src={require('../../../../images/page-img/07.jpg')} alt="gallary-img" className="img-fluid rounded" /></a>
                                    <div className="job-icon-position">
                                        <div className="job-icon bg-primary p-2 d-inline-block rounded-circle"><i className="ri-briefcase-line" /></div>
                                    </div>
                                    <div className="iq-card-body text-center p-2">
                                        <h5>Started New Job at Apple</h5>
                                        <p>January 24, 2019</p>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="iq-card">
                        <div className="iq-card-header d-flex justify-content-between">
                            <div className="iq-header-title">
                            <h4 className="card-title">Ảnh</h4>
                            </div>
                            <div className="iq-card-header-toolbar d-flex align-items-center">
                            <p className="m-0"><span>Thêm</span></p>
                            </div>
                        </div>
                        <div className="iq-card-body">
                            <ul className="profile-img-gallary d-flex flex-wrap p-0 m-0">
                                {
                                    photos.map((p,i) => 
                                        <li key={i} className="col-md-4 col-6 pl-2 pr-0 pb-3">
                                            <span>
                                                <img src={`${process.env.REACT_APP_API}/${p.url}`} 
                                                style={{width:"83px", height:"83px"}} 
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
                            <div className="iq-card-header-toolbar d-flex align-items-center">
                            <p className="m-0"><span>Thêm</span></p>
                            </div>
                        </div>
                        <div className="iq-card-body">
                            <ul className="profile-img-gallary d-flex flex-wrap p-0 m-0">
                                {
                                    list.map((user,i) =>
                                    <li key={i} className="col-md-4 col-6 pl-2 pr-0 pb-3">
                                         <Link to={`/profile/${user._id}`}>
                                            <img style={{width:"83px", height:"83px"}} 
                                            src={`${process.env.REACT_APP_API}/${user.avatar}`} 
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
                    <PostForm updatePost={updatePost}/>
                    <div className="iq-card">
                    <div className="iq-card-body">
                        {
                            Posts.map(post => <PostItem key={post._id} post={post} hidePost={hidePost}/>)
                        }
                    </div>
                    </div>
                </div>
                </div>
            </div>
            
        </div>
    )
}

export default Timeline
