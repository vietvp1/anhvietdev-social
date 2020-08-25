import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import facebook from '../../../images/icon/facebook.png'
import twitter from '../../../images/icon/twitter.png'
import instagram from '../../../images/icon/instagram.png'
import googlePlus from '../../../images/icon/google-plus.png'
import youtube from '../../../images/icon/youtube.png'
import linkedin from '../../../images/icon/linkedin.png'
import Cover from './Cover';
import { Avatar } from './Avatar';
import CheckContact from './CheckContact';
import axios from 'axios'


const ProfileHeader = ({ user }) => {
    const userauth = useSelector(state => state.auth.user);
    const [followingNumber, setFollowingNumber] = useState(0);
    const [followerNumber, setFollowerNumber] = useState(0);
    const [postNumber, setPostNumber] = useState(0);

    useEffect(() => {
        let isSubscribed = true;
        axios.get(`/follow/get-follow-number/${user._id}`).then(res => {
            if (isSubscribed) {
                setFollowerNumber(res.data.followerNumber);
                setFollowingNumber(res.data.followingNumber)
            }
        })
        return () => isSubscribed = false
    }, [user._id])

    useEffect(() => {
        let isSubscribed = true;
        axios.get(`/post/get-post-number-user/${user._id}`).then(res => {
            if (isSubscribed) {
                setPostNumber(res.data.postNumber);
            }
        })
        return () => isSubscribed = false
    }, [user._id])

    return userauth ? (
        <div className="iq-card">
            <div className="iq-card-body profile-page p-0">
                <div className="profile-header">
                    <div className="cover-container">
                        <Cover user={user} userauth={userauth} />
                    </div>
                    {
                        user._id !== userauth._id ? <CheckContact user={user} /> : null
                    }

                    <div className="user-detail avatar text-center mb-3">
                        <Avatar user={user} userauth={userauth} />
                        <div className="profile-detail">
                            <h3>{user.firstName} {user.lastName}</h3>
                        </div>
                    </div>
                    <div className="profile-info p-4 d-flex align-items-center justify-content-between position-relative">
                        <div className="social-links">
                            <ul className="social-data-block d-flex align-items-center justify-content-between list-inline p-0 m-0">
                                <li className="text-center pr-3">
                                    <a target="_blank" rel="noopener noreferrer" href={user.social && user.social.facebookUrl ? `${user.social.facebookUrl}` : '/'}>
                                        <img src={facebook} className="img-media rounded" alt="facebook" />
                                    </a>
                                </li>
                                <li className="text-center pr-3">
                                    <a target="_blank" rel="noopener noreferrer" href={user.social && user.social.twitterUrl ? `${user.social.twitterUrl}` : '/'}>
                                        <img src={twitter} className="img-media rounded" alt="Twitter" />
                                    </a>
                                </li>
                                <li className="text-center pr-3">
                                    <a target="_blank" rel="noopener noreferrer" href={user.social && user.social.instagramUrl ? `${user.social.instagramUrl}` : '/'}>
                                        <img src={instagram} className="img-media rounded" alt="Instagram" />
                                    </a>
                                </li>
                                <li className="text-center pr-3">
                                    <a target="_blank" rel="noopener noreferrer" href={user.social && user.social.googleUrl ? `${user.social.googleUrl}` : '/'}>
                                        <img src={googlePlus} className="img-media rounded" alt="Google plus" />
                                    </a>
                                </li>
                                <li className="text-center pr-3">
                                    <a target="_blank" rel="noopener noreferrer" href={user.social && user.social.youtubeUrl ? `${user.social.youtubeUrl}` : '/'}>
                                        <img src={youtube} className="img-media rounded" alt="Youtube" />
                                    </a>
                                </li>
                                <li className="text-center pr-3">
                                    <a target="_blank" rel="noopener noreferrer" href={user.social && user.social.linkedinUrl ? `${user.social.linkedinUrl}` : '/'}>
                                        <img src={linkedin} className="img-media rounded" alt="linkedin" />
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="social-info">
                            <ul className="social-data-block d-flex align-items-center justify-content-between list-inline p-0 m-0">
                                <li className="text-center pl-3">
                                    <h6>Số bài viết</h6>
                                    <p className="mb-0">{postNumber}</p>
                                </li>
                                <li className="text-center pl-3">
                                    <h6>Người theo dõi</h6>
                                    <p className="mb-0">{followerNumber}</p>
                                </li>
                                <li className="text-center pl-3">
                                    <h6>Đang theo dõi</h6>
                                    <p className="mb-0">{followingNumber}</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) : null
}

export default ProfileHeader
