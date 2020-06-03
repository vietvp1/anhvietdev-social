import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

const RequestSent = () => {
    const ContactSent = useSelector(state => state.contact.contactsSent);
    return (
        <div className="tab-pane fade" id="request-sent" role="tabpanel">
            <div className="iq-card-body p-0">
                <div className="row">
                    {
                        ContactSent.map((user, i) => (
                            <div key={i} className="col-md-6 col-lg-6 mb-3">
                                <div className="iq-friendlist-block">
                                    <div className="d-flex align-items-center justify-content-between">
                                        <div className="d-flex align-items-center">
                                            <Link to={`/profile/${user._id}`}>
                                                <img src={`${process.env.REACT_APP_UPLOADS_IMG}/${user.avatar}`} alt="profile-img" className="img-fluid avatar-150" />
                                            </Link>
                                            <div className="friend-info ml-3">
                                                <Link to={`/profile/${user._id}`}>
                                                    <h5>{user.firstName} {user.lastName}</h5>
                                                    <p className="mb-0">15 bạn bè</p>
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="iq-card-header-toolbar d-flex align-items-center">
                                            <div className="dropdown">
                                                <span className="dropdown-toggle btn btn-secondary mr-2" id="dropdownMenuButton31" data-toggle="dropdown" aria-expanded="true" role="button">
                                                    <i className="ri-check-line mr-1 text-white font-size-16" /> Đang chờ xác nhận
                                    </span>
                                                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton31">
                                                    <span className="dropdown-item" href="/">Bỏ theo dõi</span>
                                                    <span className="dropdown-item" href="/">Hủy</span>
                                                </div>
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
    )
}

export default RequestSent
