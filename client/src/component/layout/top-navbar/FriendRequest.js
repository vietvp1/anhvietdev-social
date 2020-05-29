import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { bufferToBase64 } from '../../../clientHelper/helperClient';

const FriendRequest = () => {
    const ContactReceived = useSelector(state => state.contact.contactsReceived);
    return (
        <li className="nav-item dropdown">
            <span className="dropdown-toggle iq-waves-effect" data-toggle="dropdown">
                <i className="fal fa-user-friends"></i>
            </span>
            <div className="dropdown-menu dropdown-menu-right iq-sub-dropdown iq-sub-dropdown-large not-close-when-click ">
                <div className="iq-card shadow-none m-0">
                    <div className="iq-card-body p-0 ">
                        <div className="bg-primary p-3 not-close-when-click">
                            <h5 className="mb-0 text-white">Yêu cầu kết bạn
                            <div className="float-right">
                                    <small className="badge badge-light pt-1 mr-3">
                                        {ContactReceived.length}
                                    </small>
                                    <span className="dropdown submenu-dropdown">
                                        <span>
                                            <i className="far fa-ellipsis-h"></i>
                                        </span>
                                        <div className="dropdown-menu dropdown-menu-right m-0 p-0">
                                            <div className="dropdown-item p-3">
                                                <div className="d-flex align-items-top">
                                                    <div className="icon font-size-20"><i className="fal fa-check"></i></div>
                                                    <div className="data ml-2">
                                                        <h6>Đánh dấu</h6>
                                                        <p className="mb-0">Đánh dấu tất cả đã đọc.</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="dropdown-item p-3">
                                                <div className="d-flex align-items-top">
                                                    <div className="icon font-size-20"><i className="fal fa-trash-alt" /></div>
                                                    <div className="data ml-2">
                                                        <h6>Xóa tất cả</h6>
                                                        <p className="mb-0">Xóa tất cả lời mời kết bạn của bạn.</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </span>
                                </div>
                            </h5>
                        </div>

                        {
                            ContactReceived.map((user, i) => (
                                <div key={i} className="iq-friend-request">
                                    <div className="iq-sub-card iq-sub-card-big d-flex align-items-center justify-content-between">
                                        <div className="d-flex align-items-center">
                                            <div>
                                                <Link to={`/profile/${user._id}`}>
                                                    <img src={`data:${user.avatar.contentType};base64,${bufferToBase64(user.avatar.data.data)}`} className="avatar-40 rounded" alt="" />
                                                </Link>
                                            </div>
                                            <div className="media-body ml-3">
                                                <Link to={`/profile/${user._id}`}>
                                                    <h6 className="mb-0 ">{user.firstName} {user.lastName}</h6>
                                                    <p className="mb-0">40 friends</p>
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="d-flex align-items-center">
                                            <a href="/#" className="mr-3 btn btn-primary rounded">Xác nhận</a>
                                            <a href="/#" className="mr-3 btn btn-secondary rounded">Xóa yêu cầu</a>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }

                        {
                            ContactReceived.length > 0 ?
                                <div className="text-center">
                                    <span className="mr-3 btn text-primary">Xem thêm</span>
                                </div> :
                                <div className="text-center">Không có yêu cầu kết bạn nào!</div>
                        }


                    </div>
                </div>
            </div>
        </li>

    )
}

export default FriendRequest
