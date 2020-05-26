import React, { useState, Fragment } from 'react'
import Select from 'react-select';
import DatePicker from "react-datepicker";
import axios from 'axios'
import { updateUser } from '../../../../../actions/auth';
import { useDispatch } from 'react-redux';
import Moment from 'react-moment';
import LivedForm from './LivedForm';

const Lived = ({ user }) => {
    const [addPlace, setAddPlace] = useState(false);
    const [editPlace, setEditPlace] = useState([]);
    const [formData, setFormData] = useState({
        placename: "",
        from: "",
        privacy: 0
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

    const toggleEdit = (i) => {
        if (editPlace.includes(i)) setEditPlace(editPlace.filter(item => item !== i))
        else setEditPlace([...editPlace, i])
    }

    const submitAddPlace = async (e) => {
        e.preventDefault();
        const res = await axios.put('/user/add-placelived', formData);
        if (res.data.success) {
            dispatch(updateUser(res.data.user));
            setAddPlace(false);
        }
    };

    return (
        <div className="tab-pane fade" id="lived" role="tabpanel">
            <h4 className="mb-3">Những nơi bạn đã sống</h4>
            <div className="d-flex mb-4 align-items-center pointer" onClick={e => setAddPlace(true)}>
                <div className="user-img img-fluid"><i className="fal fa-plus" /></div>
                <div className="media-support-info ml-3">
                    <h6>Thêm địa điểm</h6>
                </div>
            </div>
            {
                addPlace ?
                    <form onSubmit={submitAddPlace}>
                        <div>
                            <input
                                className="input-light-primary text-primary bdrs5 p-3 mb-3 font-size-16"
                                type="text"
                                name="placename"
                                required
                                onChange={handleInputChange}
                                placeholder="Tên Tỉnh/Thành phố..."
                            />
                            <div className="d-flex">
                                <div className="col-6">
                                    <span className="mr-3">Chuyển đến từ</span>
                                    <DatePicker
                                        className="input-light-primary br-0 text-primary bdrs5 p-1"
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
                                    defaultValue={privacy[0]}
                                    onChange={handleChangePrivacy}
                                />
                                <button type="submit" className="btn text-primary ml-5 box-like-btn">Lưu</button>
                                <span className="btn text-danger ml-2 box-like-btn" onClick={e => setAddPlace(false)}>Hủy</span>
                            </div>
                        </div>
                    </form>
                    : null
            }
            <div className="suggestions-lists m-0 p-0">
                {
                    user.placeslived.map((place, i) =>
                        <Fragment key={i}>
                            {editPlace.includes(i) ?
                                <div>
                                    <h6 className="mb-2">Chỉnh sửa trường học *</h6>
                                    <LivedForm place={place} i={i} toggleEdit={toggleEdit} />
                                </div> :
                                <div className="d-flex mb-4 align-items-center">
                                    <div className="user-img img-fluid"><img src={require('../../../../../images/small/10.png')} alt="story-img" className="rounded-circle avatar-30" /></div>
                                    <div className="media-support-info ml-3">
                                        <h6>
                                            <strong className="d-link"> {place.placename} </strong>
                                        </h6>
                                        <p className="mb-0">Chuyển đến từ&nbsp;
                                                <Moment format='YYYY'>{place.from}</Moment>
                                        </p>
                                    </div>
                                    <div className="edit-relation d-link">
                                        <span onClick={e => toggleEdit(i)}>
                                            <i className="fal fa-pencil mr-2" />Chỉnh sửa
                                    </span>
                                    </div>
                                </div>
                            }
                        </Fragment>
                    )
                }
            </div>
        </div>
    )
}

export default Lived
