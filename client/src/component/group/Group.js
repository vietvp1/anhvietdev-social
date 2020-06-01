import React, { Fragment, useState, useEffect } from 'react'
import axios from "axios"
import { Link } from 'react-router-dom'
import bg from "../../images/page-img/profile-bg7.jpg"
import CreateGroup from './CreateGroup';
import { bufferToBase64 } from '../../clientHelper/helperClient';

const Group = () => {
    const [mygroups, setMyGroups] = useState([]);
    useEffect(() => {
        let isSubscribed = true;
        axios.get('/group/get-group-managing').then(res => {
            if (isSubscribed) setMyGroups(g => g.concat(res.data.groupManaging))
        });
        axios.get('/group/get-group-joined').then(res => {
            if (isSubscribed) setMyGroups(g => g.concat(res.data.groupJoined))
        });
        return () => isSubscribed = false
    }, [])

    return (
        <Fragment>
            <div className="header-for-bg">
                <div className="background-header position-relative">
                    <img src={bg} className="img-fluid w-100 rounded rounded" alt="header-bg" />
                    <div className="title-on-header">
                        <CreateGroup />
                    </div>
                </div>
            </div>
            <div id="content-page" className="content-page">
                <div className="container">
                    <div className="row">
                        {
                            mygroups.map((group, i) =>
                                <div key={i} className="col-md-6 col-lg-4">
                                    <div className="iq-card">
                                        <div className="top-bg-image">
                                            <img src={bg} alt="group-bg" />
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
                                                                    src={`data:${m.avatar.contentType};base64,${bufferToBase64(m.avatar.data.data)}`}
                                                                    title={m.firstName + " " + m.lastName}
                                                                    alt={m.firstName + " " + m.lastName} />
                                                            </Link>
                                                        )
                                                    }

                                                </div>
                                            </div>
                                            <button type="submit" className="btn btn-primary d-block w-100">Xin vào nhóm</button>
                                        </div>
                                    </div>
                                </div>
                            )
                        }


                    </div>
                </div>
            </div>

        </Fragment>
    )
}

export default Group