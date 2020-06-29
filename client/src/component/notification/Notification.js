import React, { Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment';
import { Link } from 'react-router-dom'
import 'moment/locale/vi';
import { deleteNotification } from '../../actions/notification';

const Notification = () => {
  const notifications = useSelector(state => state.notification.notifications);
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();

  const onDelete = (id) => {
    dispatch(deleteNotification(id));
  }

  return user ? (
    <Fragment>
      <div id="content-page" className="content-page">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <div className="iq-card-header d-flex justify-content-between">
                <div className="iq-header-title">
                  <h4 className="card-title">Thông báo</h4>
                </div>
              </div>
            </div>
            <div className="col-sm-12">
              {

                !notifications.length > 0 ?
                  <h3 className="text-center"> 
                    Bạn không có thông báo nào.
                  </h3> :
                  notifications.map((n, i) => (
                    <div key={i} className="iq-card">
                      <div className="iq-card-body">
                        <ul className="notification-list m-0 p-0">
                          <li className="d-flex align-items-center">
                            <div className="user-img img-fluid">
                              <img src={`${process.env.REACT_APP_UPLOADS_IMG}/${n.sender.avatar}`} alt="story-img" className="rounded-circle avatar-40" />
                            </div>

                            {
                              (n.object.entityType === 'ADD_CONTACT') ? (
                                <div className="media-support-info ml-3">
                                  <h6>
                                    <Link to={`/profile/${n.sender._id}`}> <strong>{n.sender.firstName} {n.sender.lastName}</strong></Link> &nbsp;
                                            đã gửi cho bạn một lời mời kết bạn.
                                        </h6>
                                  <p className="mb-0">{moment(n.updatedAt).locale('vi').startOf("seconds").fromNow()}</p>
                                  <i className="ri-award-line iq-bg-primary" />
                                </div>
                              ) :
                                (n.object.entityType === 'APPROVE_CONTACT') ? (
                                  <div className="media-support-info ml-3">
                                    <h6>
                                      <Link to={`/profile/${n.sender._id}`}> <strong>{n.sender.firstName} {n.sender.lastName}</strong></Link> &nbsp;
                                            đã chấp nhận lời mời kết bạn của bạn.
                                        </h6>
                                    <p className="mb-0">{moment(n.updatedAt).locale('vi').startOf("seconds").fromNow()}</p>
                                    <i className="ri-award-line iq-bg-primary" />
                                  </div>
                                ) :
                                  (n.object.entityType === 'ON_REACTION_POST') ? (
                                    <div className="media-support-info ml-3">
                                      <h6>
                                        <Link to={`/profile/${n.sender._id}`}> <strong>{n.sender.firstName} {n.sender.lastName}</strong></Link> &nbsp;
                                            đã bày tỏ cảm xúc về bài viết của bạn.
                                        </h6>
                                      <p className="mb-0">{moment(n.updatedAt).locale('vi').startOf("seconds").fromNow()}</p>
                                      <i className="ri-award-line iq-bg-primary" />
                                    </div>
                                  ) :
                                    (n.object.entityType === 'ON_REACTION_COMMENT') ? (
                                      <div className="media-support-info ml-3">
                                        <h6>
                                          <Link to={`/profile/${n.sender._id}`}> <strong>{n.sender.firstName} {n.sender.lastName}</strong></Link> &nbsp;
                                            đã bày tỏ cảm xúc về bình luận của bạn.
                                        </h6>
                                        <p className="mb-0">{moment(n.updatedAt).locale('vi').startOf("seconds").fromNow()}</p>
                                        <i className="ri-award-line iq-bg-primary" />
                                      </div>
                                    ) :
                                      (n.object.entityType === 'ON_COMMENT_POST' && user._id === n.post.writer) ? (
                                        <div className="media-support-info ml-3">
                                          <h6>
                                            <Link to={`/profile/${n.sender._id}`}> <strong>{n.sender.firstName} {n.sender.lastName}</strong></Link> &nbsp;
                                            đã bình luận về bài viết của bạn.
                                        </h6>
                                          <p className="mb-0">{moment(n.updatedAt).locale('vi').startOf("seconds").fromNow()}</p>
                                          <i className="ri-award-line iq-bg-primary" />
                                        </div>
                                      ) :
                                        (n.object.entityType === 'ON_COMMENT_POST' && user._id !== n.post.writer) ? (
                                          <div className="media-support-info ml-3">
                                            <h6>
                                              <Link to={`/profile/${n.sender._id}`}> <strong>{n.sender.firstName} {n.sender.lastName}</strong></Link> &nbsp;
                                            cũng đã bình luận về bài viết bạn đang theo dõi.
                                        </h6>
                                            <p className="mb-0">{moment(n.updatedAt).locale('vi').startOf("seconds").fromNow()}</p>
                                            <i className="ri-award-line iq-bg-primary" />
                                          </div>
                                        ) :
                                          (n.object.entityType === 'ON_RES_COMMENT' && user._id === n.post.writer) ? (
                                            <div className="media-support-info ml-3">
                                              <h6>
                                                <Link to={`/profile/${n.sender._id}`}> <strong>{n.sender.firstName} {n.sender.lastName}</strong></Link> &nbsp;
                                            đã bình luận về bài viết của bạn.
                                        </h6>
                                              <p className="mb-0">{moment(n.updatedAt).locale('vi').startOf("seconds").fromNow()}</p>
                                              <i className="ri-award-line iq-bg-primary" />
                                            </div>
                                          ) :
                                            (n.object.entityType === 'ON_RES_COMMENT' && user._id === n.comment.writer) ? (
                                              <div className="media-support-info ml-3">
                                                <h6>
                                                  <Link to={`/profile/${n.sender._id}`}> <strong>{n.sender.firstName} {n.sender.lastName}</strong></Link> &nbsp;
                                            đã trả lời bình luận của bạn ở một bài viết bạn đang theo dõi.
                                        </h6>
                                                <p className="mb-0">{moment(n.updatedAt).locale('vi').startOf("seconds").fromNow()}</p>
                                                <i className="ri-award-line iq-bg-primary" />
                                              </div>
                                            ) :
                                              (n.object.entityType === 'ON_RES_COMMENT' && user._id !== n.comment.writer && user._id !== n.post.writer) ? (
                                                <div className="media-support-info ml-3">
                                                  <h6>
                                                    <Link to={`/profile/${n.sender._id}`}> <strong>{n.sender.firstName} {n.sender.lastName}</strong></Link> &nbsp;
                                            cũng đã trả lời bình luận của bạn ở một bài viết bạn đang theo dõi.
                                        </h6>
                                                  <p className="mb-0">{moment(n.updatedAt).locale('vi').startOf("seconds").fromNow()}</p>
                                                  <i className="ri-award-line iq-bg-primary" />
                                                </div>
                                              ) : null
                            }
                            <div className="d-flex align-items-center">
                              <div className="iq-card-header-toolbar d-flex align-items-center">
                                <div className="dropdown">
                                  <span className="dropdown-toggle" data-toggle="dropdown">
                                    <i className="far fa-ellipsis-h" />
                                  </span>
                                  <div className="dropdown-menu dropdown-menu-right">
                                    <span className="dropdown-item"><i className="ri-eye-fill mr-2" />Xem</span>
                                    <span className="dropdown-item" onClick={e => onDelete(n._id)}>
                                      <i className="ri-delete-bin-6-fill mr-2" />Xóa
                                  </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  ))}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  ) : null
}

export default Notification
