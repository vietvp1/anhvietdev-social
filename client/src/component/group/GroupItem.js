import React from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2';
import axios from "axios"

const GroupItem = ({ group, admin, setGroupJoined }) => {

    const handleLeaveGroupBtn = () => {
        Swal.fire({
            title: 'Bạn có chắc muốn rời khỏi nhóm này không?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'OK'
        }).then(async (result) => {
            if (result.value) {
                const res = await axios.put('/group/leave-group', {groupId: group._id});
                if (res.data.success) {
                    setGroupJoined(listGroup =>  listGroup.filter(g => g._id !== group._id))
                    Swal.fire(
                        'Đã rời nhóm thành công!',
                        'Thành công',
                        'success'
                    )
                }
            }
        })
    }

    return (
        <div className="col-md-6 col-lg-4">
            <div className="iq-card">
                <div className="top-bg-image">
                    <img src={`${process.env.REACT_APP_UPLOADS_IMG}/${group.cover}`} alt="group-bg" />
                </div>
                <div className="iq-card-body text-center">
                    <div className="group-info">
                        <h4>
                            <Link to={`group/${group._id}`}>
                                {group.name}
                            </Link>
                        </h4>
                        <p>{group.members.length + group.admins.length} thành viên</p>
                    </div>
                    <div className="group-member mb-3">
                        <div className="iq-media-group">
                            {
                                group.members.map((m, i) =>
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
                    {
                        !admin ?
                            <button
                                onClick={handleLeaveGroupBtn}
                                className="btn iq-bg-warning iq-bg-warning-hover d-block w-100">
                                Rời khỏi nhóm
                            </button> :
                            <button className="btn iq-bg-success iq-bg-success-hover d-block w-100">
                                <Link to={`group/${group._id}`}>
                                    Vào quản lý nhóm
                                </Link>
                            </button>
                    }

                </div>
            </div>
        </div>

    )
}

export default GroupItem
