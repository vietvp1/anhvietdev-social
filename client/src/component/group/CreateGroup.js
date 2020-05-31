import React, { useState } from 'react'
import { ModalBody, Modal, ModalHeader } from 'reactstrap';
import Select from 'react-select';
import Swal from 'sweetalert2';
import axios from "axios"
import { bufferToBase64 } from '../../clientHelper/helperClient';

const CreateGroup = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [text, setText] = useState("");
    const [privacy, setPrivacy] = useState(1);
    const [users, setUsers] = useState([]);
    const [usersAdded, setUsersAdded] = useState([]);
    const [usersAddedId, setUsersAddedId] = useState([]);

    const privacyList = [
        { value: 1, label: 'Riêng tư' },
        { value: 0, label: 'Bí mật' },
    ];
    const privacyStyles = {
        menu: (provided, state) => ({
            ...provided,
            width: state.selectProps.width
        }),
        control: () => ({
            width: 200,
            borderRadius: '5px',
            display: 'flex'
        }),
    }

    const onChangePrivacy = selectedOption => {
        setPrivacy(selectedOption.value);
    }

    const onChangeText = async (e) => {
        setText(e.target.value);
        if (e.target.value === "") {
            setUsers([]);
        }
        else {
            let res = await axios.get(`/contact/search-friends/${e.target.value}`)
            setUsers(res.data.users);
        }
    }

    const chooseUser = (user) => {
        let check = 1;
        usersAdded.forEach(u => {
            if (u._id === user._id) {
                check = 0;
                setUsersAdded(usersAdded.filter(item => item._id !== user._id));
                setUsersAddedId(usersAddedId.filter(id => id !== user._id));
            }
        })
        if (check) {
            setUsersAdded([...usersAdded, user]);
            setUsersAddedId([...usersAddedId, user._id]);
        }

    }

    const onSubmit = async (e) => {
        e.preventDefault();
        let item = {
            name: name,
            members: usersAddedId,
            description: description,
            privacy: privacy
        }
        const res = await axios.post('/group/new-group', item);
        if (res.data.success) {
            setName("");
            setDescription("");
            setUsersAddedId([]);
            setUsersAdded([]);
            setUsers([]);
            Swal.fire({
                icon: 'success',
                title: 'Tạo nhóm thành công',
                showConfirmButton: false,
                timer: 1500
            })
        }
    }

    const toggle = () => {
        setIsOpen(!isOpen);
    }

    return (
        <div>
            <div className="data-block pointer iq-bg-info-hover" onClick={toggle}>
                <h2><i className="fas fa-plus"></i>&nbsp; Tạo nhóm mới</h2>
            </div>
            <Modal isOpen={isOpen} toggle={toggle} className="modal-create-group">
                <ModalHeader toggle={toggle}>Tạo nhóm mới</ModalHeader>
                <ModalBody>
                    <div>
                        <form className="form-input-group" onSubmit={onSubmit}>
                            <div className="form-group">
                                <label htmlFor="grName">Tên nhóm</label>
                                <input
                                    className="form-control mb-0"
                                    id="grName"
                                    name="name"
                                    placeholder="Nhập tên nhóm.."
                                    required
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="grDescription">Mô tả</label>
                                <input
                                    className="form-control mb-0"
                                    id="grDescription"
                                    name="description"
                                    placeholder="Thêm mô tả..."
                                    value={description}
                                    onChange={e => setDescription(e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="grAddMember">Thêm thành viên</label>
                                <input
                                    className="form-control mb-0"
                                    id="grAddMember"
                                    name="member"
                                    placeholder="Nhập tên..."
                                    value={text}
                                    onChange={onChangeText}
                                />
                            </div>
                            {
                                usersAdded.length > 0 ? (
                                    <div className="friends-added-more">
                                        {
                                            usersAdded.map((user, i) => (
                                                <span key={i}>
                                                    <img
                                                        className="image-user-added-more avatar-30 rounded"
                                                        src={`data:${user.avatar.contentType};base64,${bufferToBase64(user.avatar.data.data)}`}
                                                        alt=""
                                                    />
                                                </span>
                                            ))
                                        }
                                    </div>
                                ) : null
                            }
                            {
                                users ? (
                                    <div id="group-chat-more-friends">
                                        {
                                            users.map((user, i) => (
                                                <div key={i}>
                                                    <div onClick={e => chooseUser(user)}>
                                                        <div className="contactPanel pointer">
                                                            <div className="find-more-user-avatar">
                                                                <img
                                                                    className="avatar-30 bdr-100 mr-2"
                                                                    src={`data:${user.avatar.contentType};base64,${bufferToBase64(user.avatar.data.data)}`}
                                                                    alt=""
                                                                />
                                                                {user.firstName}&nbsp;{user.lastName}
                                                                {
                                                                    (usersAddedId.includes(user._id)) ? (
                                                                        <i className="fa fa-check-circle toggleColor ml-2"></i>
                                                                    ) : (
                                                                            <i className="fa fa-check-circle ml-2"></i>
                                                                        )
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                ) : null
                            }

                            <div className="form-group">
                                <label htmlFor="grPrivacy">Chọn quyền riêng tư</label>
                                <Select
                                    id="grPrivacy"
                                    classNamePrefix="react-select"
                                    options={privacyList}
                                    styles={privacyStyles}
                                    defaultValue={privacyList[0]}
                                    width='200px'
                                    placeholder="Quyền riêng tư"
                                    onChange={onChangePrivacy}
                                />
                            </div>

                            <div className="text-center mt-5">
                                <button className="btn iq-bg-primary" type="submit">
                                    Tạo nhóm
                                </button>
                            </div>
                        </form>
                    </div>
                </ModalBody>
            </Modal>
        </div>
    )
}

export default CreateGroup