import React, { Fragment, useState, useEffect } from 'react'
import bg from '../../images/page-img/profile-bg9.jpg'
import { useSelector } from 'react-redux';
import axios from 'axios';

const ProfileVideo = () => {
    const user = useSelector(state => state.auth.user);
    const [videos, setVideos] = useState([]);
    useEffect(() => {
        let isSubscribed = true;
        user && axios.get(`/videos/${user._id}`).then(res => {
            if (isSubscribed)
                res.data.videos.forEach(item => {
                    setVideos(v => [...v, `${process.env.REACT_APP_UPLOADS_IMG}/${item.fileName}`])
                })
        });
        return () => isSubscribed = false
    }, [user])

    return (
        <Fragment>
            <div className="header-for-bg">
                <div className="background-header position-relative">
                    <img src={bg} className="img-fluid w-100 rounded rounded" alt="profile-bg" />
                    <div className="title-on-header">
                        <div className="data-block">
                            <h2>Video của bạn</h2>
                        </div>
                    </div>
                </div>
            </div>
            {/* Page Content  */}
            <div id="content-page" className="content-page">
                <div className="container">
                    <div className="row">
                        {
                            videos.map((v, i) =>
                                <div key={i} className="col-md-6 col-lg-4 mb-3">
                                    <div className="user-images position-relative overflow-hidden">
                                        <div className="embed-responsive embed-responsive-16by9">
                                            <video key={i} src={v} controls ></video>
                                        </div>
                                        <span className="image-edit-btn">
                                            <i className="ri-edit-2-fill" />
                                        </span>
                                    </div>
                                </div>
                            )
                        }

                    </div>
                </div>
            </div>

        </Fragment>
    )
}

export default ProfileVideo