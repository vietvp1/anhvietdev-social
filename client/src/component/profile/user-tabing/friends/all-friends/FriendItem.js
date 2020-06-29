import React from 'react'
import { Link } from 'react-router-dom'

const FriendItem = ({ user }) => {
    return (
        <div className="col-md-6 col-lg-6 mb-3">
            <div className="iq-friendlist-block">
                <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                        <Link to={`/profile/${user._id}`}>
                            <img src={`${process.env.REACT_APP_UPLOADS_IMG}/${user.avatar}`} alt="profile-img" className="img-fluid avatar-150" />
                        </Link>
                        <div className="friend-info ml-3">
                            <Link to={`/profile/${user._id}`}>
                                <h5>{user.firstName} {user.lastName}</h5>
                                <p className="mb-0">15 friends</p>
                            </Link>
                        </div>
                    </div>
                    <div className="iq-card-header-toolbar d-flex align-items-center">
                        <div className="dropdown">
                            <span className="dropdown-toggle btn btn-secondary mr-2" id="dropdownMenuButton01" data-toggle="dropdown" aria-expanded="true" role="button">
                                <i className="ri-check-line mr-1 text-white font-size-16" /> Bạn bè
                            </span>
                            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton01">
                                <span className="dropdown-item" >Bật thông báo</span>
                                <span className="dropdown-item" >Bạn thân</span>
                                <span className="dropdown-item" >Bỏ theo dõi</span>
                                <span className="dropdown-item" >Hủy bạn bè</span>
                                <span className="dropdown-item" >Chặn</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FriendItem
