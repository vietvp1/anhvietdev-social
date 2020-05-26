import React, { useState, Fragment, useEffect } from 'react'
import moment from 'moment';
import 'moment/locale/vi';
import ReplyComment from './ReplyComment';
import { useSelector } from 'react-redux';
import CommentOptions from './CommentOptions';
import CommentReaction from './CommentReaction';
import { Link } from 'react-router-dom';
import ReactAction from '../home/newsfeed/ReactAction';

const SingleComment = ({ comment, hideComment, post, OpenRep, setOpenRep}) => {
    let user = useSelector(state => state.auth.user);
    let socket = useSelector(state => state.master_data.socket);
    const [data, setData] = useState({
        like: 0,
        love: 0,
        haha: 0,
        think: 0,
        wow: 0,
        sad: 0,
        angry: 0,
    })
    const [reactAction, setReactAction] = useState(null);
    const [OpenReply, setOpenReply] = useState(false);

    useEffect(() => {
        let cLike = 0, cLove = 0, cHaha = 0, cThink = 0, cWow = 0, cSad = 0, cAngry = 0;
        user && comment.reactions.forEach(react => {
            switch (react.typeReact) {
                case 'LIKE':
                    cLike++;
                    break;
                case 'LOVE':
                    cLove++;
                    break;
                case 'HAHA':
                    cHaha++;
                    break;
                case 'THINK':
                    cThink++;
                    break;
                case 'WOW':
                    cWow++;
                    break;
                case 'SAD':
                    cSad++;
                    break;
                case 'ANGRY':
                    cAngry++;
                    break;
                default:
                    break;
            }
            if (react.user._id === user._id) setReactAction(react.typeReact);
        })
        setData(d => ({ ...d, like: cLike }));
        setData(d => ({ ...d, love: cLove }));
        setData(d => ({ ...d, haha: cHaha }));
        setData(d => ({ ...d, think: cThink }));
        setData(d => ({ ...d, wow: cWow }));
        setData(d => ({ ...d, sad: cSad }));
        setData(d => ({ ...d, angry: cAngry }));

        if (socket) {
            socket.on("response-upReaction", res => {
                //setLikes(likes => (likes+1));
            })
        }
    }, [comment, user, socket])
    
    const openReply = () => {
        if (setOpenRep) {
            setOpenRep(!OpenRep);
        }else setOpenReply(!OpenReply)
    }

    return (
        <Fragment>
            <div className="post-comments-single">
                <div className="post-comment-avatar">
                    <Link to={`/profile/${comment.writer._id}`}>
                        <img src={`${process.env.REACT_APP_API}/${comment.writer.avatar}`} alt="userimg" className="avatar-35 rounded-circle img-fluid" />
                    </Link>
                </div>
                <div className="post-comment-text">
                    <div className="post-comment-text-inner">
                        <h6> {comment.writer.firstName}&nbsp;{comment.writer.lastName}</h6>
                        <p> {comment.content} </p>
                        <CommentReaction data={data} comment={comment}/>
                    </div>
                    <div className="uk-text-small">
                        <span className="mr-3">
                            <ReactAction
                                comment={comment}
                                post={post}
                                setReactAction={setReactAction}
                                reactAction={reactAction}
                                data={data}
                                setData={setData}
                            />
                        </span>
                        <span className="mr-3" onClick={openReply}> Trả lời </span>
                        <span className="time-cmt">{moment(comment.createdAt).locale('vi').startOf("seconds").fromNow()} </span>
                    </div>
                </div>
                <CommentOptions comment={comment} hideComment={hideComment}/>
            </div>
            <ReplyComment 
                comment={comment} 
                user={user} post={post} 
                OpenReply={OpenReply} 
                setOpenReply={setOpenReply}
                setReactAction={setReactAction}
                reactAction={reactAction}
                data={data}
                setData={setData}/>
        </Fragment>
    )
}

export default SingleComment
