import React, { useState } from 'react'
import Select from 'react-select';
import DatePicker from "react-datepicker";
import axios from 'axios'
import { updateUser } from '../../../../../actions/auth';
import { useDispatch } from 'react-redux';

const WorkForm = ({ w, i, toggleEditWork }) => {
    const [formWorkData, setFormWorkData] = useState({
        _id: w._id,
        company: w.company,
        position: w.position,
        location: w.location,
        description: w.description,
        from: new Date(w.from),
        to: w.to ? new Date(w.to) : "",
        current: w.current,
        privacy: w.privacy,
    });
    const dispatch = useDispatch();
    const privacy = [
        { value: 0, label: 'Chỉnh mình tôi' },
        { value: 1, label: 'Công khai' },
        { value: 2, label: 'Bạn bè'},
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
        setFormWorkData(oldCredentials => ({
            ...oldCredentials,
            privacy: selectedOption.value
        }));
    };

    const handleInputChangeWork = event => {
        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        if (target.type === "checkbox" && value) {
            setFormWorkData(oldCredentials => ({
                ...oldCredentials,
                to: ""
            }));
        }
        const name = target.name;
        setFormWorkData(oldCredentials => ({
            ...oldCredentials,
            [name]: value
        }));
    };

    const submitUpdateWork = async (e) => {
        e.preventDefault();
        const res = await axios.put('/user/update-work', formWorkData);
        if (res.data.success) {
            dispatch(updateUser(res.data.user));
            toggleEditWork(i);
        }
    };

    const deleteWork = async (workId) => {
        const res = await axios.put('/user/delete-work', { workId });
        if (res.data.success) {
            dispatch(updateUser(res.data.user));
            toggleEditWork(i);
        }
    }

    return (
        <form onSubmit={submitUpdateWork}>
            <div>
                <input
                    className="input-light-primary text-primary bdrs5 p-3 mb-3 font-size-16"
                    type="text"
                    name="company"
                    value={formWorkData.company}
                    required
                    onChange={handleInputChangeWork}
                    placeholder="Công ty..."
                />
                <input
                    className="input-light-primary text-primary bdrs5 p-3 mb-3 font-size-16"
                    type="text"
                    name="position"
                    value={formWorkData.position}
                    required
                    onChange={handleInputChangeWork}
                    placeholder="Chức vụ..."
                />
                <input
                    className="input-light-primary text-primary bdrs5 p-3 mb-3 font-size-16"
                    type="text"
                    name="location"
                    value={formWorkData.location}
                    onChange={handleInputChangeWork}
                    placeholder="Nơi làm việc..."
                />
                <input
                    className="input-light-primary text-primary bdrs5 p-3 mb-3 font-size-16"
                    type="text"
                    name="description"
                    value={formWorkData.description}
                    onChange={handleInputChangeWork}
                    placeholder="Mô tả..."
                />
                <div className="mb-2">Khoảng thời gian</div>

                <label className="d-flex mb-3" style={{ alignItems: 'center' }}>
                    <input
                        name="current"
                        type="checkbox"
                        checked={formWorkData.current}
                        onChange={handleInputChangeWork}
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
                            selected={formWorkData.from}
                            onChange={date => setFormWorkData(oldCredentials => ({
                                ...oldCredentials,
                                from: date
                            }))}
                        />
                    </div>
                    {
                        !formWorkData.current ?
                            <div className="col-6">
                                <span className="mr-3">Đến năm</span>
                                <DatePicker
                                    className="input-light-primary br-0 text-primary bdrs5 p-1"
                                    dateFormat="yyyy"
                                    required
                                    placeholderText="Đến năm"
                                    maxDate={new Date()}
                                    selected={formWorkData.to ? formWorkData.to : new Date()}
                                    onChange={date => setFormWorkData(oldCredentials => ({
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
                        defaultValue={privacy[formWorkData.privacy]}
                        width='200px'
                        placeholder="Quyền riêng tư"
                        onChange={handleChangePrivacy}
                    />
                    <button type="submit" className="btn text-primary ml-5 box-like-btn" >Lưu</button>
                    <span className="btn text-danger ml-2 box-like-btn" onClick={e => toggleEditWork(i)}>Hủy</span>
                    <span className="btn text-danger ml-2 box-like-btn" onClick={e => deleteWork(w._id)}>Xóa</span>
                </div>
            </div>
        </form>
    )
}

export default WorkForm