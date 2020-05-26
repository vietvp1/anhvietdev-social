import React, { useState } from 'react'
import Select from 'react-select';
import DatePicker from "react-datepicker";
import axios from 'axios'
import { updateUser } from '../../../../../actions/auth';
import { useDispatch } from 'react-redux';

const EduForm = ({ edu, i, toggleEditEdu }) => {
    const [formEduData, setFormEduData] = useState({
        _id: edu._id,
        school: edu.school,
        fieldofstudy: edu.fieldofstudy,
        location: edu.location,
        description: edu.description,
        from: new Date(edu.from),
        to: edu.to ? new Date(edu.to) : "",
        current: edu.current,
        privacy: edu.privacy,
    });
    const dispatch = useDispatch();
    const privacy = [
        { value: 0, label: 'Chỉnh mình tôi' },
        { value: 1, label: 'Công khai' },
        { value: 2, label: 'Bạn bè' },
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

    const handleChangePrivacy = selectedOption => {
        setFormEduData(oldCredentials => ({
            ...oldCredentials,
            privacy: selectedOption.value
        }));
    };

    const handleInputChangeEdu = event => {
        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        if (target.type === "checkbox" && value) {
            setFormEduData(oldCredentials => ({
                ...oldCredentials,
                to: ""
            }));
        }
        const name = target.name;
        setFormEduData(oldCredentials => ({
            ...oldCredentials,
            [name]: value
        }));
    };

    const submitUpdateEdu = async (e) => {
        e.preventDefault();
        const res = await axios.put('/user/update-education', formEduData);
        if (res.data.success) {
            dispatch(updateUser(res.data.user));
            toggleEditEdu(i);
        }
    };

    const deleteEdu = async (eduId) => {
        const res = await axios.put('/user/delete-education', { eduId });
        if (res.data.success) {
            dispatch(updateUser(res.data.user));
            toggleEditEdu(i);
        }
    }

    return (
        <form onSubmit={submitUpdateEdu}>
            <div>
                <input
                    className="input-light-primary text-primary bdrs5 p-3 mb-3 font-size-16"
                    type="text"
                    name="school"
                    value={formEduData.school}
                    required
                    onChange={handleInputChangeEdu}
                    placeholder="Tên trường..."
                />
                <input
                    className="input-light-primary text-primary bdrs5 p-3 mb-3 font-size-16"
                    type="text"
                    name="fieldofstudy"
                    value={formEduData.fieldofstudy}
                    required
                    onChange={handleInputChangeEdu}
                    placeholder="Chuyên ngành..."
                />
                <input
                    className="input-light-primary text-primary bdrs5 p-3 mb-3 font-size-16"
                    type="text"
                    name="location"
                    value={formEduData.location}
                    onChange={handleInputChangeEdu}
                    placeholder="Địa điểm..."
                />
                <input
                    className="input-light-primary text-primary bdrs5 p-3 mb-3 font-size-16"
                    type="text"
                    name="description"
                    value={formEduData.description}
                    onChange={handleInputChangeEdu}
                    placeholder="Mô tả..."
                />
                <div className="mb-2">Khoảng thời gian</div>

                <label className="d-flex mb-3" style={{ alignItems: 'center' }}>
                    <input
                        name="current"
                        type="checkbox"
                        checked={formEduData.current}
                        onChange={handleInputChangeEdu}
                    />
                    <div className="ml-2">Tôi đang làm việc ở đây</div>
                </label>

                <div className="d-flex">
                    <div className="col-6">
                        <span className="mr-3">Từ năm</span>
                        <DatePicker
                            className="input-light-primary br-0 text-primary bdrs5 p-1"
                            dateFormat="yyyy"
                            required
                            placeholderText="Từ năm"
                            maxDate={new Date()}
                            selected={formEduData.from}
                            onChange={date => setFormEduData(oldCredentials => ({
                                ...oldCredentials,
                                from: date
                            }))}
                        />
                    </div>
                    {
                        !formEduData.current ?
                            <div className="col-6">
                                <span className="mr-3">Đến năm</span>
                                <DatePicker
                                    className="input-light-primary br-0 text-primary bdrs5 p-1"
                                    dateFormat="yyyy"
                                    required
                                    placeholderText="Đến năm"
                                    maxDate={new Date()}
                                    selected={formEduData.to ? formEduData.to : ""}
                                    onChange={date => setFormEduData(oldCredentials => ({
                                        ...oldCredentials,
                                        to: date
                                    }))}
                                />
                            </div> : null
                    }
                </div>
                <div className="mt-4 mb-5 d-flex">
                    <Select
                        classNamePrefix="react-select"
                        options={privacy}
                        styles={privacyStyles}
                        defaultValue={privacy[formEduData.privacy]}
                        width='200px'
                        placeholder="Quyền riêng tư"
                        onChange={handleChangePrivacy}
                    />
                    <button type="submit" className="btn text-primary ml-5 box-like-btn" >Lưu</button>
                    <span className="btn text-danger ml-2 box-like-btn" onClick={e => toggleEditEdu(i)}>Hủy</span>
                    <span className="btn text-danger ml-2 box-like-btn" onClick={e => deleteEdu(edu._id)}>Xóa</span>
                </div>
            </div>
        </form>
    )
}

export default EduForm