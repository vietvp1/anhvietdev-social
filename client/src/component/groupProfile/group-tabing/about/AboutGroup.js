import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/vi';
import Select from 'react-select';
import axios from 'axios'
moment.locale('vi')

const AboutGroup = ({ group }) => {
    const [edit, setEdit] = useState({
        privacy: false,
    })
    const [formGroupData, setFormGroupData] = useState({
        privacy: group.privacy,
    });

    const privacyList = [
        { value: 0, label: 'Bí mật' },
        { value: 1, label: 'Riêng tư' },
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
        setFormGroupData(oldCredentials => ({
            ...oldCredentials,
            privacy: selectedOption.value
        }));
    };

    const onSubmit = async (e) => {
        let key = e.currentTarget.attributes['name'].value;
        const res = await axios.put('/group/update-group-info', { groupId: group._id, [key]: formGroupData[key] })
        if (res.data.success) {
            group.privacy = res.data.group.privacy
        }
        setEdit({ ...edit, [key]: false })
    }

    const onEdit = (e) => {
        const option = e.currentTarget.attributes['name'].value;
        setEdit({ ...edit, [option]: !edit[option] })
    }

    return (
        <div className="tab-pane fade" id="about-group" role="tabpanel">
            <div className="pl-5 pr-5">
                <div>
                    <h4>Giới thiệu nhóm</h4>
                    <hr />
                    <div>
                        {
                            group.yourRole === 'ADMIN' ?
                                <div className="float-right">
                                    <div
                                        name='privacy'
                                        onClick={onEdit}
                                        className="edit-relation d-link">
                                        <i className="fal fa-pencil mr-2" />
                                                    Chỉnh sửa
                                                </div>
                                </div> : null
                        }

                        {
                            edit.privacy ?
                                <div className="form-group">
                                    <label htmlFor="grPrivacy">Chọn quyền riêng tư cho nhóm</label>
                                    <Select
                                        id="grPrivacy"
                                        classNamePrefix="react-select"
                                        options={privacyList}
                                        styles={privacyStyles}
                                        defaultValue={privacyList[group.privacy]}
                                        width='200px'
                                        placeholder="Quyền riêng tư"
                                        onChange={handleChangePrivacy}
                                    />
                                    <div className="mt-3 mb-3">
                                        <span className="btn iq-bg-primary iq-bg-primary-hover" onClick={onSubmit} name="privacy">Lưu</span>
                                        <span className="btn iq-bg-danger iq-bg-danger-hover ml-2" onClick={onEdit} name="privacy">Hủy</span>
                                    </div>
                                </div> :
                                group.privacy === 1 ?
                                    <Fragment>
                                        <div className="d-flex mb-3">
                                            <div className="icon font-size-20"><i className="fal fa-lock-alt" /></div>
                                            <div className="data col-10">
                                                <h6>Riêng tư</h6>
                                                <p className="mb-0">Chỉ thành viên mới nhìn thấy mọi người trong nhóm và những gì họ đăng.</p>
                                            </div>
                                        </div>

                                        <div className="d-flex mb-3">
                                            <div className="icon font-size-20"><i className="fal fa-eye"></i></div>
                                            <div className="data col-10">
                                                <h6>Hiển thị</h6>
                                                <p className="mb-0">Ai cũng có thể tìm nhóm này.</p>
                                            </div>
                                        </div>
                                    </Fragment> :
                                    <Fragment>
                                        <div className="d-flex mb-3">
                                            <div className="icon font-size-20"><i className="fal fa-lock-alt" /></div>
                                            <div className="data col-10">
                                                <h6>Bí mật</h6>
                                                <p className="mb-0">Chỉ thành viên mới nhìn thấy mọi người trong nhóm và những gì họ đăng.</p>
                                            </div>
                                        </div>

                                        <div className="d-flex mb-3">
                                            <div className="icon font-size-20"><i className="fal fa-eye"></i></div>
                                            <div className="data col-10">
                                                <h6>Hiển thị</h6>
                                                <p className="mb-0">Chỉ thành viên mới có thể tìm nhóm này.</p>
                                            </div>
                                        </div>
                                    </Fragment>
                        }


                        <div className="d-flex mb-3">
                            <div className="icon font-size-20"><i className="fal fa-clock"></i></div>
                            <div className="data ml-2 col-10">
                                <h6>Lịch sử</h6>
                                <p className="mb-0">Đã tạo nhóm vào ngày {moment(group.createdAt).format('LL')}.</p>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="mt-5">
                    <h4>Quản trị viên</h4>
                    <hr />
                    <div>
                        <div className="group-member mb-3">
                            <div className="iq-media-group">
                                {
                                    group.admins.map((m, i) =>
                                        <Link to={`/profile/${m._id}`} key={i} className="iq-media">
                                            <img
                                                className="img-fluid avatar-40 rounded-circle"
                                                src={`${process.env.REACT_APP_UPLOADS_IMG}/${m.avatar}`}
                                                title={m.firstName + " " + m.lastName}
                                                alt={m.firstName + " " + m.lastName} />
                                        </Link>
                                    )
                                }

                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default AboutGroup
