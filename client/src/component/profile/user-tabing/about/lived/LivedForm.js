import React, { useState } from 'react'
import Select from 'react-select';
import DatePicker from "react-datepicker";
import axios from 'axios'
import { updateUser } from '../../../../../actions/auth';
import { useDispatch } from 'react-redux';

const LivedForm = ({ place, i, toggleEdit }) => {
    const [formData, setFormData] = useState({
        _id: place._id,
        placename: place.placename,
        from: new Date(place.from),
        privacy: place.privacy,
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
        setFormData(oldCredentials => ({
            ...oldCredentials,
            privacy: selectedOption.value
        }));
    };

    const handleInputChange = event => {
        const target = event.target;
        setFormData(oldCredentials => ({
            ...oldCredentials,
            [target.name]: target.value
        }));
    };

    const submitUpdatePlace = async (e) => {
        e.preventDefault();
        const res = await axios.put('/user/update-placelived', formData);
        if (res.data.success) {
            dispatch(updateUser(res.data.user));
            toggleEdit(i);
        }
    };

    const deletePlace = async (placeId) => {
        const res = await axios.put('/user/delete-placelived', { placeId });
        if (res.data.success) {
            dispatch(updateUser(res.data.user));
            toggleEdit(i);
        }
    }

    return (
        <form onSubmit={submitUpdatePlace}>
            <div>
                <input
                    className="input-light-primary text-primary br-5 p-3 mb-3 font-size-16"
                    type="text"
                    name="placename"
                    value={formData.placename}
                    required
                    onChange={handleInputChange}
                    placeholder="Tên Tỉnh/Thành phố..."
                />
                <div className="d-flex">
                    <div className="col-6">
                        <span className="mr-3">Chuyển đến từ</span>
                        <DatePicker
                            className="input-light-primary br-0 text-primary br-5 p-1"
                            dateFormat="dd/MM/yyyy"
                            required
                            placeholderText="Thời gian"
                            maxDate={new Date()}
                            selected={formData.from}
                            onChange={date => setFormData(oldCredentials => ({
                                ...oldCredentials,
                                from: date
                            }))}
                        />
                    </div>
                </div>
                <div className="mt-4 mb-5 d-flex">
                    <Select
                        classNamePrefix="react-select"
                        options={privacy}
                        styles={privacyStyles}
                        width='200px'
                        defaultValue={privacy[formData.privacy]}
                        onChange={handleChangePrivacy}
                    />
                    <button type="submit" className="btn text-primary ml-5 box-like-btn">Lưu</button>
                    <span className="btn text-danger ml-2 box-like-btn" onClick={e => toggleEdit(i)}>Hủy</span>
                    <span className="btn text-danger ml-2 box-like-btn" onClick={e => deletePlace(place._id)}>Xóa</span>
                </div>
            </div>
        </form>
    )
}

export default LivedForm
