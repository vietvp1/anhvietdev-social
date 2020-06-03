import React, { Fragment, useState } from 'react'
import AvatarModal from './AvartarModal'

export const Avatar = ({ user, userauth }) => {
    const [toggle, setToggle] = useState(true)
    const [picture, setPicture] = useState("");
    const [file, setFile] = useState('');
    const [preview, setPreview] = useState(false);


    const readFile = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            // Read the image via FileReader API and save image result in state.
            reader.onload = function (e) {
                // Add the file name to the data URL
                let dataURL = e.target.result;
                dataURL = dataURL.replace(";base64", `;name=${file.name};base64`);
                resolve({ file, dataURL });
            };

            reader.readAsDataURL(file);
        });
    }

    const onDropFile = async (e) => {
        let file = e.target.files[0];
        if (!file) {
            return;
        }
        const newFileData = await readFile(file);
        setPicture(newFileData.dataURL)
        setFile(newFileData.file)
        setPreview(true);
    }

    const removeImage = () => {
        setPicture('');
        setFile('');
        setPreview(false);
    }

    return (
        <Fragment>
            <div className="profile-img">
                {/* <img src={`${process.env.REACT_APP_UPLOADS_IMG}/${user.avatar}`} /> */}
                <img src={`${process.env.REACT_APP_UPLOADS_IMG}/${user.avatar}`} alt="profile-img" className="avatar-130 img-fluid" />

                {
                    (user._id === userauth._id) ? (
                        <div className="input-avatar-container">
                            <div>
                                <label className="mt-1">
                                    <input
                                        type="file"
                                        hidden
                                        onChange={onDropFile}
                                    />
                                    <div className="btn-change-avatar" onClick={() => setToggle(true)}>
                                        <i className="fas fa-camera"></i>
                                        <div>Cập nhập</div>
                                    </div>
                                </label>
                            </div>
                        </div>
                    ) : null
                }
            </div>
            {preview ? <AvatarModal
                picture={picture}
                file={file}
                toggle={toggle}
                setToggle={setToggle}
                remove={removeImage}
            /> : null}
        </Fragment>
    )
}
