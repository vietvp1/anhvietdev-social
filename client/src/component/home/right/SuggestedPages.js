import React, { useState, useEffect } from 'react'
import axios from 'axios'
import GroupSuggestionItem from '../../group/GroupSuggestionItem';
import { useSelector } from 'react-redux';

const SuggestedPages = () => {
    let user = useSelector(state => state.auth.user);
    const [groupSuggestions, serGroupSuggestions] = useState([]);
    useEffect(() => {
        let isSubscribed = true;
        axios.get('/group/get-group-suggestions').then(res => {
            if (isSubscribed) serGroupSuggestions(res.data.groupSuggestions)
        });
        return () => isSubscribed = false
    }, [])
    

    return user ? (
        <div className="iq-card">
            <div className="iq-card-header d-flex justify-content-between">
                <div className="iq-header-title">
                    <h4 className="card-title">Nhóm được đề xuất</h4>
                </div>
                <div className="iq-card-header-toolbar d-flex align-items-center">
                    <div className="dropdown">
                        <span className="dropdown-toggle" id="dropdownMenuButton01" data-toggle="dropdown" aria-expanded="false" role="button">
                            <i className="far fa-ellipsis-h" />
                        </span>
                        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton01" style={{}}>
                            <a className="dropdown-item" href="/"><i className="ri-eye-fill mr-2" />Xem nhóm</a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="iq-card-body">
                {
                    groupSuggestions.map((group, i) =>
                        <GroupSuggestionItem key={i} group={group} user={user} />
                    )
                }
            </div>
        </div>
    ) : null
}

export default SuggestedPages
