import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Routes from './routing/Routes';
import { useSelector, useDispatch } from 'react-redux';
import { UPDATE_CONTACTS, UPDATE_MESSAGES, ADD_CONVERSATIONS, MOVE_CONVERSATIONS, DELETE_CONTACTS } from '../actions/types';
import { newGroupChatCreate } from '../actions/conversation';
import TopNavbar from './layout/top-navbar/TopNavbar';
import Sidebar from './layout/sidebar/Sidebar';
import RightSidebar from './layout/right-sidebar/RightSidebar';
import { CSSTransition } from 'react-transition-group'
import ChatVideoModal from './chat/chatVideoCall/ChatVideoModal';
import PageUnLogin from './pages/authentication/PageUnLogin';

// import ChatVideoModal from './chat/chatVideoCall/ChatVideoModal';

const AllComponents = () => {
    let auth = useSelector(state => state.auth.isAuthenticated);
    let socket = useSelector(state => state.master_data.socket);
    let user = useSelector(state => state.auth.user);
    const dispatch = useDispatch();
    useEffect(() => {
        if (socket && user) {
            socket.emit('check-status');

            socket.on('server-send-list-users-online', (res) => {
                dispatch({
                    type: 'GET_USERS_ONLINE',
                    payload: res
                });
            });

            socket.on('server-send-when-new-user-online', (res) => {
                dispatch({
                    type: 'ADD_USERS_ONLINE',
                    payload: res
                });
            });

            socket.on('server-send-when-new-user-offline', (res) => {
                dispatch({
                    type: 'DELETE_USER_ONLINE',
                    payload: res
                });
            });

            ////////////////////////////////
            socket.on('response-approve-request-contact-received', (res) => {
                dispatch({
                    type: UPDATE_CONTACTS,
                    payload: res.currentUser
                });
                dispatch({
                    type: 'DELETE_CONTACTS_SENT',
                    payload: res.currentUser._id
                });
                dispatch({
                    type: 'ADD_NOTIFICATIONS',
                    payload: res.notif
                });
            });

            socket.on('response-add-new-contact', (res) => {
                dispatch({
                    type: 'UPDATE_CONTACTS_RECEIVED',
                    payload: res.currentUser
                });
                dispatch({
                    type: 'ADD_NOTIFICATIONS',
                    payload: res.notif
                });
            });

            socket.on('response-remove-contact', (res) => {
                dispatch({
                    type: DELETE_CONTACTS,
                    payload: res
                });
                socket.emit('check-status');
            });

            socket.on('response-remove-request-contact', (res) => {
                dispatch({
                    type: 'DELETE_CONTACTS_RECEIVED',
                    payload: res
                });
            });

            socket.on('response-remove-request-contact-received', (res) => {
                dispatch({
                    type: 'DELETE_CONTACTS_SENT',
                    payload: res
                });
            });

            /////////////////////////////////


            /////////////////////////////////

            socket.on('response-chat-text-emoji', (res) => {
                if (res.currentUserId !== user._id) {
                    dispatch({
                        type: UPDATE_MESSAGES,
                        payload: {
                            idConversation: res.conversation._id,
                            payload: res.message
                        }
                    });
                    dispatch({
                        type: MOVE_CONVERSATIONS,
                        payload: res.conversation._id
                    });
                    dispatch({
                        type: 'UPDATE_MESSAGES_MESSDROP',
                        payload: {
                            idConversation: res.conversation._id,
                            payload: res.message
                        }
                    });
                    dispatch({
                        type: 'ADD_MESSDROP',
                        payload: res.conversation
                    });
                }
                dispatch({
                    type: ADD_CONVERSATIONS,
                    payload: res.conversation
                })
            })

            socket.on('response-chat-file', (res) => {
                if (res.currentUserId !== user._id) {
                    dispatch({
                        type: UPDATE_MESSAGES,
                        payload: {
                            idConversation: res.conversation._id,
                            payload: res.message
                        }
                    });
                    dispatch({
                        type: MOVE_CONVERSATIONS,
                        payload: res.conversation._id
                    });
                    dispatch({
                        type: 'UPDATE_MESSAGES_MESSDROP',
                        payload: {
                            idConversation: res.conversation._id,
                            payload: res.message
                        }
                    });
                    dispatch({
                        type: 'ADD_MESSDROP',
                        payload: res.conversation
                    });
                }
                dispatch({
                    type: ADD_CONVERSATIONS,
                    payload: res.conversation
                })
            })

            socket.on('response-new-group-created', (res) => {
                dispatch(newGroupChatCreate(res.groupChat));
            })

            socket.on("response-upReaction", res => {
                dispatch({
                    type: "DELETE_NOTIFICATIONS",
                    payload: res.notification._id
                })
                dispatch({
                    type: "ADD_NOTIFICATIONS",
                    payload: res.notification
                })
            })

            socket.on("response-upReaction-cmt", res => {
                dispatch({
                    type: "DELETE_NOTIFICATIONS",
                    payload: res.notification._id
                })
                dispatch({
                    type: "ADD_NOTIFICATIONS",
                    payload: res.notification
                })
            })
        }
    }, [socket, user, dispatch])
    return (
        <Router>
            <ChatVideoModal user={user}/>
            <CSSTransition in={auth} timeout={1000} classNames="fade">
                <TopNavbar />
            </CSSTransition>
            <CSSTransition in={auth} timeout={1000} classNames="fade">
                <Sidebar />
            </CSSTransition>
            <CSSTransition in={auth} timeout={1000} classNames="fade">
                <RightSidebar />
            </CSSTransition>
            <Switch>
                <Route component={Routes} />
            </Switch>
        </Router>
    )
}

export default AllComponents