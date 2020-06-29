import React from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2';
import axios from "axios"

const Members = ({ group, setGroup }) => {

    const handleKickedBtn = (memberId) => {
        Swal.fire({
            title: 'Bạn có chắc muốn đuổi người dùng này ra khỏi nhóm không?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'OK'
        }).then(async (result) => {
            if (result.value) {
                const res = await axios.put('/group/kicked-out-group', { groupId: group._id, memberId: memberId });
                if (res.data.success) {
                    setGroup({...group, members: group.members.filter(m => m._id !== memberId)})
                    Swal.fire(
                        'Thành công!',
                        'Thành công',
                        'success'
                    )
                }
            }
        })
    }

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
                                                        <p className="mb-0">15 friends</p>
                                                    </Link>
                                                </div>
                                            </div>
                                            {
                                                group.yourRole === 'ADMIN' ?
                                                    <div className="iq-card-header-toolbar d-flex align-items-center">
                                                        <span
                                                            onClick={e => handleKickedBtn(user._id)}
                                                            className="btn btn-secondary mr-2 iq-bg-danger iq-bg-danger-hover">
                                                            Đuổi khỏi nhóm
                                                        </span>
                                                    </div> : null
                                            }
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
