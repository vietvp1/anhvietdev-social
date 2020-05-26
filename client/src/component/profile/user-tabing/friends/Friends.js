import React from 'react'
import AllFriends from './all-friends/AllFriends'
import RecentlyAdd from './recently-add/RecentlyAdd'
import CloseFriends from './closefriends/CloseFriends'
import HomeTown from './home-town/HomeTown'
import Following from './following/Following'
import { useSelector } from 'react-redux';
import RequestSent from './request/RequestSent'

const Friends = ({user}) => {
    const userauth = useSelector(state => state.auth.user)
    return userauth? (
        <div className="tab-pane fade" id="friends" role="tabpanel">
            <div className="iq-card">
                <div className="iq-card-body">
                    <h2>Friends</h2>
                    {
                        userauth._id === user._id?
                        <div className="friend-list-tab mt-2">
                            <ul className="nav nav-pills d-flex align-items-center justify-content-left friend-list-items p-0 mb-2">
                                <li>
                                    <a className="nav-link active" data-toggle="pill" href="#all-friends">Tất cả bạn bè</a>
                                </li>
                                <li>
                                    <a className="nav-link" data-toggle="pill" href="#recently-add">Mới thêm gần đây</a>
                                </li>
                                <li>
                                    <a className="nav-link" data-toggle="pill" href="#closefriends">Bạn thân</a>
                                </li>
                                <li>
                                    <a className="nav-link" data-toggle="pill" href="#home">Cùng nơi sinh</a>
                                </li>
                                <li>
                                    <a className="nav-link" data-toggle="pill" href="#following">Theo dõi</a>
                                </li>
                                <li>
                                    <a className="nav-link" data-toggle="pill" href="#request-sent">Đã gửi yêu cầu</a>
                                </li>
                            </ul>
                            <div className="tab-content">
                                <AllFriends user={user} />
                                <RecentlyAdd/>
                                <CloseFriends/>
                                <HomeTown/>
                                <Following/>
                                <RequestSent/>
                            </div>
                        </div> :
                        
                        <div className="friend-list-tab mt-2">
                            <ul className="nav nav-pills d-flex align-items-center justify-content-left friend-list-items p-0 mb-2">
                                <li>
                                    <a className="nav-link active" data-toggle="pill" href="#all-friends">All Friends</a>
                                </li>
                            </ul>
                            <div className="tab-content">
                                <AllFriends user={user} />
                            </div>
                        </div>
                    }
                    
                </div>
            </div> 
        </div>   
    ): null
}

export default Friends
