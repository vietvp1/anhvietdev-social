import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Sidebar = () => {
    const user = useSelector(state => state.auth.user);
    const toggle = useSelector(state => state.master_data.sidebarOpen);
    const [option, setOption] = useState(0);

    const chooseOption = (option) => setOption(option);

    return user ? (
        <div className={toggle ? "iq-sidebar toggle-iq-sidebar" : "iq-sidebar"} >
            <div id="sidebar-scrollbar">
                <nav className="iq-sidebar-menu">
                    <ul id="iq-sidebar-toggle" className="iq-menu">
                        <li onClick={e => chooseOption(0)} className={option === 0 ? "active" : null}>
                            <Link to='/' className="iq-waves-effect">
                                <i className="fal fa-newspaper" /><span className="ml-2">Bảng tin</span>
                            </Link>
                        </li>
                        <li onClick={e => chooseOption(1)} className={option === 1 ? "active" : null}>
                            <Link to={`/profile/${user._id}`} className="iq-waves-effect">
                                <i className="fal fa-user" /><span className="ml-2">Trang cá nhân</span>
                            </Link>
                        </li>
                        <li onClick={e => chooseOption(2)} className={option === 2 ? "active" : null}>
                            <Link to="/chat" className="iq-waves-effect">
                                <i className="fab fa-rocketchat" /><span className="ml-2">Chat</span>
                            </Link>
                        </li>
                        <li onClick={e => chooseOption(3)} className={option === 3 ? "active" : null}>
                            <Link to="/friend-list" className="iq-waves-effect">
                                <i className="fal fa-user-friends" /><span className="ml-2">Danh sách bạn bè</span>
                            </Link>
                        </li>
                        <li onClick={e => chooseOption(4)} className={option === 4 ? "active" : null}>
                            <Link to="/group" className="iq-waves-effect">
                                <i className="fal fa-users" /><span className="ml-2">Nhóm</span>
                            </Link>
                        </li>
                        <li onClick={e => chooseOption(5)} className={option === 5 ? "active" : null}>
                            <Link to="/notification" className="iq-waves-effect">
                                <i className="fal fa-bells" /><span className="ml-2">Thông báo</span>
                            </Link>
                        </li>
                        <li onClick={e => chooseOption(6)} className={option === 6 ? "active" : null}>
                            <Link to="/profile-images" className="iq-waves-effect">
                                <i className="fal fa-images" /><span className="ml-2">Hình ảnh</span>
                            </Link>
                        </li>
                        <li onClick={e => chooseOption(7)} className={option === 7 ? "active" : null}>
                            <Link to="/profile-video" className="iq-waves-effect">
                                <i className="fal fa-tv-retro" /><span className="ml-2">Video</span>
                            </Link>
                        </li>
                        <li onClick={e => chooseOption(10)} className={option === 10 ? "active" : null}>
                            <Link to="/friend-request" className="iq-waves-effect">
                                <i className="fal fa-anchor" /><span className="ml-2">Yêu cầu kết bạn</span>
                            </Link>
                        </li>
                        <li onClick={e => chooseOption(12)} className={option === 12 ? "active" : null}>
                            <Link to="/calendar" className="iq-waves-effect">
                                <i className="fal fa-calendar-alt" /><span className="ml-2">Lịch</span>
                            </Link>
                        </li>
                        <li onClick={e => chooseOption(14)} className={option === 14 ? "active" : null}>
                            <Link to="/weather" className="iq-waves-effect">
                                <i className="fal fa-clouds-sun" />
                                <span className="ml-2">Thời tiết</span>
                            </Link>
                        </li>
                    </ul>
                </nav>
                <div className="p-3" />
            </div>
        </div>
    ) : null
}

export default Sidebar
