import React, { useState, useEffect } from 'react'
import axios from 'axios';
import PostForm from '../../../home/newsfeed/PostForm';
import PostItem from '../../../home/newsfeed/PostItem';
import { bufferToBase64 } from '../../../../clientHelper/helperClient';

const Discussion = ({ group }) => {
    const [Posts, setPosts] = useState([]);
    const [photos, setPhotos] = useState([]);

    useEffect(() => {
        let isSubscribed = true;
        if (isSubscribed) {
            axios.get(`/group/get-posts-in-group/${group._id}`).then(res => {
                setPosts(res.data);
            })
            // axios.get(`/group/get-photos-in-group/${group._id}`).then(res => {
            //     setPhotos(res.data.photos);
            // });
        }
        return () => isSubscribed = false;
    }, [group._id])

    const updatePost = (newPost) => {
        setPosts([newPost, ...Posts]);
    }

    const hidePost = (postId) => {
        setPosts(Posts.filter(p => p._id!== postId));
    }


    return (
        <div className="tab-pane fade active show" id="discussion" role="tabpanel">
            <div className="iq-card-body p-0">
                <div className="row">
                    <div className="col-lg-4">
                        <div className="iq-card">
                            <div className="iq-card-header d-flex justify-content-between">
                                <div className="iq-header-title">
                                    <h4 className="card-title">Ảnh trong nhóm</h4>
                                </div>
                            </div>
                            <div className="iq-card-body">
                                <ul className="profile-img-gallary d-flex flex-wrap p-0 m-0">
                                    {
                                        photos.length>0? photos.map((p, i) =>
                                            <li key={i} className="col-md-4 col-6 pl-2 pr-0 pb-3">
                                                <span>
                                                    <img src={`data:${p.contentType};base64,${bufferToBase64(p.data.data)}`}
                                                        style={{ width: "83px", height: "83px" }}
                                                        alt="gallary-img" className="img-fluid" />
                                                </span>
                                            </li>
                                        ): <div className="text-center">Trong nhóm chưa có hình ảnh nào</div>
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-8">
                        <PostForm updatePost={updatePost} />
                        <div className="iq-card">
                            <div className="met-vl">
                                {
                                    Posts.map(post => <PostItem key={post._id} post={post} hidePost={hidePost} />)
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Discussion
