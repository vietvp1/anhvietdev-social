import React, { useState, useEffect } from 'react'
import axios from 'axios';
import FlipMove from 'react-flip-move';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux'
import { readFile, maxSelectFile, checkFileSize, checkFilesQuantity } from '../../../clientHelper/helperClient'
import { imgType, videoType } from "../../../clientHelper/mimeType"
import img07 from '../../../images/small/07.png'
import img08 from '../../../images/small/08.png'
import img09 from '../../../images/small/09.png'
import img10 from '../../../images/small/10.png'
import Select from 'react-select';

const PostForm = ({ updatePost, groupId }) => {
    const user = useSelector(state => state.auth.user);
    const contacts = useSelector(state => state.contact.contacts);
    const [text, setText] = useState('');
    const [pictures, setPictures] = useState([]);
    const [file, setFile] = useState([]);
    const [preview, setPreview] = useState(false);

    const [friends, setFriends] = useState([]);
    const [isTagUser, setIsTagUser] = useState(false);
    const [listUserTag, setListUserTag] = useState([]);

    const [privacyPost, setPrivacyPost] = useState(1);

    const privacy = [
        { value: 0, label: 'Chỉnh mình tôi' },
        { value: 1, label: 'Công khai' },
        { value: 2, label: 'Bạn bè' },
    ];

    useEffect(() => {
        contacts.forEach(contact => {
            let item = { value: contact._id, label: contact.firstName + ` ` + contact.lastName };
            setFriends(f => [...f, item]);
        })
    }, [contacts])

    const onChangeTagUserText = (text) => {
        setFriends([]);
        if (text === "") {
            contacts.forEach(contact => {
                let item = { value: contact._id, label: contact.firstName + ` ` + contact.lastName };
                setFriends(f => [...f, item]);
            })
        }
        else {
            axios.get(`/contact/search-friends/${text}`).then(res => {
                let users = res.data.users;
                users.forEach(contact => {
                    let item = { value: contact._id, label: contact.firstName + ` ` + contact.lastName };
                    setFriends(f => [...f, item]);
                })
            })
        }
    }

    const handleChangeTagUserSelect = selectedOption => {
        setListUserTag([]);
        if (selectedOption) {
            selectedOption.forEach(item => {
                setListUserTag(us => [...us, item.value])
            })
        }
    };

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
                            <div className="preview-file-name text-overflow-three-dot">
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

    const handleChangePrivacy = selectedOption => {
        setPrivacyPost(selectedOption.value);
    };

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
        formData.append("tags", listUserTag);
        formData.append("privacy", privacyPost);
        const res = await axios.post('/post/addnew', formData, config).catch(err => console.log(err))
        if (res.data.success) {
            updatePost(res.data.newPost);
            console.log(res.data.newPost);

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
                        <img src={`${process.env.REACT_APP_UPLOADS_IMG}/${user.avatar}`} alt="userimg" className="avatar-60 rounded-circle" />
                    </div>
                    <form className="post-text ml-3 w-100">
                        <input type="text" className="form-control rounded" placeholder="Bạn đang nghĩ gì..." style={{ border: 'none' }} />
                    </form>
                </div>

                <hr />
                <ul className="post-opt-block d-flex align-items-center list-inline m-0 p-0">
                    <li className="iq-bg-primary rounded p-2 pointer mr-3 iq-bg-success-hover">
                        <img src={img07} alt="icon" className="img-fluid avatar-25" /> Ảnh/Video
                        </li>
                    <li className="iq-bg-primary rounded p-2 pointer mr-3 iq-bg-success-hover">
                        <img src={img08} alt="icon" className="img-fluid avatar-25" /> Gắn thẻ bạn bè
                        </li>
                    <li className="iq-bg-primary rounded p-2 pointer mr-3 iq-bg-success-hover">
                        <img src={img09} alt="icon" className="img-fluid avatar-25" /> Cảm xúc/Hoạt động
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
                                    <img src={`${process.env.REACT_APP_UPLOADS_IMG}/${user.avatar}`} alt="userimg" className="avatar-60 rounded-circle" />
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

                            {
                                isTagUser ?
                                    <div className="mt-4">
                                        <Select
                                            classNamePrefix="react-select"
                                            options={friends}
                                            placeholder="Nhập tên bạn bè muốn gắn thẻ..."
                                            onChange={handleChangeTagUserSelect}
                                            isMulti={true}
                                            onInputChange={onChangeTagUserText}
                                        />
                                    </div> : null
                            }


                            {preview ? renderPreview() : null}


                            <hr />
                            <ul className="d-flex flex-wrap align-items-center list-inline m-0 p-0">
                                <li className="col-md-6 mb-3">
                                    <div className="iq-bg-primary rounded p-2 pointer mr-3 iq-bg-success-hover">
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
                                <li className="col-md-6 mb-3" onClick={e => setIsTagUser(!isTagUser)}>
                                    <div className="iq-bg-primary rounded p-2 pointer mr-3 iq-bg-success-hover">
                                        <img src={img08} alt="icon" className="img-fluid avatar-25" />
                                        Gắn thẻ bạn bè
                                    </div>
                                </li>
                                <li className="col-md-6 mb-3">
                                    <div className="iq-bg-primary rounded p-2 pointer mr-3 iq-bg-success-hover"><img src={img09} alt="icon" className="img-fluid avatar-25" /> Cảm xúc/Hoạt động</div>
                                </li>
                            </ul>
                            <hr />
                            <div className="other-option">
                                <div className="d-flex align-items-center justify-content-between">
                                    <div className="d-flex align-items-center">
                                        <div className="user-img mr-3">
                                            <img src={`${process.env.REACT_APP_UPLOADS_IMG}/${user.avatar}`} alt="userimg" className="avatar-60 rounded-circle img-fluid" />
                                        </div>
                                        <h6>Tin của bạn</h6>
                                    </div>
                                    <div style={{ width: '200px' }}>
                                        <Select
                                            classNamePrefix="react-select"
                                            options={privacy}
                                            defaultValue={privacy[1]}
                                            onChange={handleChangePrivacy}
                                        />
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
