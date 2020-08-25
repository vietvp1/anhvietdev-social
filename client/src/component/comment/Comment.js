import React, {useState, useEffect, Fragment } from 'react'
import axios from 'axios'
import SingleComment from './SingleComment'
import CommentInput from './CommentInput'

const Comment = ({post}) => {
    const [commentLists, setCommentLists] = useState([]);
    useEffect(() => {
        let isSubscribed = true;
        axios.post('/comment/getComments', {postId: post._id})
            .then(response => {
                if (isSubscribed && response.data.success) {
                  setCommentLists(response.data.comments)
                }
            })

        return () => isSubscribed = false
    }, [post._id])

    const updateComment = (newComment) => {
        setCommentLists([...commentLists, newComment]);
    }
    
    const hideComment = (id) => {
        setCommentLists(commentLists.filter(cmt => cmt._id !== id));
    }


    return (
        <Fragment>
            <div className="post-comments">
                <div className="view-more-comment"> Xem thêm</div>
                    {
                        commentLists && commentLists.map((comment, index) => (
                            (!comment.responseTo &&
                                <div key={index} >
                                    <SingleComment comment={comment} hideComment={hideComment} post={post}/>
                                </div>
                            )
                        ))
                    }
                <CommentInput post={post} updateComment={updateComment}/>
            </div>
        </Fragment>
    )
}

export default Comment
