import React, { useState } from 'react'
import Moment from 'react-moment';
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { updateUser } from '../../../../../actions/auth';

const BasicInfo = ({ user }) => {
    const userauth = useSelector(state => state.auth.user);
    const [edit, setEdit] = useState({
        phone: false,
        address: false,
        facebookUrl: false,
        twitterUrl: false,
        instagramUrl: false,
        googleUrl: false,
        youtubeUrl: false,
        linkedinUrl: false,
        birthday: false,
        gender: false,
        interestedIn: false,
    })
    const [formData, setFormData] = useState({});
    const [startDate, setStartDate] = useState(new Date(user.birthday));
    const dispatch = useDispatch();
    
    const onEdit = (e) => {
        const option = e.currentTarget.attributes['name'].value
        setEdit({ ...edit, [option]: !edit[option] })
    }

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        let key = e.currentTarget.attributes['name'].value;
        let item;
        if (key.includes("Url")) {
            item = { [`social.${key}`]: formData[key] }
        } else {
            item = { [key]: formData[key] };
        }
        const res = await axios.put('/user/update-info', item);
        if (res.data.success) {
            dispatch(updateUser(res.data.user));
        }
        setEdit({ ...edit, [key]: false })
        setFormData({ ...formData, [key]: "" });
    }

    const onSubmitDate = async (date) => {
        const res = await axios.put('/user/update-info', {birthday: date});
        if (res.data.success) {
            dispatch(updateUser(res.data.user));
        }
        setEdit({ ...edit, birthday: false })
    }

    return userauth ? (
        <div className="tab-pane fade active show" id="basicinfo" role="tabpanel">
            <h4>Thông tin liên lạc</h4>
            <hr/>
            <div>
                <div className="row">
                    <div className="col-3">
                        <h6>Email</h6>
                    </div>
                    <div className="col-7">
                        <p className="mb-0">
                            {user.email}
                        </p>
                    </div>
                    <div className="col-2">
                        <div className="edit-relation d-link"><i className="fal fa-pencil mr-2" />Chỉnh sửa</div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-3">
                        <h6>Số điện thoại</h6>
                    </div>
                    <div className="col-7">
                        {
                            !edit.phone ? <p className="mb-0">{user.phone ? user.phone : "Bạn chưa cập nhập số điện thoại"}</p> :
                                <div>
                                    <input className="input-light-primary br-0 text-primary br-5 p-1" type="text"
                                        name="phone" onChange={onChange}
                                    />
                                    <div className="mt-1 mb-3">
                                        <span className="btn text-primary" onClick={onSubmit} name="phone">Lưu</span>
                                        <span className="btn text-danger ml-2" onClick={onEdit} name="phone">Hủy</span>
                                    </div>
                                </div>
                        }

                    </div>
                    <div className="col-2">
                        <div onClick={onEdit} className="edit-relation d-link" name="phone"><i className="fal fa-pencil mr-2" />Chỉnh sửa</div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-3">
                        <h6>Sống tại</h6>
                    </div>
                    <div className="col-7">
                        {
                            !edit.address ? <p className="mb-0"> {user.address ? user.address : "Bạn chưa cập nhập số địa chỉ"} </p> :
                                <div>
                                    <input className="input-light-primary br-0 text-primary br-5 p-1" type="text"
                                        name="address" onChange={onChange}
                                    />
                                    <div className="mt-1 mb-3">
                                        <span className="btn text-primary" onClick={onSubmit} name="address">Lưu</span>
                                        <span className="btn text-danger ml-2" onClick={onEdit} name="address">Hủy</span>
                                    </div>
                                </div>
                        }
                    </div>
                    <div className="col-2">
                        <div onClick={onEdit} className="edit-relation d-link" name="address"><i className="fal fa-pencil mr-2" />Chỉnh sửa</div>
                    </div>
                </div>
            </div>
            <h4 className="mt-3">Trang web và liên kết xã hội</h4>
            <hr />
            <div className="row">
                <div className="col-3">
                    <h6>Facebook</h6>
                </div>
                <div className="col-7">
                    {
                        !edit.facebookUrl ? <p className="mb-0"> {user.social && user.social.facebookUrl ? user.social.facebookUrl : "Chưa cập nhập đường dẫn đến facebook người dùng"} </p> :
                            <div>
                                <input className="input-light-primary br-0 text-primary br-5 p-1" type="text"
                                    onChange={onChange} name="facebookUrl" />
                                <div className="mt-1 mb-3">
                                    <span className="btn text-primary" onClick={onSubmit} name="facebookUrl">Lưu</span>
                                    <span className="btn text-danger ml-2" onClick={onEdit} name="facebookUrl">Hủy</span>
                                </div>
                            </div>
                    }
                </div>
                <div className="col-2">
                    <div onClick={onEdit} className="edit-relation d-link" name="facebookUrl"><i className="fal fa-pencil mr-2" />Chỉnh sửa</div>
                </div>
                <div className="col-3">
                    <h6>Twitter</h6>
                </div>
                <div className="col-7">
                    {
                        !edit.twitterUrl ? <p className="mb-0"> {user.social && user.social.twitterUrl ? user.social.twitterUrl : "Chưa cập nhập đường dẫn đến twitter người dùng"} </p> :
                            <div>
                                <input className="input-light-primary br-0 text-primary br-5 p-1" type="text"
                                    onChange={onChange} name="twitterUrl" />
                                <div className="mt-1 mb-3">
                                    <span className="btn text-primary" onClick={onSubmit} name="twitterUrl">Lưu</span>
                                    <span className="btn text-danger ml-2" onClick={onEdit} name="twitterUrl">Hủy</span>
                                </div>
                            </div>
                    }
                </div>
                <div className="col-2">
                    <div onClick={onEdit} className="edit-relation d-link" name="twitterUrl"><i className="fal fa-pencil mr-2" />Chỉnh sửa</div>
                </div>
                <div className="col-3">
                    <h6>Instagram</h6>
                </div>
                <div className="col-7">
                    {
                        !edit.instagramUrl ? <p className="mb-0"> {user.social && user.social.instagramUrl ? user.social.instagramUrl : "Chưa cập nhập đường dẫn đến instagram người dùng"} </p> :
                            <div>
                                <input className="input-light-primary br-0 text-primary br-5 p-1" type="text"
                                    onChange={onChange} name="instagramUrl" />
                                <div className="mt-1 mb-3">
                                    <span className="btn text-primary" onClick={onSubmit} name="instagramUrl">Lưu</span>
                                    <span className="btn text-danger ml-2" onClick={onEdit} name="instagramUrl">Hủy</span>
                                </div>
                            </div>
                    }
                </div>
                <div className="col-2">
                    <div onClick={onEdit} className="edit-relation d-link" name="instagramUrl"><i className="fal fa-pencil mr-2" />Chỉnh sửa</div>
                </div>
                <div className="col-3">
                    <h6>Google plus</h6>
                </div>
                <div className="col-7">
                    {
                        !edit.googleUrl ? <p className="mb-0"> {user.social && user.social.googleUrl ? user.social.googleUrl : "Chưa cập nhập đường dẫn đến google người dùng"} </p> :
                            <div>
                                <input className="input-light-primary br-0 text-primary br-5 p-1" type="text"
                                    onChange={onChange} name="googleUrl" />
                                <div className="mt-1 mb-3">
                                    <span className="btn text-primary" onClick={onSubmit} name="googleUrl">Lưu</span>
                                    <span className="btn text-danger ml-2" onClick={onEdit} name="googleUrl">Hủy</span>
                                </div>
                            </div>
                    }
                </div>
                <div className="col-2">
                    <div onClick={onEdit} className="edit-relation d-link" name="googleUrl"><i className="fal fa-pencil mr-2" />Chỉnh sửa</div>
                </div>
                <div className="col-3">
                    <h6>Youtube</h6>
                </div>
                <div className="col-7">
                    {
                        !edit.youtubeUrl ? <p className="mb-0"> {user.social && user.social.youtubeUrl ? user.social.youtubeUrl : "Chưa cập nhập đường dẫn đến youtube người dùng"} </p> :
                            <div>
                                <input className="input-light-primary br-0 text-primary br-5 p-1" type="text"
                                    onChange={onChange} name="youtubeUrl" />
                                <div className="mt-1 mb-3">
                                    <span className="btn text-primary" onClick={onSubmit} name="youtubeUrl">Lưu</span>
                                    <span className="btn text-danger ml-2" onClick={onEdit} name="youtubeUrl">Hủy</span>
                                </div>
                            </div>
                    }
                </div>
                <div className="col-2">
                    <div onClick={onEdit} className="edit-relation d-link" name="youtubeUrl"><i className="fal fa-pencil mr-2" />Chỉnh sửa</div>
                </div>
                <div className="col-3">
                    <h6>Linkedin</h6>
                </div>
                <div className="col-7">
                    {
                        !edit.linkedinUrl ? <p className="mb-0"> {user.social && user.social.linkedinUrl ? user.social.linkedinUrl : "Chưa cập nhập đường dẫn đến linked-in người dùng"} </p> :
                            <div>
                                <input className="input-light-primary br-0 text-primary br-5 p-1" type="text"
                                    onChange={onChange} name="linkedinUrl" />
                                <div className="mt-1 mb-3">
                                    <span className="btn text-primary" onClick={onSubmit} name="linkedinUrl">Lưu</span>
                                    <span className="btn text-danger ml-2" onClick={onEdit} name="linkedinUrl">Hủy</span>
                                </div>
                            </div>
                    }
                </div>
                <div className="col-2">
                    <div onClick={onEdit} className="edit-relation d-link" name="linkedinUrl"><i className="fal fa-pencil mr-2" />Chỉnh sửa</div>
                </div>
            </div>
            <h4 className="mt-3">Thông tin cơ bản</h4>
            <hr />
            <div className="row">
                <div className="col-3">
                    <h6>Ngày sinh</h6>
                </div>
                <div className="col-7">
                    {
                        !edit.birthday ? user.birthday ? 
                                <p className="mb-0"><Moment format='DD/MM/YYYY'>{user.birthday}</Moment></p> :
                                <p className="mb-0">Chưa cập nhập</p> :
                            <div>
                                <DatePicker
                                className="input-light-primary br-0 text-primary br-5 p-1"
                                dateFormat="dd/MM/yyyy"
                                maxDate={new Date()}
                                selected={startDate} onChange={date => setStartDate(date)}/>
                                <div className="mt-1 mb-3">
                                    <span className="btn text-primary" onClick={e =>  onSubmitDate(startDate)} name="birthday">Lưu</span>
                                    <span className="btn text-danger ml-2" onClick={onEdit} name="birthday">Hủy</span>
                                </div>
                            </div>
                    }
                </div>
                <div className="col-2">
                    <div onClick={onEdit} className="edit-relation d-link" name="birthday"><i className="fal fa-pencil mr-2" />Chỉnh sửa</div>
                </div>
                <div className="col-3">
                    <h6>Giới tính</h6>
                </div>
                <div className="col-7">
                    {
                        !edit.gender ? user.gender? 
                            <p className="mb-0"> {user.gender === "male" ? "Nam" : "Nữ"} </p>:
                            <p className="mb-0"> Chưa cập nhập</p>
                            :
                            <div>
                                <input className="input-light-primary br-0 text-primary br-5 p-1" type="text"
                                    onChange={onChange} name="gender" />
                                <div className="mt-1 mb-3">
                                    <span className="btn text-primary" onClick={onSubmit} name="gender">Lưu</span>
                                    <span className="btn text-danger ml-2" onClick={onEdit} name="gender">Hủy</span>
                                </div>
                            </div>
                    }
                </div>
                <div className="col-2">
                    <div onClick={onEdit} className="edit-relation d-link" name="gender"><i className="fal fa-pencil mr-2" />Chỉnh sửa</div>
                </div>
                <div className="col-3">
                    <h6>Quan tâm</h6>
                </div>
                <div className="col-7">
                    {
                        !edit.interestedIn ? <p className="mb-0"> {user.interestedIn ? user.interestedIn : "Chưa cập nhập"} </p> :
                            <div>
                                <input className="input-light-primary br-0 text-primary br-5 p-1" type="text"
                                    onChange={onChange} name="interestedIn" />
                                <div className="mt-1 mb-3">
                                    <span className="btn text-primary" onClick={onSubmit} name="interestedIn">Lưu</span>
                                    <span className="btn text-danger ml-2" onClick={onEdit} name="interestedIn">Hủy</span>
                                </div>
                            </div>
                    }

                </div>
                <div className="col-2">
                    <div onClick={onEdit} className="edit-relation d-link" name="interestedIn"><i className="fal fa-pencil mr-2" />Chỉnh sửa</div>
                </div>
            </div>
        </div>
    ) : null
}

export default BasicInfo