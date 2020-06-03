import React from 'react'
import { Link } from 'react-router-dom'

const Members = ({ group }) => {
    return (
        <div className="tab-pane fade" id="members" role="tabpanel">
            <div className="iq-card">
                <div className="iq-card-body">
                    <h2>Danh sách quản trị viên</h2>
                    <div className="row mt-3">
                        {
                            group.admins.map((user, i) => (
                                <div key={i} className="col-md-4 col-lg-4 mb-3">
                                    <div className="iq-friendlist-block">
                                        <div className="d-flex align-items-center justify-content-between">
                                            <div className="d-flex align-items-center">
                                                <Link to={`/profile/${user._id}`}>
                                                    <img src={`${process.env.REACT_APP_UPLOADS_IMG}/${user.avatar}`} alt="profile-img" className="img-fluid avatar-120" />
                                                </Link>
                                                <div className="friend-info ml-3">
                                                    <Link to={`/profile/${user._id}`}>
                                                        <h5>{user.firstName} {user.lastName}</h5>
                                                        <p className="mb-0">{user.address}</p>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>

                    <h2 className="mt-5">Các thành viên trong nhóm</h2>
                    <div className="row mt-3">
                        {
                            group.members.map((user, i) => (
                                <div key={i} className="col-md-4 col-lg-4 mb-3">
                                    <div className="iq-friendlist-block">
                                        <div className="d-flex align-items-center justify-content-between">
                                            <div className="d-flex align-items-center">
                                                <Link to={`/profile/${user._id}`}>
                                                    <img src={`${process.env.REACT_APP_UPLOADS_IMG}/${user.avatar}`} alt="profile-img" className="img-fluid avatar-120" />
                                                </Link>
                                                <div className="friend-info ml-3">
                                                    <Link to={`/profile/${user._id}`}>
                                                        <h5>{user.firstName} {user.lastName}</h5>
                                                        <p className="mb-0">{user.address}</p>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Members
