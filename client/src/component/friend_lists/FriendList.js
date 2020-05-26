import React, { Fragment } from 'react'
import { useSelector } from 'react-redux';
import FriendItem from './FriendItem'
import bg from "../../images/page-img/profile-bg3.jpg"

const FriendList = () => {
    const friends = useSelector(state => state.contact.contacts);
    return (
        <Fragment>
            <div className="header-for-bg">
                <div className="background-header position-relative">
                <img src={bg} className="img-fluid w-100" alt="header-bg" />
                <div className="title-on-header">
                    <div className="data-block">
                    <h2>Danh sách bạn bè</h2>
                    </div>
                </div>
                </div>
            </div>
            <div id="content-page" className="content-page">
                <div className="container">
                    <div className="row">
                    {
                        friends.map((user,i) => ( 
                            <FriendItem key={i} user={user}/>
                        ))
                    }
                    </div>
                </div>
            </div>
            
        </Fragment>
    )
}

export default FriendList
