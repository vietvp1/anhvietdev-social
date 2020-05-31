import React, { useState } from 'react'
import axios from 'axios'
import {
    Modal,
    ModalHeader,
    ModalBody,
} from 'reactstrap';
import AvatarEditor from 'react-avatar-editor';
import Swal from 'sweetalert2';
import TextareaAutosize from 'react-autosize-textarea';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../../actions/auth';

const AvatarModal = ({ picture, file, toggle, setToggle, remove }) => {
    const [text, setText] = useState('');
    const [scaleValue, setScaleValue] = useState(1);
    const [editor, setEditor] = useState(null);
    const [userProfilePic, setUserProfilePic] = useState('');
    const dispatch = useDispatch();
    
    const toggleHandle = () => {
        remove();
        setToggle(!toggle)
    }

    console.log(userProfilePic);
    const onSave = async (e) => {
        e.preventDefault();
        if (editor !== null) {
            const url = editor.getImageScaledToCanvas().toDataURL();
            setUserProfilePic(url);
        }
        let formData = new FormData();
        const config = {
            header: { 'content-type': 'multipart/form-data' }
        }

        formData.append("file", file);
        if (text) {
            formData.append("text", text);
        }
        const res = await axios.put('/user/update-avatar', formData, config);
        if (res.data.success) {
            console.log(res.data);
            setToggle(!toggle);
            dispatch(updateUser(res.data.user));
            Swal.fire({
                title: `Cập nhập ảnh đại diện thành công.`,
                icon: "success",
                timer: 3000,
            });
        }
    }

    const setEditorRef = edit => setEditor(edit);

    const onScaleChange = (scaleChangeEvent) => {
        const scaleValue = parseFloat(scaleChangeEvent.target.value);
        setScaleValue(scaleValue)
        if (editor !== null) {
            const url = editor.getImageScaledToCanvas().toDataURL();
            setUserProfilePic(url);
        }
    };

    return (
        <Modal isOpen={toggle}>
            <ModalHeader toggle={toggleHandle}>Cập nhập ảnh đại diện</ModalHeader>
            <ModalBody>
                <div className="preview-avatar">
                    <div className="preview-canvas">
                        <AvatarEditor
                            image={picture}
                            borderRadius={150}
                            width={300}
                            height={300}
                            scale={scaleValue}
                            rotate={0}
                            ref={setEditorRef}
                            className="canvas-avatar"
                        />
                        <div>
                            <input
                                style={{ width: '30%' }}
                                type="range" value={scaleValue}
                                name="points"
                                min="1" max="4"
                                onChange={onScaleChange}
                            />
                        </div>
                    </div>
                    <div className="content-upload-avatar">
                        <TextareaAutosize
                            onChange={e => setText(e.target.value)}
                            value={text}
                            placeholder="Thêm mô tả..."
                            className="rounded mt-3 mb-3"
                        />
                        <br />
                        <div className="btn iq-bg-info mr-2" onClick={onSave} >Lưu</div>
                        <div className="btn iq-bg-danger" onClick={toggleHandle}>Hủy</div>
                    </div>
                </div>
            </ModalBody>
        </Modal>
    )
}

export default AvatarModal