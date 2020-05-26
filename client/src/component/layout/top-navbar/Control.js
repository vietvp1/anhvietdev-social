import React from 'react'
import { logout } from '../../../actions/auth'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const Control = ({ user }) => {
    const dispatch = useDispatch();
    const logOut = () => dispatch(logout());
    return (
        <li className="dropdown">
            <span className="dropdown-toggle iq-waves-effect d-flex align-items-center" data-toggle="dropdown">
                <i className="fal fa-caret-down"></i>
            </span>
            <div className="dropdown-menu dropdown-menu-right iq-sub-dropdown iq-user-dropdown">
                <div className="iq-card shadow-none m-0">
                    <div className="iq-card-body p-0 ">
                        <div className="bg-primary p-3 line-height">
                            <h5 className="mb-0 text-white line-height">Xin chào {user.firstName} {user.lastName}</h5>
                        </div>
                        <Link to={`/profile/${user._id}`} className="iq-sub-card iq-bg-primary-hover">
                            <div className="media align-items-center">
                                <div className="rounded iq-card-icon iq-bg-primary">
                                    <i className="fal fa-file-user" />
                                </div>
                                <div className="media-body ml-3">
                                    <h6 className="mb-0 ">Thông tin của tôi</h6>
                                    <p className="mb-0 font-size-12">Xem chi tiết hồ sơ cá nhân.</p>
                                </div>
                            </div>
                        </Link>
                        <a href="profile-edit.html" className="iq-sub-card iq-bg-warning-hover">
                            <div className="media align-items-center">
                                <div className="rounded iq-card-icon iq-bg-warning">
                                    <i className="fal fa-user-edit" />
                                </div>
                                <div className="media-body ml-3">
                                    <h6 className="mb-0 ">Chỉnh sửa hồ sơ</h6>
                                    <p className="mb-0 font-size-12">Sửa đổi chi tiết cá nhân của bạn.</p>
                                </div>
                            </div>
                        </a>
                        <a href="account-setting.html" className="iq-sub-card iq-bg-info-hover">
                            <div className="media align-items-center">
                                <div className="rounded iq-card-icon iq-bg-info">
                                    <i className="fal fa-user-cog" />
                                </div>
                                <div className="media-body ml-3">
                                    <h6 className="mb-0 ">Cài đặt tài khoản</h6>
                                    <p className="mb-0 font-size-12">Quản lý thông số tài khoản của bạn.</p>
                                </div>
                            </div>
                        </a>
                        <a href="privacy-setting.html" className="iq-sub-card iq-bg-danger-hover">
                            <div className="media align-items-center">
                                <div className="rounded iq-card-icon iq-bg-danger">
                                    <i className="fal fa-lock-alt" />
                                </div>
                                <div className="media-body ml-3">
                                    <h6 className="mb-0 ">Thiết lập riêng tư</h6>
                                    <p className="mb-0 font-size-12">Kiểm soát các thông số riêng tư của bạn.</p>
                                </div>
                            </div>
                        </a>
                        <div className="d-inline-block w-100 text-center p-3">
                            <div onClick={logOut} className="bg-primary iq-sign-btn">Đăng xuất
                                <i className="fal fa-sign-out ml-2" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    )
}

export default Control
