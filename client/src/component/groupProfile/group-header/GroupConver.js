import React, { Fragment, useState } from 'react'
import { checkCoverImage } from '../../../clientHelper/helperClient'
import axios from 'axios'
import { toast } from 'react-toastify';

const GroupCover = ({ group, userauth, setGroup }) => {
    const [picture, setPicture] = useState('');
    const [file, setFile] = useState([]);
    const [preview, setPreview] = useState(false);

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
        formData.append("groupId", group._id);
        const res = await axios.put('/group/update-cover', formData, config);
        if (res.data.success) {
            setPreview(false);
            setPicture('');
            setGroup(res.data.group)
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
                    group.cover?
                        <img
                            src={`${process.env.REACT_APP_UPLOADS_IMG}/${group.cover}`}
                            alt="group-bg"
                            className="rounded"
                        />
                        : null

            }

            {
                group.admins && group.admins[0]._id === userauth._id ?
                    <ul className="header-nav d-flex flex-wrap justify-end p-0 m-0">
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
                    </ul> : null
            }
        </Fragment>
    )
}

export default GroupCover
