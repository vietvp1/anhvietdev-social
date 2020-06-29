import React from 'react'

const FriendItem = ({ user }) => {
    console.log(user);
    
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
                                    <button type="submit" className="btn btn-primary">Theo dõi</button>
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
