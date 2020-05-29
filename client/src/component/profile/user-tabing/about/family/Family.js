import React, { useState, useEffect } from 'react'
import Select from 'react-select';
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { updateUser } from '../../../../../actions/auth';
import { bufferToBase64 } from '../../../../../clientHelper/helperClient';

const Family = ({ user }) => {
    const [addRel, setAddRel] = useState(false);
    const [statusRelIndex, setStatusRelIndex] = useState(0);
    const [privacyRelIndex, setPrivacyRelIndex] = useState(0);
    const [statusRel, setStatusRel] = useState('');
    const [privacyRel, setPrivacyRel] = useState('');
    const dispatch = useDispatch();

    const options = [
        { value: 'Độc thân', label: 'Độc thân' },
        { value: 'Hẹn hò', label: 'Hẹn hò' },
        { value: 'Đã kết hôn', label: 'Đã kết hôn' },
        { value: 'Đã đính hôn', label: 'Đã đính hôn' },
        { value: 'Kết hôn đồng giới', label: 'Kết hôn đồng giới' },
        { value: 'Có mối quan hệ phức tạp', label: 'Có mối quan hệ phức tạp' },
        { value: 'Đã ly hôn', label: 'Đã ly hôn' },
        { value: 'Góa', label: 'Góa' },
    ];

    const privacy = [
        { value: 0, label: 'Chỉnh mình tôi' },
        { value: 1, label: 'Công khai' },
        { value: 2, label: 'Bạn bè' },
    ];

    useEffect(() => {
        options.forEach((o, i) => {
            if (o.value === user.relationship_status.status) {
                setStatusRelIndex(i);
            }
        })
        privacy.forEach((o, i) => {
            if (o.value === user.relationship_status.privacy) {
                setPrivacyRelIndex(i);
            }
        })
    }, [options, user, privacy]);

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

    const handleChange1 = selectedOption => {
        setStatusRel(selectedOption.value);
    };
    const handleChange2 = selectedOption => {
        setPrivacyRel(selectedOption.value);
    };

    const submitOne = async () => {
        let item = {
            relationship_status: {
                status: statusRel,
                privacy: privacyRel,
            }
        }
        const res = await axios.put('/user/update-info', item);
        if (res.data.success) {
            dispatch(updateUser(res.data.user));
            setAddRel(false);
        }
    }

    return (
        <div className="tab-pane fade" id="family" role="tabpanel">
            <h4 className="mb-3">Tình trạng mối quan hệ</h4>
            <ul className="suggestions-lists m-0 p-0 pointer">
                {
                    !user.relationship_status.status ?
                        <li className="d-flex mb-4 align-items-center" onClick={e => setAddRel(true)}>
                            <div className="user-img img-fluid"><i className="fal fa-plus" /></div>
                            <div className="media-support-info ml-3">
                                <h6>Thêm trạng thái mối quan hệ của bạn</h6>
                            </div>
                        </li> : !addRel ?
                            <li className="d-flex mb-4 align-items-center">
                                <div className="media-support-info">
                                    <span onClick={e => setAddRel(true)} className="box-like-btn bdrs5">{user.relationship_status.status}</span>
                                </div>
                                <div onClick={e => setAddRel(true)} className="edit-relation d-link"><span><i className="fal fa-pencil mr-2" />Edit</span></div>
                            </li> : null
                }

            </ul>
            {
                addRel ?
                    <div>
                        <Select
                            classNamePrefix="react-select"
                            options={options}
                            placeholder="Chọn trạng thái quan hệ..."
                            defaultValue={options[statusRelIndex]}
                            onChange={handleChange1}
                        />
                        <div className="mt-3 mb-3 d-flex">
                            <Select
                                classNamePrefix="react-select"
                                options={privacy}
                                styles={privacyStyles}
                                defaultValue={privacy[privacyRelIndex]}
                                width='200px'
                                onChange={handleChange2}
                            />
                            <span className="btn text-primary ml-5 box-like-btn" onClick={submitOne}>Lưu</span>
                            <span className="btn text-danger ml-2 box-like-btn" onClick={e => setAddRel(false)}>Hủy</span>
                        </div>
                    </div>
                    : null
            }
            <h4 className="mt-3 mb-3">Thành viên gia đình</h4>
            <ul className="suggestions-lists m-0 p-0">
                <li className="d-flex mb-4 align-items-center">
                    <div className="user-img img-fluid"><i className="fal fa-plus" /></div>
                    <div className="media-support-info ml-3">
                        <h6>Thành viên gia đình</h6>
                    </div>
                </li>
                <li className="d-flex mb-4 align-items-center">
                    <div className="user-img img-fluid"><img src={`data:${user.avatar.contentType};base64,${bufferToBase64(user.avatar.data.data)}`} alt="story-img" className="rounded-circle avatar-40" /></div>
                    <div className="media-support-info ml-3">
                        <h6>Paul Molive</h6>
                        <p className="mb-0">Brothe</p>
                    </div>
                    <div className="edit-relation d-link"><span><i className="fal fa-pencil mr-2" />Edit</span></div>
                </li>
            </ul>
        </div>

    )
}

export default Family