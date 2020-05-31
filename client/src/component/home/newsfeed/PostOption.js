import React, { Fragment } from 'react'
import Swal from 'sweetalert2';
import axios from "axios"

const PostOption = ({ user, post, hidePost }) => {
    const onDelete = (postId) => {
        Swal.fire({
            title: 'Bạn có chắc muốn xóa bài viết này không?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'OK'
        }).then(async (result) => {
            if (result.value) {
                const res = await axios.delete(`/post/remove/${postId}`);
                if (res.data.success) {
                    hidePost(postId)
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
        <div className="iq-card-post-toolbar">
            <div className="dropdown">
                <span className="dropdown-toggle pointer" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" role="button">
                    <i className="far fa-ellipsis-h"/>
                </span>
                <div className="dropdown-menu m-0 p-0">
                    <div className="dropdown-item p-3" onClick={e => hidePost(post._id)}>
                        <div className="d-flex align-items-top">
                            <div className="icon font-size-20"><i className="fal fa-eye-slash" /></div>
                            <div className="data ml-2">
                                <h6>Ẩn bài viết</h6>
                                <p className="mb-0">Xem ít bài viết như thế này.</p>
                            </div>
                        </div>
                    </div>
                    {
                        (post.writer._id === user._id) ?
                            <div className="dropdown-item p-3" onClick={e => onDelete(post._id)}>
                                <div className="d-flex align-items-top">
                                    <div className="icon font-size-20"><i className="fal fa-trash-alt" /></div>
                                    <div className="data ml-2">
                                        <h6>Xóa bài viết</h6>
                                        <p className="mb-0">Bài viết sẽ bị xóa vĩnh viễn.</p>
                                    </div>
                                </div>
                            </div> :
                            <Fragment>
                                <div className="dropdown-item p-3">
                                    <div className="d-flex align-items-top">
                                        <div className="icon font-size-20"><i className="ri-user-unfollow-line" /></div>
                                        <div className="data ml-2">
                                            <h6>Bỏ theo dõi người dùng</h6>
                                            <p className="mb-0">Ngừng xem bài viết nhưng vẫn là bạn bè.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="dropdown-item p-3">
                                    <div className="d-flex align-items-top">
                                        <div className="icon font-size-20"><i className="ri-notification-line" /></div>
                                        <div className="data ml-2">
                                            <h6>Thông báo</h6>
                                            <p className="mb-0">Bật thông báo cho bài viết này</p>
                                        </div>
                                    </div>
                                </div>
                            </Fragment>
                    }
                </div>
            </div>
        </div>
    )
}

export default PostOption
