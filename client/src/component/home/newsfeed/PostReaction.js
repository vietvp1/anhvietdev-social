import React, { Fragment, useState, useEffect } from 'react'
import { useSelector } from "react-redux"
import ReactAction from './ReactAction'

const PostReaction = ({ post, userId }) => {
    const [data, setData] = useState({
        like: 0,
        love: 0,
        haha: 0,
        think: 0,
        wow: 0,
        sad: 0,
        angry: 0,
    })
    const [reactAction, setReactAction] = useState(null)
    const [topReact, setTopReact] = useState([]);
    let socket = useSelector(state => state.master_data.socket);
    const { like, love, haha, think, wow, sad, angry } = data;
    useEffect(() => {
        let cLike = 0, cLove = 0, cHaha = 0, cThink = 0, cWow = 0, cSad = 0, cAngry = 0;
        post.reactions.forEach(react => {
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
            if (react.user._id === userId) setReactAction(react.typeReact);
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
    }, [post, userId, socket])

    useEffect(() => {
        let arr = [{like}, {love}, {haha}, {think}, {wow}, {sad}, {angry}].sort((a,b) => b[Object.keys(b)] - a[Object.keys(a)]);
        setTopReact([arr[0], arr[1], arr[2]]);
    },[like, love, haha, think, wow, sad, angry]);
    
    return (
        <Fragment>
            <div className="post-state-details">
                <div className="total-like-block ml-2 mr-3">
                    <div className="dropdown">
                        <span className="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" role="button">
                            <div className="total-like-img">
                                {
                                    topReact.map((r,i) => (
                                        Object.values(r) > 0 ? 
                                        <img key={i} src={require(`../../../images/icon/${Object.keys(r)}.png`)} className="avatar-30" alt="" /> : null
                                    ))
                                }
                                {(like + love + haha + think + wow + sad + angry)>0? <p>&nbsp;{like + love + haha + think + wow + sad + angry}</p> : null } 
                            </div>
                        </span>
                        <div className="dropdown-menu total-like-img-dropdown">
                            <ul className="nav nav-pills d-flex p-0 m-0">
                                <li className="col-sm p-0">
                                    <a className="nav-link active" data-toggle="pill"  href={`#like_${post._id}`}>
                                        <img src={require('../../../images/icon/like.png')} className="img-reaction" alt="" />
                                        <p>&nbsp;{like}</p>
                                    </a>
                                </li>
                                <li className="col-sm p-0">
                                    <a className="nav-link" data-toggle="pill" href={`#love_${post._id}`}>
                                        <img src={require('../../../images/icon/love.png')} className="img-reaction" alt="" />
                                        <p>&nbsp;{love}</p>
                                    </a>
                                </li>
                                <li className="col-sm p-0">
                                    <a className="nav-link" data-toggle="pill" href={`#haha_${post._id}`}>
                                        <img src={require('../../../images/icon/haha.png')} className="img-reaction" alt="" />
                                        <p>&nbsp;{haha}</p>
                                    </a>
                                </li>
                                <li className="col-sm p-0">
                                    <a className="nav-link" data-toggle="pill" href={`#think_${post._id}`}>
                                        <img src={require('../../../images/icon/think.png')} className="img-reaction" alt="" />
                                        <p>&nbsp;{think}</p>
                                    </a>
                                </li>
                                <li className="col-sm p-0 dropdown">
                                    <div className="dropdown-toggle more-icon-btn" data-toggle="dropdown">
                                        Khác <i className="fa fa-caret-down"></i>
                                    </div>
                                    <div className="dropdown-menu">
                                        <a className="nav-link more-icon" data-toggle="pill" href={`#wow_${post._id}`}>
                                            <img src={require('../../../images/icon/wow.png')} className="img-reaction" alt="" />
                                            <p>&nbsp;{wow}</p>
                                        </a>
                                        <a className="nav-link more-icon" data-toggle="pill" href={`#sad_${post._id}`}>
                                            <img src={require('../../../images/icon/sad.png')} className="img-reaction" alt="" />
                                            <p>&nbsp;{sad}</p>
                                        </a>
                                        <a className="nav-link more-icon" data-toggle="pill" href={`#angry_${post._id}`}>
                                            <img src={require('../../../images/icon/angry.png')} className="img-reaction" alt="" />
                                            <p>&nbsp;{angry}</p>
                                        </a>
                                    </div>
                                </li>
                            </ul>
                            <div className="tab-content">
                                <div className="tab-pane fade active show" id={`like_${post._id}`} role="tabpanel">
                                    <div className="dropdown-item">Max Emum</div>
                                    <div className="dropdown-item">Bill Yerds</div>
                                    <div className="dropdown-item">Other</div>
                                </div>
                                <div className="tab-pane fade" id={`love_${post._id}`} role="tabpanel">
                                    <div className="dropdown-item">Bill Yerds</div>
                                    <div className="dropdown-item">Other</div>
                                </div>
                                <div className="tab-pane fade" id={`haha_${post._id}`} role="tabpanel">
                                    <div className="dropdown-item">Viet saker</div>
                                </div>
                                <div className="tab-pane fade" id={`think_${post._id}`} role="tabpanel">
                                    <div className="dropdown-item">Anh ml</div>
                                </div>
                                <div className="tab-pane fade" id={`wow_${post._id}`} role="tabpanel">
                                    <div className="dropdown-item">hooho</div>
                                </div>
                                <div className="tab-pane fade" id={`sad_${post._id}`} role="tabpanel">
                                    <div className="dropdown-item">haha</div>
                                </div>
                                <div className="tab-pane fade" id={`angry_${post._id}`} role="tabpanel">
                                    <div className="dropdown-item">Other</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <p><img src={require('../../../images/icon/comment.png')} className="img-reaction" alt="" /> 24 Bình luận</p>
            </div>
            <hr />
            <div className="post-state">
                <div className="post-state-btns">
                    <div className="d-flex align-items-center">
                        <ReactAction
                            post={post}
                            setReactAction={setReactAction}
                            reactAction={reactAction}
                            data={data}
                            setData={setData} />
                    </div>
                </div>

                <div className="post-state-btns"> <i className="uil-heart" />
                    <div className="total-comment-block">
                        <div className="dropdown">
                            <span className="dropdown-toggle" data-toggle="dropdown" role="button">
                                <img src={require('../../../images/icon/comment.png')} className="img-reaction" alt="" /> Bình luận
                            </span>
                            <div className="dropdown-menu">
                                <a className="dropdown-item" href="/">Max Emum</a>
                                <a className="dropdown-item" href="/">Bill Yerds</a>
                                <a className="dropdown-item" href="/">Other</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="post-state-btns">
                    <img src={require('../../../images/icon/share.png')} className="img-reaction" alt="" />&nbsp;193 Chia sẻ
                </div>
            </div>
        </Fragment>
    )
}

export default PostReaction