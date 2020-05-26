import React, { useState, useEffect } from 'react';
import FriendItem from './FriendItem';
import axios from 'axios';

const AllFriends = ({user}) => {
    const [list, setList] = useState([]);
    useEffect(() => {
        let isSubscribed = true;
         axios.get(`/contact/get-contacts/${user._id}`).then(res => {
            if(isSubscribed) setList(res.data)
        });
        return () => isSubscribed = false
    },[user])
    return(
        <div className="tab-pane fade active show" id="all-friends" role="tabpanel">
            <div className="iq-card-body p-0">
            <div className="row">
                {
                    list.map((user,i) => ( 
                        <FriendItem key={i} user={user}/>
                    ))
                }
            </div>
            </div>
        </div>                   
    )
}

export default AllFriends
