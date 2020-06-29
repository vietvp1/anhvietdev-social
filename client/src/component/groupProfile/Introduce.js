import React from 'react'
import { Link } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/vi';
moment.locale('vi')

const Introduce = ({ group }) => {
    return (
        <div className="pl-5 pr-5">
            <div>
                <h4>Giới thiệu nhóm</h4>
                <hr />
                <div>
                    <div className="d-flex mb-3">
                        <div className="icon font-size-20"><i className="fal fa-lock-alt" /></div>
                        <div className="data ml-2">
                            <h6>Riêng tư</h6>
                            <p className="mb-0">Chỉ thành viên mới nhìn thấy mọi người trong nhóm và những gì họ đăng.</p>
                        </div>
                    </div>

                    <div className="d-flex mb-3">
                        <div className="icon font-size-20"><i className="fal fa-eye"></i></div>
                        <div className="data ml-2">
                            <h6>Hiển thị</h6>
                            <p className="mb-0">Ai cũng có thể tìm nhóm này.</p>
                        </div>
                    </div>

                    <div className="d-flex mb-3">
                        <div className="icon font-size-20"><i className="fal fa-clock"></i></div>
                        <div className="data ml-2">
                            <h6>Lịch sử</h6>
                            <p className="mb-0">Đã tạo nhóm vào ngày {moment(group.createdAt).format('LL')}.</p>
                        </div>
                    </div>

                </div>
            </div>

            <div className="mt-5">
                <h4>Quản trị viên</h4>
                <hr />
                <div>
                    <div className="group-member mb-3">
                        <div className="iq-media-group">
                            {
                                group.admins.map((m, i) =>
                                    <Link to={`/profile/${m._id}`} key={i} className="iq-media">
                                        <img
                                            className="img-fluid avatar-40 rounded-circle"
                                            src={`${process.env.REACT_APP_UPLOADS_IMG}/${m.avatar}`}
                                            title={m.firstName + " " + m.lastName}
                                            alt={m.firstName + " " + m.lastName} />
                                    </Link>
                                )
                            }

                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Introduce
