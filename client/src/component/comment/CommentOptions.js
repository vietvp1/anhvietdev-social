import React from 'react'
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux'
import axios from "axios"

const CommentOptions = ({ comment, hideComment }) => {
    const user = useSelector(state => state.auth.user);
    const onDelete = (commentId) => {
        Swal.fire({
            title: 'Bạn có chắc muốn xóa bình luận này không?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'OK'
        }).then(async (result) => {
            if (result.value) {
                const res = await axios.put('/comment/delete-comment', { cmtId: comment._id, postId: comment.postId});
                if (res.data.success) {
                    hideComment(commentId)
                    Swal.fire(
                        'Đã xóa!',
                        'Thành công',
                        'success'
                    )
                }
            }
        })
    }

    return (
        <span className="post-comment-opt dropdown">
            <span className="dropdown-toggle pointer" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" role="button">
                <i className="far fa-ellipsis-h icon-post-comment-opt"></i>
            </span>
            <div className="dropdown-menu dropdown-menu-right">
                <div className="dropdown-item" onClick={e => hideComment(comment._id)}>
                    <div className="d-flex align-items-top">
                        <div className="icon font-size-20"><i className="fal fa-eye-slash"></i></div>
                        <div className="data ml-2">
                            <h6>Ẩn</h6>
                            <p className="mb-0">Bình luận này sẽ bị ẩn đi.</p>
                        </div>
                    </div>
                </div>
                {
                    (comment.writer._id === user._id) ?
                        <div className="dropdown-item" onClick={e => onDelete(comment._id)}>
                            <div className="d-flex align-items-top">
                                <div className="icon font-size-20"><i className="fal fa-trash-alt" /></div>
                                <div className="data ml-2">
                                    <h6>Xóa bình luận</h6>
                                    <p className="mb-0">Bình luận này sẽ bị xóa vĩnh viễn.</p>
                                </div>
                            </div>
                        </div>
                        : null
                }
            </div>
        </span>
    )
}

export default CommentOptions
