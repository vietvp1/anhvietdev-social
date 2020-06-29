import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import GroupConver from './GroupConver';
import axios from 'axios'


const GroupHeader = ({ group, setGroup }) => {
    const userauth = useSelector(state => state.auth.user);
    const [btnText, setBtnText] = useState('Tham gia nhóm')

    useEffect(() => {
        if (userauth && group.joined) {
            setBtnText('Hủy yêu cầu');
        }
    }, [userauth, group])

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

    return userauth ? (
        <div className="iq-card">
            <div className="iq-card-body profile-page p-0">
                <div className="profile-header">
                    <div className="cover-container">
                        <GroupConver group={group} userauth={userauth} setGroup={setGroup} />
                    </div>
                    <div className="profile-info p-4 d-flex align-items-center justify-content-between position-relative">
                        <div className="social-links">
                            <div className="profile-detail">
                                <h3>
                                    <strong className="d-link">
                                        {group.name}
                                    </strong>
                                </h3>
                                <h5>
                                    <i className="fal fa-lock"></i>
                                    {
                                        group.privacy === 1 ?
                                            <span className="ml-2">Nhóm riêng tư</span> :
                                            <span className="ml-2"> Nhóm bí mật</span>
                                    }
                                </h5>
                            </div>
                        </div>

                        {
                            !group.yourRole ?
                                <div
                                    onClick={handleJoinGroupBtn}
                                    className="btn iq-bg-warning iq-bg-warning-hover"
                                >
                                    {btnText}
                                </div> : null
                        }

                        <div className="social-info">
                            <ul className="social-data-block d-flex align-items-center justify-content-between list-inline p-0 m-0">
                                <li className="text-center pl-3">
                                    <h6>Số bài viết</h6>
                                    <p className="mb-0">12</p>
                                </li>
                                <li className="text-center pl-3">
                                    <h6>Số thành viên</h6>
                                    <p className="mb-0">206</p>
                                </li>
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    ) : null
}

export default GroupHeader
