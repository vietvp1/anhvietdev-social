import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import axios from "axios";
import moment from 'moment';
import 'moment/locale/vi';

const Notification = ({ user }) => {
  const notifications = useSelector(state => state.notification.notifications);
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();
  useEffect(() => {
    if (notifications) {
      let a = 0;
      notifications.forEach(notif => {
        if (!notif.isRead) {
          a++;
        }
      })
      setCount(a);
    }
  }, [notifications])

  const markAsReadHandle = async () => {
    const res = await axios.put('/notification/mark-all-as-read');
    if (res.data.success) {
      dispatch({
        type: 'MARK_AS_READ_NOTIFICATIONS',
      });
    }
  }

  return (
    <li className="nav-item dropdown">
      <span className="dropdown-toggle iq-waves-effect" data-toggle="dropdown">
        <i className="fal fa-bells"></i>
        {
          count > 0 ?
            <div className="dots">
              <span> {count} </span>
            </div> : null
        }
      </span>
      <div className="dropdown-menu dropdown-menu-right iq-sub-dropdown">
        <div className="iq-card shadow-none m-0">
          <div className="iq-card-body p-0 ">
            <div className="bg-primary p-3 not-close-when-click">
              <h5 className="mb-0 text-white">Tất cả thông báo
                                <div className="float-right">
                  <small className="badge badge-light pt-1 mr-3">
                    {count > 0 ? count : 0}
                  </small>
                  <span className="dropdown submenu-dropdown">
                    <span>
                      <i className="far fa-ellipsis-h"></i>
                    </span>
                    <div className="dropdown-menu dropdown-menu-right m-0 p-0">
                      <div className="dropdown-item p-3" onClick={markAsReadHandle}>
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
                            <p className="mb-0">Xóa tất cả thông báo của bạn.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </span>
                </div>
              </h5>
            </div>
            {notifications.map((n, i) => (
              <span key={i} className={!n.isRead ? "iq-sub-card readed-false" : "iq-sub-card"}>
                <div className="media align-items-center">
                  <div>
                    <img src={`${process.env.REACT_APP_UPLOADS_IMG}/${n.sender.avatar}`} className="avatar-40 rounded" alt="" />
                  </div>
                  {
                    (n.object.entityType === 'ADD_CONTACT') ? (
                      <div className="media-body ml-3">
                        <h6 className="mb-0 font-size-14">
                          <strong>{n.sender.firstName} {n.sender.lastName}</strong>&nbsp;
                                                    đã gửi cho bạn một lời mời kết bạn.
                                                </h6>
                        <small className="float-right font-size-12">
                          {moment(n.updatedAt).locale('vi').startOf("seconds").fromNow()}
                        </small>
                        <p className="mb-0"><i className="ri-award-line iq-bg-primary" /></p>
                      </div>
                    ) :
                      (n.object.entityType === 'APPROVE_CONTACT') ? (
                        <div className="media-body ml-3">
                          <h6 className="mb-0 font-size-14">
                            <strong>{n.sender.firstName} {n.sender.lastName}</strong>&nbsp;
                                                    đã chấp nhận lời mời kết bạn của bạn.
                                                </h6>
                          <small className="float-right font-size-12">
                            {moment(n.updatedAt).locale('vi').startOf("seconds").fromNow()}
                          </small>
                          <p className="mb-0"><i className="ri-award-line iq-bg-primary" /></p>
                        </div>
                      ) :
                        (n.object.entityType === 'ON_REACTION_POST') ? (
                          <div className="media-body ml-3">
                            <h6 className="mb-0 font-size-14">
                              <strong>{n.sender.firstName} {n.sender.lastName}</strong>&nbsp;
                                                    đã bày tỏ cảm xúc về bài viết của bạn.
                                                </h6>
                            <small className="float-right font-size-12">
                              {moment(n.updatedAt).locale('vi').startOf("seconds").fromNow()}
                            </small>
                            <p className="mb-0"><i className="ri-award-line iq-bg-primary" /></p>
                          </div>
                        ) :
                          (n.object.entityType === 'ON_REACTION_COMMENT') ? (
                            <div className="media-body ml-3">
                              <h6 className="mb-0 font-size-14">
                                <strong>{n.sender.firstName} {n.sender.lastName}</strong>&nbsp;
                                                    đã bày tỏ cảm xúc về bình luận của bạn.
                                                </h6>
                              <small className="float-right font-size-12">
                                {moment(n.updatedAt).locale('vi').startOf("seconds").fromNow()}
                              </small>
                              <p className="mb-0"><i className="ri-award-line iq-bg-primary" /></p>
                            </div>
                          ) :
                            (n.object.entityType === 'ON_COMMENT_POST' && user._id === n.post?.writer) ? (
                              <div className="media-body ml-3">
                                <h6 className="mb-0 font-size-14">
                                  <strong>{n.sender.firstName} {n.sender.lastName}</strong>&nbsp;
                                                    đã bình luận về bài viết của bạn.
                                                </h6>
                                <small className="float-right font-size-12">
                                  {moment(n.updatedAt).locale('vi').startOf("seconds").fromNow()}
                                </small>
                                <p className="mb-0"><i className="ri-award-line iq-bg-primary" /></p>
                              </div>
                            ) :
                              (n.object.entityType === 'ON_COMMENT_POST' && user._id !== n.post?.writer) ? (
                                <div className="media-body ml-3">
                                  <h6 className="mb-0 font-size-14">
                                    <strong>{n.sender.firstName} {n.sender.lastName}</strong>&nbsp;
                                                    cũng đã bình luận về bài viết bạn đang theo dõi.
                                                </h6>
                                  <small className="float-right font-size-12">
                                    {moment(n.updatedAt).locale('vi').startOf("seconds").fromNow()}
                                  </small>
                                  <p className="mb-0"><i className="ri-award-line iq-bg-primary" /></p>
                                </div>
                              ) :
                                (n.object.entityType === 'ON_RES_COMMENT' && user._id === n.post?.writer) ? (
                                  <div className="media-body ml-3">
                                    <h6 className="mb-0 font-size-14">
                                      <strong>{n.sender.firstName} {n.sender.lastName}</strong>&nbsp;
                                                    đã bình luận về bài viết của bạn.
                                                </h6>
                                    <small className="float-right font-size-12">
                                      {moment(n.updatedAt).locale('vi').startOf("seconds").fromNow()}
                                    </small>
                                    <p className="mb-0"><i className="ri-award-line iq-bg-primary" /></p>
                                  </div>
                                ) :
                                  (n.object.entityType === 'ON_RES_COMMENT' && user._id === n.comment?.writer) ? (
                                    <div className="media-body ml-3">
                                      <h6 className="mb-0 font-size-14">
                                        <strong>{n.sender.firstName} {n.sender.lastName}</strong>&nbsp;
                                                    đã trả lời bình luận của bạn ở một bài viết bạn đang theo dõi.
                                                </h6>
                                      <small className="float-right font-size-12">
                                        {moment(n.updatedAt).locale('vi').startOf("seconds").fromNow()}
                                      </small>
                                      <p className="mb-0"><i className="ri-award-line iq-bg-primary" /></p>
                                    </div>
                                  ) :
                                    (n.object.entityType === 'ON_RES_COMMENT' && user._id !== n.comment?.writer && user._id !== n.post?.writer) ? (
                                      <div className="media-body ml-3">
                                        <h6 className="mb-0 font-size-14">
                                          <strong>{n.sender.firstName} {n.sender.lastName}</strong>&nbsp;
                                                    cũng đã trả lời bình luận của bạn ở một bài viết bạn đang theo dõi.
                                                </h6>
                                        <small className="float-right font-size-12">
                                          {moment(n.updatedAt).locale('vi').startOf("seconds").fromNow()}
                                        </small>
                                        <p className="mb-0"><i className="ri-award-line iq-bg-primary" /></p>
                                      </div>
                                    ) : null
                  }
                </div>
              </span>
            ))}

            {
              notifications.length > 0 ?
                <div className="text-center">
                  <span className="mr-3 btn text-primary">Xem thêm</span>
                </div> :
                <div className="text-center">Không có thông báo nào!</div>
            }

          </div>
        </div>
      </div>
    </li>
  )
}

export default Notification