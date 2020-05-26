import React, { Fragment, useState } from 'react'
import CheckContact from './CheckContact';
import {checkFileSize, checkCoverImage, bufferToBase64 } from '../../../clientHelper/helperClient'
import axios from 'axios'
import { updateUser } from '../../../actions/auth';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

const Cover = ({ user, userauth }) => {
    const [picture, setPicture] = useState('');
    const [file, setFile] = useState([]);
    const [preview, setPreview] = useState(false);
    const dispatch = useDispatch();

    const onDropFile = async (e) => {
        const file = e.target.files[0];
        let checkRate = await checkCoverImage(file);
        
        if (checkRate) {
            setPicture(window.URL.createObjectURL(file))
            setFile(file);
            setPreview(true);
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        let formData = new FormData();
        const config = {
            header: { 'content-type': 'multipart/form-data' }
        }
        formData.append("file", file);
        const res = await axios.put('/user/update-cover', formData, config);
        if (res.data.success) {
            setPreview(false);
            setPicture('');
            dispatch(updateUser(res.data.user));
            toast.success(res.data.message);
        }
        
    }

    const onCancel = () => {
        setPreview(false);
        setPicture('');
    }

    return (
        <Fragment>
            {
                preview ?
                    <div className="save-cover-wrapper d-flex mt-3 mr-2">
                        <span className="btn text-primary iq-bg-info" onClick={onSubmit} name="phone">Lưu</span>
                        <span className="btn text-danger iq-bg-danger ml-2" onClick={onCancel} name="phone">Hủy</span>
                    </div> : null
            }

            {
                preview ? <img src={picture} alt="profile-bg" className="rounded" /> :
                    user.cover ?
                        <img src={`data:${user.cover.contentType};base64,${bufferToBase64(user.cover.data.data)}`} alt="profile-bg" className="rounded" />
                        : null

            }

            {
                user._id === userauth._id ?
                    <ul className="header-nav d-flex flex-wrap justify-end p-0 m-0">
                        <li>
                            <span><i className="fas fa-pencil-alt" /></span>
                        </li>
                        <li>
                            <label className="mb-0 full-width">
                                <input
                                    type="file"
                                    hidden
                                    onChange={onDropFile}
                                />
                                <span>
                                    <i className="fal fa-camera" title="Cập nhập ảnh bìa" />
                                </span>
                            </label>
                        </li>
                    </ul> : <CheckContact user={user} />
            }
        </Fragment>
    )
}

export default Cover
