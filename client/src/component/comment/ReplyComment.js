import React, { useEffect, useState } from 'react'
import axios from "axios"
import 'moment/locale/vi';
import CommentInput from './CommentInput';
import SingleComment from './SingleComment';

function ReplyComment({ comment, post, OpenReply, setOpenReply}) {
    const [resCmt, setResCmt] = useState([]);
    const [ChildCommentNumber, setChildCommentNumber] = useState(0)
    const [OpenReplyComments, setOpenReplyComments] = useState(true)

    useEffect(() => {
        let isSubscribed = true;
        comment && axios.post('/comment/getComments', { responseTo: comment._id })
            .then(response => {
                if (isSubscribed && response.data.success) {
                    setResCmt(response.data.comments);
                    setChildCommentNumber(response.data.comments.length)
                }
            })
        return () => isSubscribed = false
    }, [comment])

    const handleChange = () => {
        setOpenReplyComments(!OpenReplyComments)
    }

    const updateComment = (newComment) => {
        setResCmt([...resCmt, newComment]);
    }

    const hideComment = (commentId) => {
        setResCmt(resCmt.filter(c => c._id !== commentId));
    }

    return (
        <div className="input-res-cmt-block">
            {ChildCommentNumber > 0 && !OpenReplyComments &&
                <div className="view-more-comment"
                    onClick={handleChange} >
                    Xem thêm {ChildCommentNumber} phản hồi
                </div>
            }

            {ChildCommentNumber > 0 && OpenReplyComments &&
                <div className="view-more-comment"
                    onClick={handleChange} >
                    Ẩn phản hồi
                </div>
            }

            {OpenReplyComments &&
                resCmt.map((c, i) => (
                    <div className="list-res-cmt" key={i}>
                        <SingleComment  
                            comment={c} 
                            hideComment={hideComment} 
                            post={post} OpenRep={OpenReply} 
                            setOpenRep={setOpenReply} 
                        />
                    </div>
                ))
            }

            {OpenReply && !comment.responseTo &&
                <div className="res-input mb-4">
                    <CommentInput post={post} updateComment={updateComment} comment={comment} />
                </div>
            }
        </div>
    )
}

export default ReplyComment