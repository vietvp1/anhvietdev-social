import React from 'react'
import { useSelector } from 'react-redux';
import Axios from 'axios'

const ReactAction = ({ comment, post, reactAction, setReactAction, data, setData }) => {
    const socket = useSelector(state => state.master_data.socket);

    const onReaction = async (e) => {
        let type = e.currentTarget.id;
        let typeLowerCase = type.toLowerCase();
        let value = data[typeLowerCase];
        if (reactAction === type) {
            let response = !comment ?
                await Axios.post('/reaction/unReaction', { postId: post._id, writerId: post.writer._id, type: type }) :
                await Axios.post('/reaction/unReactionComment', { commentId: comment._id, writerId: comment.writer._id, postId: post._id, type: type })

            if (response.data.success) {
                setReactAction(null)
            }
            setData({ ...data, [typeLowerCase]: value - 1 })
        } else {
            let response = !comment ?
                await Axios.post('/reaction/upReaction', { postId: post._id, writerId: post.writer._id, type: type }) :
                await Axios.post('/reaction/upReactionComment', { commentId: comment._id, writerId: comment.writer._id, postId: post._id, type: type })
            if (response.data.success) {
                if (!reactAction) {
                    setData({ ...data, [typeLowerCase]: value + 1 })
                } else {
                    let reactActionLowerCase = reactAction.toLowerCase();
                    setData({ ...data, [typeLowerCase]: value + 1, [reactActionLowerCase]: data[reactActionLowerCase] - 1 })
                }

                if (response.data.notification) {
                    !comment ?
                        socket.emit("upReaction", { contactId: post.writer._id, notification: response.data.notification }) :
                        socket.emit("upReaction-cmt", { contactId: comment.writer._id, notification: response.data.notification });
                }
                setReactAction(type);
            }
        }
    }

    const checkAction = () => {
        switch (reactAction) {
            case 'LIKE':
                return (
                    <span className="dropdown-toggle reacted" data-toggle="dropdown">
                        <img src={require('../../../images/icon/like.png')} className="img-reaction" alt="" /> Thích
                    </span>
                );
            case 'LOVE':
                return (
                    <span className="dropdown-toggle reacted" data-toggle="dropdown">
                        <img src={require('../../../images/icon/love.png')} className="img-reaction" alt="" /> Yêu thích
                    </span>
                );
            case 'HAHA':
                return (
                    <span className="dropdown-toggle reacted" data-toggle="dropdown">
                        <img src={require('../../../images/icon/haha.png')} className="img-reaction" alt="" /> Haha
                    </span>
                );
            case 'THINK':
                return (
                    <span className="dropdown-toggle reacted" data-toggle="dropdown">
                        <img src={require('../../../images/icon/think.png')} className="img-reaction" alt="" /> Hmzzz...
                    </span>
                );
            case 'WOW':
                return (
                    <span className="dropdown-toggle reacted" data-toggle="dropdown">
                        <img src={require('../../../images/icon/wow.png')} className="img-reaction" alt="" /> Wow
                    </span>
                );
            case 'SAD':
                return (
                    <span className="dropdown-toggle reacted" data-toggle="dropdown">
                        <img src={require('../../../images/icon/sad.png')} className="img-reaction" alt="" /> Buồn
                    </span>
                );
            case 'ANGRY':
                return (
                    <span className="dropdown-toggle reacted" data-toggle="dropdown">
                        <img src={require('../../../images/icon/angry.png')} className="img-reaction" alt="" /> Phẫn nộ
                    </span>
                );
            default:
                return (
                    <span className="dropdown-toggle" data-toggle="dropdown">
                        <img src={require('../../../images/icon/00.png')} className="img-reaction" alt="" /> Thích
                    </span>
                    // onClick={onReaction} id="LIKE"
                );
        }
    }

    return (
        <div className="like-data">
            <div className="dropdown">
                {checkAction()}
                <div className="dropdown-menu">
                    <span className="ml-2 mr-2" id="LIKE" onClick={onReaction}>
                        <img src={require('../../../images/icon/like.png')} className="avatar-35" alt="" />
                    </span>
                    <span className="mr-2" id="LOVE" onClick={onReaction}>
                        <img src={require('../../../images/icon/love.png')} className="avatar-35" alt="" />
                    </span>
                    <span className="mr-2" id="HAHA" onClick={onReaction}>
                        <img src={require('../../../images/icon/haha.png')} className="avatar-35" alt="" />
                    </span>
                    <span className="mr-2" id="THINK" onClick={onReaction}>
                        <img src={require('../../../images/icon/think.png')} className="avatar-35" alt="" />
                    </span>
                    <span className="mr-2" id="WOW" onClick={onReaction}>
                        <img src={require('../../../images/icon/wow.png')} className="avatar-35" alt="" />
                    </span>
                    <span className="mr-2" id="SAD" onClick={onReaction}>
                        <img src={require('../../../images/icon/sad.png')} className="avatar-35" alt="" />
                    </span>
                    <span className="mr-2" id="ANGRY" onClick={onReaction}>
                        <img src={require('../../../images/icon/angry.png')} className="avatar-35" alt="" />
                    </span>
                </div>
            </div>
        </div>
    )
}

export default ReactAction
