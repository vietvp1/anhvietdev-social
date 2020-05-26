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
                        <li onClick={e => chooseOption(8)} className={option === 8 ? "active" : null}>
                            <Link to="/profile-event" className="iq-waves-effect">
                                <i className="fal fa-calendar-week" /><span className="ml-2">Sự kiện</span>
                            </Link>
                        </li>
                        <li onClick={e => chooseOption(9)} className={option === 9 ? "active" : null}>
                            <Link to="/files" className="iq-waves-effect">
                                <i className="fal fa-folder-open" /><span className="ml-2">Files</span>
                            </Link>
                        </li>
                        <li onClick={e => chooseOption(10)} className={option === 10 ? "active" : null}>
                            <Link to="/friend-request" className="iq-waves-effect">
                                <i className="fal fa-anchor" /><span className="ml-2">Yêu cầu kết bạn</span>
                            </Link>
                        </li>
                        <li onClick={e => chooseOption(11)} className={option === 11 ? "active" : null}>
                            <Link to="/todo" className="iq-waves-effect">
                                <i className="fal fa-check-circle" /><span className="ml-2">Danh sách công việc</span>
                            </Link>
                        </li>
                        <li onClick={e => chooseOption(12)} className={option === 12 ? "active" : null}>
                            <Link to="/calendar" className="iq-waves-effect">
                                <i className="fal fa-calendar-alt" /><span className="ml-2">Lịch</span>
                            </Link>
                        </li>
                        <li onClick={e => chooseOption(13)} className={option === 13 ? "active" : null}>
                            <Link to="/birthday" className="iq-waves-effect">
                                <i className="fal fa-birthday-cake" /><span className="ml-2">Sinh nhật</span>
                            </Link>
                        </li>
                        <li onClick={e => chooseOption(14)} className={option === 14 ? "active" : null}>
                            <Link to="/weather" className="iq-waves-effect">
                                <i className="fal fa-clouds-sun" />
                                <span className="ml-2">Thời tiết</span>
                            </Link>
                        </li>
                        <li onClick={e => chooseOption(15)} className={option === 15 ? "active" : null}>
                            <Link to="/music" className="iq-waves-effect">
                                <i className="fal fa-play-circle" />
                                <span className="ml-2">Âm nhạc</span>
                            </Link>
                        </li>
                        <li onClick={e => chooseOption(16)} className={option === 16 ? "active" : null}>
                            <a href="#mailbox" className="iq-waves-effect collapsed" data-toggle="collapse">
                                <i className="fal fa-envelope" />
                                <span className="ml-2">Email</span>
                                <i className="fas fa-chevron-right iq-arrow-right" />
                            </a>

                            <ul id="mailbox" className="iq-submenu collapse">
                                <li><Link to="/email-compose"><i className="fal fa-pencil" />Email Compose</Link></li>
                            </ul>
                        </li>


                        <li onClick={e => chooseOption(17)} className={option === 17 ? "active" : null}>
                            <a href="#pages" className="iq-waves-effect collapsed" data-toggle="collapse" aria-expanded="false">
                                <i className="fal fa-pager" />
                                <span className="ml-2">Pages</span>
                                <i className="fas fa-chevron-right iq-arrow-right" />
                            </a>
                            <ul id="pages" className="iq-submenu collapse" data-parent="#iq-sidebar-toggle">
                                <li onClick={e => chooseOption()} >
                                    <a href="#authentication" className="iq-waves-effect collapsed" data-toggle="collapse" aria-expanded="false">
                                        <i className="fal fa-pager" />
                                        <span className="ml-2">Authentication</span>
                                        <i className="fas fa-chevron-right iq-arrow-right" />
                                    </a>
                                    <ul id="authentication" className="iq-submenu collapse" data-parent="#pages">
                                        <li onClick={e => chooseOption()} ><Link to="pages-recoverpw"><i className="ri-record-mail-line" />Đổi mật khẩu</Link></li>
                                        <li onClick={e => chooseOption()} ><Link to="pages-confirm-mail"><i className="ri-file-code-line" />Xác nhận email</Link></li>
                                        <li onClick={e => chooseOption()} ><Link to="pages-lock-screen"><i className="ri-lock-line" />Lock Screen</Link></li>
                                    </ul>
                                </li>
                                <li onClick={e => chooseOption()}>
                                    <a href="#extra-pages" className="iq-waves-effect collapsed" data-toggle="collapse" aria-expanded="false">
                                        <i className="ri-pantone-line" />
                                        <span className="ml-2">Extra Pages</span>
                                        <i className="fas fa-chevron-right iq-arrow-right" /></a>
                                    <ul id="extra-pages" className="iq-submenu collapse" data-parent="#pages">
                                        <li onClick={e => chooseOption()} ><Link to="pages-timeline"><i className="ri-map-pin-time-line" />Timeline</Link></li>
                                        <li onClick={e => chooseOption()} ><Link to="pages-invoice"><i className="ri-question-answer-line" />Invoice</Link></li>
                                        <li onClick={e => chooseOption()} ><Link to="blank-page"><i className="ri-invision-line" />Blank Page</Link></li>
                                        <li onClick={e => chooseOption()} ><Link to="pages-error"><i className="ri-error-warning-line" />Error 404</Link></li>
                                        <li onClick={e => chooseOption()} ><Link to="pages-error-500"><i className="ri-error-warning-line" />Error 500</Link></li>
                                        <li onClick={e => chooseOption()} ><Link to="pages-pricing"><i className="ri-price-tag-line" />Pricing</Link></li>
                                        <li onClick={e => chooseOption()} ><Link to="pages-pricing-one"><i className="ri-price-tag-2-line" />Pricing 1</Link></li>
                                        <li onClick={e => chooseOption()} ><Link to="pages-maintenance"><i className="ri-archive-line" />Maintenance</Link></li>
                                        <li onClick={e => chooseOption()} ><Link to="pages-comingsoon"><i className="ri-mastercard-line" />Coming Soon</Link></li>
                                        <li onClick={e => chooseOption()} ><Link to="pages-faq"><i className="ri-compasses-line" />Faq</Link></li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </nav>
                <div className="p-3" />
            </div>
        </div>
    ) : null
}

export default Sidebar
