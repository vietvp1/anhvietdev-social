import React, { useState, Fragment } from 'react'
import { useDispatch } from 'react-redux';
import axios from 'axios'
import { updateUser } from '../../../../../actions/auth';

const Details = ({ user }) => {
    const [introduce, setIntroduce] = useState('')
    const [addIntroduce, setAddIntroduce] = useState(false);
    const [another_name, setAnother_name] = useState('');
    const [addAnotherName, setAddAnotherName] = useState(false);
    const dispatch = useDispatch();

    const onSubmit = async (e, k) => {
        e.preventDefault();
        let value = k ? { another_name: another_name.trim() } : { introduce: introduce.trim() }
        const res = await axios.put('/user/update-info', value);
        if (res.data.success) {
            dispatch(updateUser(res.data.user));
            k ? setAddAnotherName(false) : setAddIntroduce(false)
        }
    };

    const EditIntroduce = () => {
        setAddIntroduce(true);
        setIntroduce(user.introduce)
    }

    const EditAnotherName = () => {
        setAddAnotherName(true);
        setAnother_name(user.another_name)
    }

    return (
        <div className="tab-pane fade" id="details" role="tabpanel">
            <h4 className="mb-3">Giới thiệu về bản thân</h4>

            {
                addIntroduce ?
                    <form onSubmit={e => onSubmit(e, 0)}>
                        <div>
                            <input
                                className="input-light-primary text-primary br-5 p-3 mb-3 font-size-16"
                                type="text"
                                name="introduce"
                                value={introduce}
                                onChange={e => setIntroduce(e.target.value)}
                                required
                                placeholder="Giới thiệu về bản thân..."
                            />
                            <div className="mt-3 mb-5 d-flex">
                                <button type="submit" className="btn text-primary box-like-btn">Lưu</button>
                                <span className="btn text-danger ml-2 box-like-btn" onClick={e => setAddIntroduce(false)}>Hủy</span>
                            </div>
                        </div>
                    </form> :
                    <Fragment>
                        {
                            user.introduce ?
                                <div className="d-flex align-items-center">
                                    <div className="media-support-info ml-3 d-link font-size-16">
                                        {user.introduce}
                                    </div>
                                    <div className="edit-relation d-link">
                                        <span onClick={EditIntroduce}>
                                            <i className="fal fa-pencil mr-2" />Chỉnh sửa
                                        </span>
                                    </div>
                                </div>
                                :
                                <div className="d-flex mb-4 align-items-center pointer" onClick={e => setAddIntroduce(!addIntroduce)}>
                                    <div className="user-img img-fluid"><i className="fal fa-plus" /></div>
                                    <div className="media-support-info ml-3">
                                        <h6>Thêm giới thiệu</h6>
                                    </div>
                                </div>

                        }
                    </Fragment>
            }

            <h4 className="mt-3 mb-3">Tên khác</h4>


            {
                addAnotherName ?
                    <form onSubmit={e => onSubmit(e, 1)}>
                        <div>
                            <input
                                className="input-light-primary text-primary br-5 p-3 mb-3 font-size-16"
                                type="text"
                                name="another_name"
                                value={another_name}
                                onChange={e => setAnother_name(e.target.value)}
                                required
                                placeholder="Biệt danh..."
                            />
                            <div className="mt-3 mb-5 d-flex">
                                <button type="submit" className="btn text-primary box-like-btn">Lưu</button>
                                <span className="btn text-danger ml-2 box-like-btn" onClick={e => setAddAnotherName(false)}>Hủy</span>
                            </div>
                        </div>
                    </form> :
                    <Fragment>
                        {
                            user.another_name ?
                                <div className="d-flex align-items-center">
                                    <div className="media-support-info ml-3 d-link font-size-16">
                                        {user.another_name}
                                    </div>
                                    <div className="edit-relation d-link">
                                        <span onClick={EditAnotherName}>
                                            <i className="fal fa-pencil mr-2" />Chỉnh sửa
                                        </span>
                                    </div>
                                </div>
                                :
                                <div className="d-flex mb-4 align-items-center pointer" onClick={e => setAddAnotherName(true)}>
                                    <div className="user-img img-fluid"><i className="fal fa-plus" /></div>
                                    <div className="media-support-info ml-3">
                                        <h6>Thêm biệt danh</h6>
                                    </div>
                                </div>
                        }
                    </Fragment>
            }



        </div>

    )
}

export default Details
