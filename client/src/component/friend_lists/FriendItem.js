import React from 'react'
import { bufferToBase64 } from '../../clientHelper/helperClient'

const FriendItem = ({ user }) => {
    console.log(user);
    
    return (
        <div className="col-md-6">
            <div className="iq-card">
                <div className="iq-card-body profile-page p-0">
                    <div className="profile-header-image">
                        <div className="friend-item-cover-container">
                            <img src={`data:${user.cover.contentType};base64,${bufferToBase64(user.cover.data.data)}`} alt="profile-bg" className="rounded img-fluid w-100" />
                        </div>
                        <div className="profile-info p-4">
                            <div className="user-detail">
                                <div className="d-flex flex-wrap justify-content-between align-items-start">
                                    <div className="profile-detail d-flex">
                                        <div className="profile-img pr-4">
                                            <img src={`data:${user.avatar.contentType};base64,${bufferToBase64(user.avatar.data.data)}`} alt="profile-img" className="avatar-130 img-fluid" />
                                        </div>
                                        <div className="user-data-block">
                                            <h4>{user.firstName} {user.lastName}</h4>
                                            <h6>@designer</h6>
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
