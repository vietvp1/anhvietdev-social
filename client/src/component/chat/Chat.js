import React, { useState, useEffect } from 'react'
import ChatLeft from './left/ChatLeft'
import ChatRight from './right/ChatRight'
import { useSelector } from 'react-redux';
import axios from "axios";
import { CSSTransition } from 'react-transition-group'

const Chat = ({ match }) => {
    const idChat = match.params.id;
    const conversations = useSelector(state => state.conversation.conversations);
    const [showRight, setShowRight] = useState(null);
    const [newConver, setNewConver] = useState(null);

    useEffect(() => {
        let flag = 1;
        if (idChat) {
            if (conversations.length > 0) {
                conversations.forEach(a => {
                    if ((!a.members && a.userChat._id === idChat) || (a.members && (a._id === idChat))) {
                        setShowRight(a._id);
                        setNewConver(null)
                        return flag = 0;;
                    }
                })
            }
            if (flag === 1) {
                axios.get(`/get-user/${idChat}`).then(res => {
                    setNewConver({
                        userChat: res.data.user,
                        messages: [],
                        isShow: false
                    })
                })
            }
        }
        return () => flag = 0;
    }, [conversations, idChat])

    return (
        <CSSTransition in appear timeout={1000} classNames="fade">
            <div id="content-page" className="content-page">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="iq-card">
                                <div className="iq-card-body chat-page p-0">
                                    <div className="chat-data-block">
                                        <div className="row frame-chat">
                                            <ChatLeft showRight={showRight} conversations={conversations} />
                                            <div className="col-lg-9 chat-data p-0 chat-data-right">
                                                <div className="tab-content">
                                                    {
                                                        newConver ?
                                                            <ChatRight c={newConver} />
                                                            :
                                                            conversations.map((c, i) =>
                                                                <ChatRight key={i} i={i} c={c} showRight={showRight} />
                                                            )
                                                    }

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </CSSTransition>
    )
}

export default Chat