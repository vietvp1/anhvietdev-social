import React, { Fragment, useEffect, useState } from 'react'

const CommentReaction = ({data, comment}) => {
    const [topReact, setTopReact] = useState([]);
    const { like, love, haha, think, wow, sad, angry } = data;
    useEffect(() => {
        let arr = [{like}, {love}, {haha}, {think}, {wow}, {sad}, {angry}].sort((a,b) => b[Object.keys(b)] - a[Object.keys(a)]);
        setTopReact([arr[0], arr[1], arr[2]]);
    },[like, love, haha, think, wow, sad, angry]);
    return (
        <Fragment>
            <div className="total-like-block react-cmt">
                <div className="dropdown">
                    <span className="dropdown-toggle" data-toggle="dropdown">
                        <div className="total-like-img">
                            {
                                topReact.map((r,i) => (
                                    Object.values(r) > 0 ? 
                                    <img key={i} src={require(`../../images/icon/${Object.keys(r)}.png`)} className="avatar-20" alt="" /> : null
                                ))
                            }
                            {(like + love + haha + think + wow + sad + angry)>0? <p>&nbsp;{like + love + haha + think + wow + sad + angry}</p> : null } 
                        </div>
                    </span>
                    <div className="dropdown-menu total-like-img-dropdown">
                        <ul className="nav nav-pills d-flex p-0 m-0">
                            <li className="col-sm p-0">
                                <a className="nav-link active" data-toggle="pill" href={`#like_${comment._id}`}>
                                    <img src={require('../../images/icon/like.png')} className="img-reaction" alt="" />
                                    <p>&nbsp;{like}</p>
                                </a>
                            </li>
                            <li className="col-sm p-0">
                                <a className="nav-link" data-toggle="pill" href={`#love_${comment._id}`}>
                                    <img src={require('../../images/icon/love.png')} className="img-reaction" alt="" />
                                    <p>&nbsp;{love}</p>
                                </a>
                            </li>
                            <li className="col-sm p-0">
                                <a className="nav-link" data-toggle="pill" href={`#haha_${comment._id}`}>
                                    <img src={require('../../images/icon/haha.png')} className="img-reaction" alt="" />
                                    <p>&nbsp;{haha}</p>
                                </a>
                            </li>
                            <li className="col-sm p-0">
                                <a className="nav-link" data-toggle="pill" href={`#think_${comment._id}`}>
                                    <img src={require('../../images/icon/think.png')} className="img-reaction" alt="" />
                                    <p>&nbsp;{think}</p>
                                </a>
                            </li>
                            <li className="col-sm p-0 dropdown">
                                <div className="dropdown-toggle more-icon-btn" data-toggle="dropdown">
                                    Khác <i className="fa fa-caret-down"></i>
                                </div>
                                <div className="dropdown-menu">
                                    <a className="nav-link more-icon" data-toggle="pill" href={`#wow_${comment._id}`}>
                                        <img src={require('../../images/icon/wow.png')} className="img-reaction" alt="" />
                                        <p>&nbsp;{wow}</p>
                                    </a>
                                    <a className="nav-link more-icon" data-toggle="pill" href={`#sad_${comment._id}`}>
                                        <img src={require('../../images/icon/sad.png')} className="img-reaction" alt="" />
                                        <p>&nbsp;{sad}</p>
                                    </a>
                                    <a className="nav-link more-icon" data-toggle="pill" href={`#angry_${comment._id}`}>
                                        <img src={require('../../images/icon/angry.png')} className="img-reaction" alt="" />
                                        <p>&nbsp;{angry}</p>
                                    </a>
                                </div>
                            </li>
                        </ul>
                        <div className="tab-content">
                            <div className="tab-pane fade active show" id={`like_${comment._id}`} role="tabpanel">
                                <div className="dropdown-item">Max Emum</div>
                                <div className="dropdown-item">Bill Yerds</div>
                                <div className="dropdown-item">Other</div>
                            </div>
                            <div className="tab-pane fade" id={`love_${comment._id}`} role="tabpanel">
                                <div className="dropdown-item">Bill Yerds</div>
                                <div className="dropdown-item">Other</div>
                            </div>
                            <div className="tab-pane fade" id={`haha_${comment._id}`} role="tabpanel">
                                <div className="dropdown-item">Viet saker</div>
                            </div>
                            <div className="tab-pane fade" id={`think_${comment._id}`} role="tabpanel">
                                <div className="dropdown-item">Anh ml</div>
                            </div>
                            <div className="tab-pane fade" id={`wow_${comment._id}`} role="tabpanel">
                                <div className="dropdown-item">hooho</div>
                            </div>
                            <div className="tab-pane fade" id={`sad_${comment._id}`} role="tabpanel">
                                <div className="dropdown-item">haha</div>
                            </div>
                            <div className="tab-pane fade" id={`angry_${comment._id}`} role="tabpanel">
                                <div className="dropdown-item">Other</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </Fragment>
    )
}

export default CommentReaction