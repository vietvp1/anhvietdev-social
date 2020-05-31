import React, { Fragment } from 'react'
import { useSelector } from "react-redux"
import { Link } from 'react-router-dom'
import { bufferToBase64 } from '../../clientHelper/helperClient';

const FriendRequest = () => {
    const ContactReceived = useSelector(state => state.contact.contactsReceived);
    return (
        <Fragment>
            <div id="content-page" className="content-page">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="iq-card">
                                <div className="iq-card-header d-flex justify-content-between">
                                    <div className="iq-header-title">
                                        <h4 className="card-title">Yêu cầu kết bạn</h4>
                                    </div>
                                </div>
                                <div className="iq-card-body">
                                    <ul className="request-list list-inline m-0 p-0">
                                        {
                                            ContactReceived.map((user, i) => (
                                                <li key={i} className="d-flex align-items-center">
                                                    <div className="user-img img-fluid">
                                                        <Link to={`/profile/${user._id}`}>
                                                            <img src={`data:${user.avatar.contentType};base64,${bufferToBase64(user.avatar.data.data)}`} alt="story-img" className="rounded-circle avatar-40" />
                                                        </Link>
                                                    </div>
                                                    <div className="media-support-info ml-3">
                                                        <Link to={`/profile/${user._id}`}>
                                                            <h6>{user.firstName} {user.lastName}</h6>
                                                            <p className="mb-0">40  friends</p>
                                                        </Link>
                                                    </div>
                                                    <div className="d-flex align-items-center">
                                                        <a href="/#" className="mr-3 btn btn-primary rounded">Xác nhận</a>
                                                        <a href="/#" className="mr-3 btn btn-secondary rounded">Xóa yêu cầu</a>
                                                    </div>
                                                </li>
                                            ))
                                        }
                                        {
                                            ContactReceived.length > 0 ?
                                                <li className="d-block text-center">
                                                    <a href="/#" className="btn btn-request">View More Request</a>
                                                </li> :
                                                <p className="text-center text-white">Không có yêu cầu kết bạn nào!</p>
                                        }
                                    </ul>
                                </div>
                            </div>
                            <div className="iq-card">
                                <div className="iq-card-header d-flex justify-content-between">
                                    <div className="iq-header-title">
                                        <h4 className="card-title">Những người bạn có thể biết</h4>
                                    </div>
                                </div>
                                <div className="iq-card-body">
                                    <ul className="request-list m-0 p-0">
                                        <li className="d-flex align-items-center">
                                            <div className="user-img img-fluid"><img src="images/user/15.jpg" alt="story-img" className="rounded-circle avatar-40" /></div>
                                            <div className="media-support-info ml-3">
                                                <h6>Jen Youfelct</h6>
                                                <p className="mb-0">4  Bạn bè</p>
                                            </div>
                                            <div className="d-flex align-items-center">
                                                <a href="/#" className="mr-3 btn btn-primary rounded"><i className="ri-user-add-line" />Thêm bạn</a>
                                                <a href="/#" className="mr-3 btn btn-secondary rounded">Xóa</a>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </Fragment>
    )
}

export default FriendRequest
