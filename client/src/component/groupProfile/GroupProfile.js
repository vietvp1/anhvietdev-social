import React, { useState, useEffect } from 'react'
import axios from 'axios'
import GroupHeader from './group-header/GroupHeader';
import GroupTabing from './group-tabing/GroupTabing';

const GroupProfile = ({match}) => {
    const [group, setGroup] = useState(null);

    useEffect(() => {
        axios.get(`/group/${match.params.id}`).then(res => setGroup(res.data.group));
    },[match.params.id])

    return (
        <div id="content-page" className="content-page">
        <div className="container">
            <div className="row">
                <div className="col-sm-12">
                    {
                        group ? <GroupHeader group={group} setGroup={setGroup}/> : null
                    }
                    <div className="iq-card">
                        <div className="iq-card-body p-0">
                            <div className="user-tabing">
                                <ul className="nav nav-pills d-flex align-items-center justify-content-center profile-feed-items p-0 m-0">
                                    <li className="col-sm-3 p-0">
                                        <a className="nav-link active" data-toggle="pill" href="#discussion">Thảo luận</a>
                                    </li>
                                    <li className="col-sm-3 p-0">
                                        <a className="nav-link" data-toggle="pill" href="#about-group">Giới thiệu</a>
                                    </li>
                                    <li className="col-sm-3 p-0">
                                        <a className="nav-link" data-toggle="pill" href="#members">Thành viên</a>
                                    </li>
                                    <li className="col-sm-3 p-0">
                                        <a className="nav-link" data-toggle="pill" href="#photos-group">Hình ảnh nhóm</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-12">
                    {
                        group ? <GroupTabing group={group} setGroup={setGroup} /> : null
                    }
                </div>
            </div>
        </div>
    </div>

    )
}

export default GroupProfile
