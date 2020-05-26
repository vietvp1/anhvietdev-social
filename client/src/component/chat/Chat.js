import React, { Fragment, useState, useEffect } from 'react'
import ChatLeft from './left/ChatLeft'
import ChatRight from './right/ChatRight'
import { useSelector } from 'react-redux';
import axios from "axios";

const Chat = ({match}) => {
    const idChat = match.params.id;
    const conversations = useSelector(state => state.conversation.conversations);
    const [showRight, setShowRight] = useState(null);
    const [newConver, setNewConver] = useState(null);

    useEffect(() => {
        let flag = 1;
        if (idChat) {
            if (conversations.length > 0) {
                conversations.forEach( a =>{
                    if ((!a.members && a.userChat._id === idChat) || (a.members && (a._id === idChat)) ){ 
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
        <Fragment>
            <div id="content-page" className="content-page">
                <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                    <div className="iq-card">
                        <div className="iq-card-body chat-page p-0">
                        <div className="chat-data-block">
                            <div className="row">
                                <ChatLeft showRight={showRight} conversations={conversations} />
                                <div className="col-lg-9 chat-data p-0 chat-data-right">
                                    <div className="tab-content">
                                        {/* <div className="tab-pane fade active show" id="default-block" role="tabpanel">
                                            <div className="chat-start">
                                            <span className="iq-start-icon text-primary"><i className="ri-message-3-line" /></span>
                                            <button id="chat-start" className="btn bg-white mt-3">Start
                                                Conversation!</button>
                                            </div>
                                        </div> */}
                                        {
                                            newConver?
                                                <ChatRight c={newConver} />
                                            :
                                            conversations.map((c,i) => 
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

        </Fragment>
    )
}

export default Chat