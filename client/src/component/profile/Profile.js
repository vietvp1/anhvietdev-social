import React, { useEffect, useState } from 'react'
import ProfileHeader from './profile-header/ProfileHeader'
import UserTabling from './user-tabing/UserTabling'
import axios from 'axios'
//import { CSSTransition } from 'react-transition-group'
import PageLoader from '../layout/spinner/PageLoader'

const Profile = ({ match }) => {
    const [contact, setContact] = useState(false);
    useEffect(() => {
        let isSubscribed = true;
        axios.get(`/get-user/${match.params.id}`).then(res => {
            if (isSubscribed) setContact(res.data.user);
        });
        return () => isSubscribed = false
    }, [match]);

    return contact?(
        //<CSSTransition in appear timeout={1000} classNames="slide-page">
                 <div id="content-page" className="content-page">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12">
                                <ProfileHeader user={contact} />
                                <div className="iq-card">
                                    <div className="iq-card-body p-0">
                                        <div className="user-tabing">
                                            <ul className="nav nav-pills d-flex align-items-center justify-content-center profile-feed-items p-0 m-0">
                                                <li className="col-sm-3 p-0">
                                                    <a className="nav-link active" data-toggle="pill" href="#timeline">Dòng thời gian</a>
                                                </li>
                                                <li className="col-sm-3 p-0">
                                                    <a className="nav-link" data-toggle="pill" href="#about">Giới thiệu</a>
                                                </li>
                                                <li className="col-sm-3 p-0">
                                                    <a className="nav-link" data-toggle="pill" href="#friends">Bạn bè</a>
                                                </li>
                                                <li className="col-sm-3 p-0">
                                                    <a className="nav-link" data-toggle="pill" href="#photos">Hình ảnh</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-12">
                                <UserTabling user={contact} />
                            </div>
                        </div>
                    </div>
                </div>
        //</CSSTransition>
    ): <PageLoader/>
}

export default Profile