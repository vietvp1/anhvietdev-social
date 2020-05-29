import React, { Fragment, useState, useEffect } from 'react'
import ChatBox from '../../chatbox/ChatBox'
import { useSelector, useDispatch } from 'react-redux';
import { bufferToBase64 } from '../../../clientHelper/helperClient';

const RightSidebar = () => {
    const [groupsChat, setGroupsChat] = useState([]);
    const user = useSelector(state => state.auth.user);
    const usersOnline = useSelector(state => state.online.usersOnline);
    const conversations = useSelector(state => state.conversation.conversations);
    const toggle  = useSelector(state => state.master_data.right_sidebarOpen);
    const dispatch = useDispatch();

    useEffect(() => {
        setGroupsChat([]);
        conversations.forEach(conver => {
            if (conver.members) {
                setGroupsChat(g => {
                    return [...g, conver]
                })
            }
        })
    }, [conversations])

    const openConversation = (user) => {
        let checkExist = 0;
        conversations.forEach(conver => {
            if (conver.userChat && (conver.userChat._id === user._id)) {
                checkExist = 1;
                dispatch({
                    type: 'ADD_MESSDROP',
                    payload: conver
                });
                return;
            }
        })
        if (!checkExist) {
            let newConver = {
                userChat: {
                    _id: user._id,
                    avatar: user.avatar,
                    firstName: user.firstName,
                    lastName: user.lastName
                },
                messages: []
            }
            dispatch({
                type: 'ADD_MESSDROP',
                payload: newConver
            });
        }
    }

    const chatToAdmin = () => {
        let c = {
            userChat: {
                _id: "admin",
                avatar: "uploads/avatar/group-avatar-vietanhdev.png",
                firstName: "Admin",
                lastName: "Tran Viettttttttttttttttttttt"
            },
            messages: []
        }
        dispatch({
            type: 'ADD_MESSDROP',
            payload: c
        });
    }

    const openGroupChat = (conver) => {
        dispatch({
            type: 'ADD_MESSDROP',
            payload: conver
        });
    }

    const toggleSidebar = () => {
        console.log("vaooo");
        
        dispatch({ type: 'TOGGLE_RIGHT_SIDEBAR' });
      }

    return user ? (
        <Fragment>
            <div className={toggle? "right-sidebar-mini toggle-right-sidebar" : "right-sidebar-mini"}>
                <div className="right-sidebar-panel p-0">
                    <div className="iq-card shadow-none">
                        <div className="iq-card-body p-0">
                            <div className="media-height p-3">
                                {
                                    usersOnline.length > 0 && usersOnline.map((user, i) => (
                                        <div className="user-online" key={i} onClick={e => openConversation(user)}>
                                            <div className="media align-items-center mb-4">
                                                <div className="iq-profile-avatar status-online">
                                                    <img src={`data:${user.avatar.contentType};base64,${bufferToBase64(user.avatar.data.data)}`} className="rounded-circle avatar-50" alt="" />
                                                </div>
                                                <div className="media-body ml-3">
                                                    <h6 className="mb-0"><span>{user.firstName}&nbsp;{user.lastName}</span></h6>
                                                    <p className="mb-0">Đang trực tuyến</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }

                                {
                                    groupsChat.map((conver, i) => (
                                        <div className="user-online" key={i} onClick={e => openGroupChat(conver)}>
                                            <div className="media align-items-center mb-4">
                                                <div className="iq-profile-avatar status-online">
                                                    <img className="rounded-circle avatar-50" src={`${process.env.REACT_APP_API}/uploads/avatar/group-avatar-vietanhdev.png`} alt="" />
                                                </div>
                                                <div className="media-body ml-3">
                                                    <h6 className="mb-0"><span>{conver.name}</span></h6>
                                                    <p className="mb-0">Nhóm trò chuyện</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }

                                <div className="media align-items-center" onClick={chatToAdmin} >
                                    <div className="iq-profile-avatar status-online">
                                        <img className="rounded-circle avatar-50" src={`${process.env.REACT_APP_API}/uploads/avatar/adminViet.jpg`} alt="" />
                                    </div>
                                    <div className="media-body ml-3">
                                        <h6 className="mb-0 name-right-sidebar"><span>Admin Trần Việt</span></h6>
                                        <p className="mb-0">Admin</p>
                                    </div>
                                </div>
                            </div>
                            <div className="right-sidebar-toggle bg-primary mt-3" onClick={toggleSidebar}>
                                {
                                    toggle ? 
                                    <i className="fal fa-arrow-right side-right-icon"><span className="ml-3 d-inline-block">Close Menu</span></i> :
                                    <i className="fal fa-arrow-left side-left-icon" />
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <ChatBox />
            </div>
        </Fragment>
    ) : null
}

export default RightSidebar