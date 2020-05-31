import React, { useState, useEffect } from 'react';
import CarouselInAuthPage from './CarouselInAuthPage';
import ParticlesPage from './ParticlesPage';
import jwt from 'jsonwebtoken';
import axios from "axios"
import { toast } from "react-toastify"
import { Link } from 'react-router-dom';

const ResetPassword = ({ match, history }) => {
    const [values, setValues] = useState({
        name: '',
        token: '',
        newPassword: '',
        buttonText: 'Đặt lại mật khẩu'
    });

    useEffect(() => {
        let token = match.params.token;
        let { name } = jwt.decode(token);
        if (token) {
            setValues(values => ({ ...values, name, token }));
        }
    }, [match]);

    const { name, token, newPassword, buttonText } = values;

    const handleChange = event => {
        setValues({ ...values, newPassword: event.target.value });
    };

    const onSubmit = event => {
        event.preventDefault();
        setValues({ ...values, buttonText: 'Đang cập nhập' });
        axios({
            method: 'PUT',
            url: `/reset-password`,
            data: { newPassword, resetPasswordLink: token }
        })
            .then(response => {
                toast.success(response.data.message);
                setValues({ ...values, buttonText: 'Xong' });
                history.push('/sign-in');
            })
            .catch(error => {
                toast.error(error.response.data.error);
                setValues({ ...values, buttonText: 'Đặt lại mật khẩu' });
            });
    };
    
    return (
        <section className="sign-in-page">
            <ParticlesPage />
            <div className="container p-0">
                <div className="row no-gutters">
                    <CarouselInAuthPage />
                    <div className="col-md-6 bg-white pt-5">
                        <div className="sign-in-from">
                            <h1 className="mb-0">Xin chào&nbsp;<strong className="text-success">{name}</strong>, nhập mật khẩu mới của bạn</h1>
                            <p>Cài đặt mật khẩu mới để truy cập vào tài khoản của bạn.</p>
                            <form className="mt-4" onSubmit={onSubmit}>
                                <div className="form-group">
                                    <label htmlFor="inputResetPassword">Mật khẩu</label>
                                    <input
                                        type="password"
                                        className="form-control mb-0"
                                        id="inputResetPassword"
                                        name="password"
                                        placeholder="Nhập mật khẩu mới"
                                        onChange={handleChange}
                                        value={newPassword}
                                        required
                                    />
                                </div>
                                <div className="d-inline-block w-100">
                                    <button
                                        type="submit"
                                        className="btn btn-primary float-right"
                                    >
                                        {buttonText}
                                    </button>
                                </div>
                            </form>
                            <div className="text-center mt-5">
                                <Link to="/sign-in" className="txt2">
                                    Quay lại đăng nhập&nbsp;<i className="fa fa-long-arrow-right m-l-5" aria-hidden="true"></i>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ResetPassword;
