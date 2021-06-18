import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const GroupSuggestionItem = ({ group, user }) => {
    const [btnText, setBtnText] = useState('Tham gia nhóm')

    useEffect(() => {
        if (group.requestsJoin.includes(user._id)) {
            setBtnText('Hủy yêu cầu');
        }
    }, [user._id, group])

    const handleJoinGroupBtn = async () => {
        if (btnText === 'Tham gia nhóm') {
            const res = await axios.put('/group/join-group', { groupId: group._id });
            if (res.data.success) {
                setBtnText('Hủy yêu cầu');
            }
        } else {
            const res = await axios.put('/group/remove-request-join-group', { groupId: group._id });
            if (res.data.success) {
                setBtnText('Tham gia nhóm');
            }
        }
    }

    return (
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
                                <Link to={`profile/${m._id}`} key={i} className="iq-media">
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
                <button onClick={handleJoinGroupBtn} className="btn iq-bg-warning iq-bg-warning-hover d-block w-100">
                    {btnText}
                </button>
            </div>
        </div>

    )
}

export default GroupSuggestionItem
