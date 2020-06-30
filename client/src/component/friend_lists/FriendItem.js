import React, { useState, useEffect } from 'react'
import axios from 'axios'

const FriendItem = ({ user }) => {
    const [isFollow, setIsFollow] = useState(false);

    useEffect(() => {
        let isSubscribed = true;
        axios.get(`/follow/check-follow/${user._id}`).then(res => {
            if (isSubscribed) {
                setIsFollow(res.data.isFollow);
            }
        })
        return () => isSubscribed = false;
    }, [user._id])

    
    const addNewFollower = async () => {
        const res = await axios.post("/follow/add-new-follower", {followerId: user._id})
        if (res.data.success) {
            setIsFollow(true);
        }
    }

    const removeFollower = async () => {
        const res = await axios.delete(`/follow/remove-follower/${user._id}`)
        if (res.data.success) {
            setIsFollow(false);
        }
    }

    return (
        <div className="col-md-6">
            <div className="iq-card">
                <div className="iq-card-body profile-page p-0">
                    <div className="profile-header-image">
                        <div className="friend-item-cover-container">
                            <img src={`${process.env.REACT_APP_UPLOADS_IMG}/${user.cover}`} alt="profile-bg" className="rounded img-fluid w-100" />
                        </div>
                        <div className="profile-info p-4">
                            <div className="user-detail">
                                <div className="d-flex flex-wrap justify-content-between align-items-start">
                                    <div className="profile-detail d-flex">
                                        <div className="profile-img pr-4">
                                            <img src={`${process.env.REACT_APP_UPLOADS_IMG}/${user.avatar}`} alt="profile-img" className="avatar-130 img-fluid" />
                                        </div>
                                        <div className="user-data-block">
                                            <h4>{user.firstName} {user.lastName}</h4>
                                            {
                                                user.description ? <p>{user.description}</p> : null
                                            }
                                        </div>
                                    </div>
                                    {
                                        isFollow ?
                                            <button className="btn btn-primary" onClick={removeFollower}>
                                                Đang theo dõi
                                            </button>
                                            :
                                            <button className="btn btn-primary" onClick={addNewFollower}>
                                                Theo dõi
                                            </button>
                                    }

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FriendItem
