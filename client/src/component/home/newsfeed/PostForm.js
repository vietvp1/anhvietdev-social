import React, { useState } from 'react'
import axios from 'axios';
import FlipMove from 'react-flip-move';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux'
import { readFile, maxSelectFile, checkFileSize, checkFilesQuantity, bufferToBase64 } from '../../../clientHelper/helperClient'
import { imgType, videoType } from "../../../clientHelper/mimeType"
import img07 from '../../../images/small/07.png'
import img08 from '../../../images/small/08.png'
import img09 from '../../../images/small/09.png'
import img10 from '../../../images/small/10.png'
import img11 from '../../../images/small/11.png'
import img12 from '../../../images/small/12.png'
import img13 from '../../../images/small/13.png'
import img14 from '../../../images/small/14.png'

const PostForm = ({ updatePost, groupId }) => {
    const user = useSelector(state => state.auth.user);
    const [text, setText] = useState('');
    const [pictures, setPictures] = useState([]);
    const [file, setFile] = useState([]);
    const [preview, setPreview] = useState(false);

    const styles = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "wrap",
        width: "100%"
    };

    const onDropFile = (e) => {
        const files = e.target.files;
        const allFilePromises = [];
        if (maxSelectFile(e) && checkFilesQuantity(e, file) && checkFileSize(e)) {
            for (let i = 0; i < files.length; i++) {
                let file = files[i];
                allFilePromises.push(readFile(file));
            }

            Promise.all(allFilePromises).then(newFilesData => {
                const dataURLs = pictures.slice();
                const Files = file.slice();

                newFilesData.forEach(newFileData => {
                    let isImage = true;
                    const types = imgType.concat(videoType);
                    if (types.every(type => newFileData.file.type !== type)) {
                        isImage = false;
                    }

                    dataURLs.push({ dataURL: newFileData.dataURL, isImage: isImage, name: newFileData.file.name });
                    Files.push(newFileData.file);
                });
                setPictures(dataURLs);
                setFile(Files)
            });
            setPreview(true);
        }
    }

    const renderPreview = () => {
        return (
            <div className="fileContainer" >
                <FlipMove enterAnimation="fade" leaveAnimation="fade" style={styles}>
                    {renderPreviewPictures()}
                </FlipMove>
            </div>
        );
    }

    const renderPreviewPictures = () => {
        return pictures.map((f, i) =>
            (f.isImage) ? (
                <div key={i} className="preview-image-post">
                    <div className="uploadPictureContainer">
                        <div className="deleteImage" onClick={() => removeImage(f)}><i className="fas fa-times" /></div>
                        <img src={f.dataURL} className="uploadPicture" alt="preview" />
                    </div>
                </div>
            ) : (
                    <div key={i} className="preview-file-post">
                        <div className="file-post">
                            <div>
                                <img className="rounded-circle img-fluid avatar-40 mr-2" src="images/page-img/47.png" alt="profile" />
                            </div>
                            <div className="preview-file-name">
                                {f.name}
                            </div>
                            <div>
                                <div className="flex align-items-center list-user-action">
                                    <span onClick={() => removeImage(f)}><i className="fas fa-times" /></span>
                                </div>
                            </div>
                        </div>
                    </div>
                )
        );
    }

    const removeImage = (picture) => {
        const removeIndex = pictures.findIndex(e => e === picture);
        const filteredPictures = pictures.filter((e, index) => index !== removeIndex);
        const filteredFiles = file.filter((e, index) => index !== removeIndex);
        setPictures(filteredPictures);
        setFile(filteredFiles);
        if (pictures.length <= 1) {
            setPreview(false);
        }
    }

    const onUploadClick = (e) => {
        e.target.value = null;
    }
    ///////////////////////////////////////////////////////////

    const onSubmit = async (e) => {
        e.preventDefault()
        let formData = new FormData();
        const config = {
            header: { 'content-type': 'multipart/form-data' }
        }

        if (file.length === 0 && !text) {
            Swal.fire({
                icon: 'error',
                title: 'Nội dung bài đăng trống',
                timer: 3000,
            })
            return false;
        }

        if (file.length > 0) {
            for (var x = 0; x < file.length; x++) {
                formData.append("file", file[x]);
            }
        }

        if (groupId) {
            formData.append("groupId", groupId);
        }

        if (text) {
            formData.append("text", text);
        }

        const res = await axios.post('/post/addnew', formData, config).catch(err => console.log(err))
        if (res.data.success) {
            updatePost(res.data.newPost);
            setText('');
            setPictures([]);
            setPreview(false);
            setFile([]);
        }
    }

    return user ? (
        <div id="post-modal-data" className="iq-card">
            <div className="iq-card-header d-flex justify-content-between">
                <div className="iq-header-title">
                    <h4 className="card-title">Tạo bài viết</h4>
                </div>
            </div>
            <div className="iq-card-body" data-toggle="modal" data-target="#post-modal">
                <div className="d-flex align-items-center">
                    <div className="user-img">
                        <img src={`data:${user.avatar.contentType};base64,${bufferToBase64(user.avatar.data.data)}`} alt="userimg" className="avatar-60 rounded-circle" />
                    </div>
                    <form className="post-text ml-3 w-100">
                        <input type="text" className="form-control rounded" placeholder="Bạn đang nghĩ gì..." style={{ border: 'none' }} />
                    </form>
                </div>
                <hr />
                <ul className="post-opt-block d-flex align-items-center list-inline m-0 p-0">
                    <li className="iq-bg-primary rounded p-2 pointer mr-3">
                        <img src={img07} alt="icon" className="img-fluid avatar-25" /> Ảnh/Video
                        </li>
                    <li className="iq-bg-primary rounded p-2 pointer mr-3">
                        <img src={img08} alt="icon" className="img-fluid avatar-25" /> Gắn thẻ bạn bè
                        </li>
                    <li className="iq-bg-primary rounded p-2 pointer mr-3">
                        <img src={img09} alt="icon" className="img-fluid avatar-25" /> Cảm xúc/Hoạt động
                        </li>
                    <li className="rounded p-2 pointer">
                        <div className="iq-card-header-toolbar d-flex align-items-center">
                            <div className="dropdown">
                                <span className="dropdown-toggle" id="post-option" data-toggle="dropdown">
                                    <i className="far fa-ellipsis-h" />
                                </span>
                                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="post-option">
                                    <div className="dropdown-item">Check in</div>
                                    <div className="dropdown-item">Trực Tiếp</div>
                                    <div className="dropdown-item">Gif</div>
                                    <div className="dropdown-item">Xem Tiệc</div>
                                    <div className="dropdown-item">Chơi với bạn</div>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div className="modal fade" id="post-modal" tabIndex={-1} role="dialog" aria-labelledby="post-modalLabel" aria-hidden="true" style={{ display: 'none' }}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="post-modalLabel">Tạo bài viết</h5>
                            <button type="button" className="btn btn-secondary" data-dismiss="modal"><i className="fas fa-times" /></button>
                        </div>
                        <div className="modal-body">
                            <div className="d-flex align-items-center">
                                <div className="user-img">
                                    <img src={`data:${user.avatar.contentType};base64,${bufferToBase64(user.avatar.data.data)}`} alt="userimg" className="avatar-60 rounded-circle img-fluid" />
                                </div>
                                <form className="post-text ml-3 w-100" action="">
                                    <input
                                        type="text"
                                        className="form-control rounded"
                                        placeholder="Bạn đang nghĩ gì..."
                                        value={text}
                                        name='text'
                                        onChange={e => setText(e.target.value)}
                                        style={{ border: 'none' }} />
                                </form>
                            </div>
                            {preview ? renderPreview() : null}
                            <hr />
                            <ul className="d-flex flex-wrap align-items-center list-inline m-0 p-0">
                                <li className="col-md-6 mb-3">
                                    <div className="iq-bg-primary rounded p-2 pointer mr-3">
                                        <label className="mb-0 full-width">
                                            <input
                                                type="file"
                                                multiple
                                                hidden
                                                onChange={onDropFile}
                                                onClick={onUploadClick}
                                            />
                                            <img src={img07} alt="icon" className="img-fluid avatar-25" /> Ảnh/Video
                                        </label>
                                    </div>
                                </li>
                                <li className="col-md-6 mb-3">
                                    <div className="iq-bg-primary rounded p-2 pointer mr-3">
                                        <img src={img08} alt="icon" className="img-fluid avatar-25" /> Gắn thẻ bạn bè</div>
                                </li>
                                <li className="col-md-6 mb-3">
                                    <div className="iq-bg-primary rounded p-2 pointer mr-3"><img src={img09} alt="icon" className="img-fluid avatar-25" /> Cảm xúc/Hoạt động</div>
                                </li>
                                <li className="col-md-6 mb-3">
                                    <div className="iq-bg-primary rounded p-2 pointer mr-3"><img src={img10} alt="icon" className="img-fluid avatar-25" /> Check in</div>
                                </li>
                                <li className="col-md-6 mb-3">
                                    <div className="iq-bg-primary rounded p-2 pointer mr-3"><img src={img11} alt="icon" className="img-fluid avatar-25" /> Trực tiếp</div>
                                </li>
                                <li className="col-md-6 mb-3">
                                    <div className="iq-bg-primary rounded p-2 pointer mr-3"><img src={img12} alt="icon" className="img-fluid avatar-25" /> Gif</div>
                                </li>
                                <li className="col-md-6 mb-3">
                                    <div className="iq-bg-primary rounded p-2 pointer mr-3"><img src={img13} alt="icon" className="img-fluid avatar-25" /> Xem tiệc</div>
                                </li>
                                <li className="col-md-6 mb-3">
                                    <div className="iq-bg-primary rounded p-2 pointer mr-3"><img src={img14} alt="icon" className="img-fluid avatar-25" /> Chơi với bạn</div>
                                </li>
                            </ul>
                            <hr />
                            <div className="other-option">
                                <div className="d-flex align-items-center justify-content-between">
                                    <div className="d-flex align-items-center">
                                        <div className="user-img mr-3">
                                            <img src={`data:${user.avatar.contentType};base64,${bufferToBase64(user.avatar.data.data)}`} alt="userimg" className="avatar-60 rounded-circle img-fluid" />
                                        </div>
                                        <h6>Tin của bạn</h6>
                                    </div>
                                    <div className="iq-card-post-toolbar">
                                        <div className="dropdown">
                                            <span className="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" role="button">
                                                <span className="btn btn-primary">Bạn bè</span>
                                            </span>
                                            <div className="dropdown-menu m-0 p-0">
                                                <a className="dropdown-item p-3" href="/">
                                                    <div className="d-flex align-items-top">
                                                        <div className="icon font-size-20"><i className="fal fa-globe-americas" /></div>
                                                        <div className="data ml-2">
                                                            <h6>Công khai</h6>
                                                            <p className="mb-0">Bất cứ ai</p>
                                                        </div>
                                                    </div>
                                                </a>
                                                <a className="dropdown-item p-3" href="/">
                                                    <div className="d-flex align-items-top">
                                                        <div className="icon font-size-20"><i className="fal fa-user-friends" /></div>
                                                        <div className="data ml-2">
                                                            <h6>Bạn bè</h6>
                                                            <p className="mb-0">Bạn bè của bạn</p>
                                                        </div>
                                                    </div>
                                                </a>
                                                <a className="dropdown-item p-3" href="/">
                                                    <div className="d-flex align-items-top">
                                                        <div className="icon font-size-20"><i className="fal fa-lock-alt" /></div>
                                                        <div className="data ml-2">
                                                            <h6>Chỉ mình tôi</h6>
                                                            <p className="mb-0">Chỉ mình tôi</p>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary d-block w-100 mt-3" data-dismiss="modal" onClick={onSubmit}>Đăng</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    ) : null
}

export default PostForm
