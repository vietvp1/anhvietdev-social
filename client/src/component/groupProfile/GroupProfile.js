import React, { useState, useEffect } from 'react'
import axios from 'axios'
import GroupHeader from './group-header/GroupHeader';
import GroupTabing from './group-tabing/GroupTabing';
import Introduce from './Introduce';

const GroupProfile = ({ match }) => {
    const [group, setGroup] = useState(null);

    useEffect(() => {
        let isSubscribed = true;
        axios.get(`/group/${match.params.id}`).then(res => {
            if (isSubscribed) setGroup(res.data.group)
        });
        return () => isSubscribed = false
    }, [match.params.id])

    return group ? (
        <div id="content-page" className="content-page">
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        {
                            <GroupHeader group={group} setGroup={setGroup} />
                        }
                        {
                            group.members && group.yourRole ? <div className="iq-card">
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
                            </div> : null

                        }
                    </div>

                    {
                        group.members && group.yourRole ?
                            <div className="col-sm-12">
                                <GroupTabing group={group} setGroup={setGroup} />
                            </div> :
                            <div className="col-sm-12">
                                <Introduce group={group} />
                            </div>
                    }

                </div>
            </div>
        </div>
    ) : null
}

export default GroupProfile
