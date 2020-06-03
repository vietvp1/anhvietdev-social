import React, { useState } from 'react'
import { Picker } from 'emoji-mart'
import { useSelector } from 'react-redux'
import TextareaAutosize from 'react-autosize-textarea';
import axios from 'axios'

const CommentInput = ({ post, updateComment, comment }) => {
    const user = useSelector(state => state.auth.user)
    const [Comment, setComment] = useState("");
    const handleChange = (e) => {
        setComment(e.currentTarget.value)
    }

    const onChangeEmoji = (e) => {
        let emoji = e.native;
        setComment(Comment + emoji);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        let variables = comment ? {
            content: Comment,
            writer: user._id,
            parent: comment.parent,
            responseTo: comment._id,
        } : {
                content: Comment,
                writer: user._id,
                parent: post._id
            }
        axios.post('/comment/saveComment', { variables, writerPost: post.writer._id })
            .then(response => {
                if (response.data.success) {
                    setComment("")
                    updateComment(response.data.result)
                }
            })
    }

    return (
        <div className="post-add-comment">
            <div className="post-comment-avatar">
                <img src={`${process.env.REACT_APP_UPLOADS_IMG}/${post.writer.avatar}`} alt="" />
            </div>
            <div className="post-add-comment-text-area">
                <TextareaAutosize
                    type="text"
                    onChange={handleChange}
                    value={Comment}
                    placeholder="Viết bình luận..."
                    onKeyPress={e => e.key === "Enter" ? onSubmit(e) : null}
                />
                <div className="icons">
                    <i className="fal fa-paperclip"></i>

                    <span className="dropdown not-close-when-click">
                        <span className="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" role="button">
                            <i className="fal fa-laugh-wink" />
                        </span>
                        <div className="dropdown-menu dropdown-menu-right comment-input-picker">
                            <Picker onSelect={onChangeEmoji} darkMode={true} />
                        </div>
                    </span>
                    <i className="fal fa-image" />
                </div>
            </div>
        </div>
    )
}

export default CommentInput
