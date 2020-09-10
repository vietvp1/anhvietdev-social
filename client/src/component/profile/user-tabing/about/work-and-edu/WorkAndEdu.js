import React, { useState, Fragment } from 'react'
import Select from 'react-select';
import DatePicker from "react-datepicker";
import axios from 'axios'
import { updateUser } from '../../../../../actions/auth';
import { useDispatch } from 'react-redux';
import Moment from 'react-moment';
import WorkForm from './WorkForm';
import Swal from 'sweetalert2';
import EduForm from './EduForm';

const WorkAndEdu = ({ user }) => {
    const [addWork, setAddWork] = useState(false);
    const [editWork, setEditWork] = useState([]);
    const [addSkill, setAddSkill] = useState(false);
    const [skillText, setSkillText] = useState('');
    const [addEdu, setAddEdu] = useState(false);
    const [editEdu, setEditEdu] = useState([]);
    const [formWorkData, setFormWorkData] = useState({
        company: "",
        position: "",
        from: "",
        to: "",
        current: false,
    });
    const [formEduData, setFormEduData] = useState({
        school: "",
        fieldofstudy: "",
        from: "",
        to: "",
        current: false,
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
    const handleChangePrivacyWork = selectedOption => {
        setFormWorkData(oldCredentials => ({
            ...oldCredentials,
            privacy: selectedOption.value
        }));
    };
    const handleChangePrivacyEdu = selectedOption => {
        setFormEduData(oldCredentials => ({
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

    const toggleEditWork = (i) => {
        if (editWork.includes(i)) setEditWork(editWork.filter(item => item !== i))
        else setEditWork([...editWork, i])
    }

    const submitAddWork = async (e) => {
        e.preventDefault();
        const res = await axios.put('/user/add-work', formWorkData);
        if (res.data.success) {
            dispatch(updateUser(res.data.user));
            setAddWork(false);
        }
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

    const toggleEditEdu = (i) => {
        if (editEdu.includes(i)) setEditEdu(editEdu.filter(item => item !== i))
        else setEditEdu([...editWork, i])
    }

    const submitAddEdu = async (e) => {
        e.preventDefault();
        const res = await axios.put('/user/add-education', formEduData);
        if (res.data.success) {
            dispatch(updateUser(res.data.user));
            setAddEdu(false);
        }
    };

    const submitAddSkill = async (e) => {
        e.preventDefault();
        if (user.skills.map(v => v.skillname.toLowerCase().trim()).includes(skillText.toLowerCase().trim())) {
            Swal.fire({
                icon: 'error',
                title: 'Bạn đã thêm kỹ năng này rồi.',
                timer: 3000,
            })
        } else {
            const res = await axios.put('/user/add-skill', { skill: skillText });
            if (res.data.success) {
                dispatch(updateUser(res.data.user));
                setAddSkill(false);
            }
        }
    }

    const deleteSkill = async (skillId) => {
        const res = await axios.put('/user/delete-skill', { skillId });
        if (res.data.success) {
            dispatch(updateUser(res.data.user));
        }
    }

    return (
        <div className="tab-pane fade" id="work" role="tabpanel">
            <h4 className="mb-3">Công việc</h4>
            <div className="suggestions-lists m-0 p-0">
                {
                    addWork ?
                        <form onSubmit={submitAddWork}>
                            <div>
                                <input
                                    className="input-light-primary text-primary br-5 p-3 mb-3 font-size-16"
                                    type="text"
                                    name="company"
                                    required
                                    onChange={handleInputChangeWork}
                                    placeholder="Công ty..."
                                />
                                <input
                                    className="input-light-primary text-primary br-5 p-3 mb-3 font-size-16"
                                    type="text"
                                    name="position"
                                    required
                                    onChange={handleInputChangeWork}
                                    placeholder="Chức vụ..."
                                />
                                <input
                                    className="input-light-primary text-primary br-5 p-3 mb-3 font-size-16"
                                    type="text"
                                    name="location"
                                    onChange={handleInputChangeWork}
                                    placeholder="Nơi làm việc..."
                                />
                                <input
                                    className="input-light-primary text-primary br-5 p-3 mb-3 font-size-16"
                                    type="text"
                                    name="description"
                                    onChange={handleInputChangeWork}
                                    placeholder="Mô tả..."
                                />
                                <div className="mb-2">Khoảng thời gian</div>

                                <label className="d-flex mb-3" style={{ alignItems: 'center' }}>
                                    <input
                                        name="current"
                                        type="checkbox"
                                        value={formWorkData.current}
                                        onChange={handleInputChangeWork}
                                    />
                                    <div className="ml-2">Tôi đang làm việc ở đây</div>
                                </label>

                                <div className="d-flex">
                                    <div className="col-6">
                                        <span className="mr-3">Từ năm</span>
                                        <DatePicker
                                            className="input-light-primary br-0 text-primary br-5 p-1"
                                            dateFormat="yyyy"
                                            minDate={1 / 1 / 2000}
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
                                                    className="input-light-primary br-0 text-primary br-5 p-1"
                                                    dateFormat="yyyy"
                                                    minDate={1 / 1 / 2000}
                                                    required
                                                    placeholderText="Đến năm"
                                                    maxDate={new Date()}
                                                    selected={formWorkData.to}
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
                                        width='200px'
                                        placeholder="Quyền riêng tư"
                                        onChange={handleChangePrivacyWork}
                                    />
                                    <button type="submit" className="btn text-primary ml-5 box-like-btn">Lưu</button>
                                    <span className="btn text-danger ml-2 box-like-btn" onClick={e => setAddWork(false)}>Hủy</span>
                                </div>
                            </div>
                        </form>
                        :
                        <div className="d-flex mb-4 align-items-center pointer" onClick={e => setAddWork(true)}>
                            <div className="user-img img-fluid"><i className="fal fa-plus" /></div>
                            <div className="media-support-info ml-3">
                                <h6>Thêm nơi làm việc</h6>
                            </div>
                        </div>
                }
                {
                    user.work.map((w, i) =>
                        <Fragment key={i}>
                            {editWork.includes(i) ?
                                <div>
                                    <h6 className="mb-2">Chỉnh sửa công việc *</h6>
                                    <WorkForm w={w} i={i} toggleEditWork={toggleEditWork} />
                                </div> :
                                <div className="d-flex mb-4 align-items-center">
                                    <div className="user-img img-fluid"><img src={require('../../../../../images/skillman.jpg')} alt="story-img" className="rounded-circle avatar-40" /></div>
                                    <div className="media-support-info ml-3">
                                        <h6>{w.position} tại
                                            <strong className="d-link"> {w.company} </strong>
                                        </h6>
                                        {
                                            w.current ? <p className="mb-0">Đang làm việc tại đây từ&nbsp;
                                                <Moment format='YYYY'>{w.from}</Moment>
                                            </p> :
                                                <p className="mb-0">Đã làm việc tại đây từ&nbsp;
                                                <Moment format='YYYY'>{w.from}</Moment> đến <Moment format='YYYY'>{w.to}</Moment>
                                                </p>
                                        }
                                    </div>
                                    <div className="edit-relation d-link">
                                        <span onClick={e => toggleEditWork(i)}>
                                            <i className="fal fa-pencil mr-2" />Chỉnh sửa
                                    </span>
                                    </div>
                                </div>
                            }
                        </Fragment>
                    )
                }
            </div>

            <h4 className="mb-3">Kỹ năng</h4>
            <div className="m-0 p-0">
                {
                    addSkill ?
                        <form onSubmit={submitAddSkill}>
                            <input
                                className="input-light-primary br-0 text-primary br-5 p-2"
                                type="text"
                                required
                                onChange={e => setSkillText(e.target.value)}
                                placeholder="Thêm kỹ năng..."
                            />
                            <div className="mt-1 mb-3">
                                <button type="submit" className="btn text-primary">Lưu</button>
                                <span className="btn text-danger ml-2" onClick={e => setAddSkill(false)}>Hủy</span>
                            </div>
                        </form> :
                        <div className="d-flex mb-4 align-items-center pointer" onClick={e => setAddSkill(true)}>
                            <div className="user-img img-fluid"><i className="fal fa-plus" /></div>
                            <div className="media-support-info ml-3">
                                <h6>Thêm kỹ năng</h6>
                            </div>
                        </div>
                }

                {
                    user.skills.map((skill, i) =>
                        <Fragment key={i}>
                            <div className="d-flex mb-4 align-items-center">
                                <div className="user-img img-fluid"><img src={require('../../../../../images/Man_at_work.png')} alt="story-img" className="rounded-circle avatar-35" /></div>
                                <div className="media-support-info ml-3">
                                    <strong className="d-link"> {skill.skillname} </strong>
                                </div>
                                <div className="edit-relation d-link">
                                    <span onClick={e => deleteSkill(skill._id)}>
                                        <i className="fal fa-trash-alt mr-2" />Xóa
                                    </span>
                                </div>
                            </div>
                        </Fragment>
                    )
                }
            </div>

            <h4 className="mt-3 mb-3">Trường đại học</h4>
            <div className="suggestions-lists m-0 p-0">
                {
                    addEdu ?
                        <form onSubmit={submitAddEdu}>
                            <div>
                                <input
                                    className="input-light-primary text-primary br-5 p-3 mb-3 font-size-16"
                                    type="text"
                                    name="school"
                                    required
                                    onChange={handleInputChangeEdu}
                                    placeholder="Tên trường..."
                                />
                                <input
                                    className="input-light-primary text-primary br-5 p-3 mb-3 font-size-16"
                                    type="text"
                                    name="fieldofstudy"
                                    required
                                    onChange={handleInputChangeEdu}
                                    placeholder="Chuyên ngành..."
                                />
                                <input
                                    className="input-light-primary text-primary br-5 p-3 mb-3 font-size-16"
                                    type="text"
                                    name="location"
                                    onChange={handleInputChangeEdu}
                                    placeholder="Địa điểm..."
                                />
                                <input
                                    className="input-light-primary text-primary br-5 p-3 mb-3 font-size-16"
                                    type="text"
                                    name="description"
                                    onChange={handleInputChangeEdu}
                                    placeholder="Mô tả..."
                                />
                                <div className="mb-2">Khoảng thời gian</div>

                                <label className="d-flex mb-3" style={{ alignItems: 'center' }}>
                                    <input
                                        name="current"
                                        type="checkbox"
                                        value={formEduData.current}
                                        onChange={handleInputChangeEdu}
                                    />
                                    <div className="ml-2">Tôi đang học tập ở đây</div>
                                </label>

                                <div className="d-flex">
                                    <div className="col-6">
                                        <span className="mr-3">Từ năm</span>
                                        <DatePicker
                                            className="input-light-primary br-0 text-primary br-5 p-1"
                                            dateFormat="yyyy"
                                            minDate={1 / 1 / 2000}
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
                                                    className="input-light-primary br-0 text-primary br-5 p-1"
                                                    dateFormat="yyyy"
                                                    minDate={1 / 1 / 2000}
                                                    required
                                                    placeholderText="Đến năm"
                                                    maxDate={new Date()}
                                                    selected={formEduData.to}
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
                                        width='200px'
                                        placeholder="Quyền riêng tư"
                                        onChange={handleChangePrivacyEdu}
                                    />
                                    <button type="submit" className="btn text-primary ml-5 box-like-btn">Lưu</button>
                                    <span className="btn text-danger ml-2 box-like-btn" onClick={e => setAddEdu(false)}>Hủy</span>
                                </div>
                            </div>
                        </form>
                        :
                        <div className="d-flex mb-4 align-items-center pointer" onClick={e => setAddEdu(true)}>
                            <div className="user-img img-fluid"><i className="fal fa-plus" /></div>
                            <div className="media-support-info ml-3">
                                <h6>Thêm trường</h6>
                            </div>
                        </div>
                }

                {
                    user.education.map((edu, i) =>
                        <Fragment key={i}>
                            {editEdu.includes(i) ?
                                <div>
                                    <h6 className="mb-2">Chỉnh sửa trường học *</h6>
                                    <EduForm edu={edu} i={i} toggleEditEdu={toggleEditEdu} />
                                </div> :
                                <div className="d-flex mb-4 align-items-center">
                                    <div className="user-img img-fluid"><img src={require('../../../../../images/school.jpg')} alt="story-img" className="rounded-circle avatar-40" /></div>
                                    <div className="media-support-info ml-3">
                                        <h6>{edu.fieldofstudy} tại
                                            <strong className="d-link"> {edu.school} </strong>
                                        </h6>
                                        {
                                            edu.current ? <p className="mb-0">Đang học ở đây từ&nbsp;
                                                <Moment format='YYYY'>{edu.from}</Moment>
                                            </p> :
                                                <p className="mb-0">Đã học ở đây từ&nbsp;
                                                <Moment format='YYYY'>{edu.from}</Moment> đến <Moment format='YYYY'>{edu.to}</Moment>
                                                </p>
                                        }
                                    </div>
                                    <div className="edit-relation d-link">
                                        <span onClick={e => toggleEditEdu(i)}>
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

export default WorkAndEdu