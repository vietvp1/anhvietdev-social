import React, { Fragment, useState, useEffect } from 'react'
import axios from "axios"
import bg from "../../images/page-img/profile-bg7.jpg"
import CreateGroup from './CreateGroup';
import GroupItem from './GroupItem';
import GroupSuggestionItem from './GroupSuggestionItem';
import { useSelector } from 'react-redux';
import PageLoader from '../layout/spinner/PageLoader';

const Group = () => {
    let user = useSelector(state => state.auth.user);
    const [groupManaging, setGroupManaging] = useState([]);
    const [groupJoined, setGroupJoined] = useState([]);
    const [groupSuggestions, serGroupSuggestions] = useState([]);

    useEffect(() => {
        let isSubscribed = true;
        axios.get('/group/get-group-managing').then(res => {
            if (isSubscribed) setGroupManaging(res.data.groupManaging)
        });
        axios.get('/group/get-group-joined').then(res => {
            if (isSubscribed) setGroupJoined(res.data.groupJoined)
        });
        axios.get('/group/get-group-suggestions').then(res => {
            if (isSubscribed) serGroupSuggestions(res.data.groupSuggestions)
        });
        return () => isSubscribed = false
    }, [])

    return user ? (
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
                    {groupManaging.length > 0 ? <div className="font-size-20 mb-3">Nhóm bạn đang quản lý</div> : null}
                    <div className="row">
                        {
                            groupManaging.map((group, i) =>
                                <GroupItem group={group} key={i} admin={1}/>
                            )
                        }
                    </div>

                    {groupJoined.length > 0 ? <div className="font-size-20 mb-3 mt-4">Nhóm bạn đã tham gia</div> : null}
                    <div className="row">
                        {
                            groupJoined.map((group, i) =>
                                <GroupItem group={group} key={i} setGroupJoined={setGroupJoined}/>
                            )
                        }
                    </div>

                    {groupSuggestions.length > 0 ? <div className="font-size-20 mb-3 mt-4">Nhóm gợi ý</div> : null}
                    <div className="row">
                        {
                            groupSuggestions.map((group, i) =>
                                <GroupSuggestionItem group={group} key={i} user={user} />
                            )
                        }
                    </div>
                </div>
            </div>

        </Fragment>
    ) : <PageLoader />
}

export default Group