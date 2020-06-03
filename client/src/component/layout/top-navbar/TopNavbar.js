import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import FriendRequest from './FriendRequest'
import Notification from './Notification'
import ChatDrop from './ChatDrop'
import Control from './Control'
import Search from './Search'
import logo from '../../../images/logochuan.png'

const TopNavbar = () => {
    const user = useSelector(state => state.auth.user);
    const dispatch = useDispatch()

    const toggleSidebar = () => {
        dispatch({ type: 'TOGGLE_SIDEBAR' });
    }

    return user ? (
        <div className="iq-top-navbar">
            <div className="iq-navbar-custom">
                <nav className="navbar navbar-expand-lg navbar-light p-0">
                    <div className="iq-navbar-logo d-flex justify-content-between">
                        <Link to='/'>
                            <img src={logo} className="img-fluid" alt="" />
                        </Link>
                        <div className="iq-menu-bt align-self-center">
                            <div className="wrapper-menu">
                                <div className="main-circle" onClick={toggleSidebar} ><i className="fal fa-bars" /></div>
                            </div>
                        </div>
                    </div>
                    <Search />
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-label="Toggle navigation">
                        <i className="fal fa-bars" />
                    </button>

                    <div className="navbar-collapse collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ml-auto navbar-list">
                            <li>
                                <Link to={`/profile/${user._id}`} className="iq-waves-effect d-flex align-items-center">
                                    <img src={`${process.env.REACT_APP_UPLOADS_IMG}/${user.avatar}`} className="img-fluid rounded-circle mr-3" alt="user" />
                                    <div className="caption">
                                        <h6 className="mb-0 line-height">{user.firstName} {user.lastName}</h6>
                                    </div>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <span className="iq-waves-effect" >
                                    <Link to="/">
                                        <i className="fal fa-home"></i>
                                    </Link>
                                </span>
                            </li>
                            <FriendRequest />
                            <Notification user={user} />
                            <ChatDrop userId={user._id} />
                        </ul>
                        <ul className="navbar-list">
                            <Control user={user} />
                        </ul>
                    </div>
                </nav>
            </div>
        </div>
    ) : null
}

export default TopNavbar
