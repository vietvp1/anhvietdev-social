import React, { useState } from 'react';
import CarouselInAuthPage from './CarouselInAuthPage';
import ParticlesPage from './ParticlesPage';
import axios from "axios"
import { toast } from "react-toastify"
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
    const [values, setValues] = useState({
        email: '',
        buttonText: 'Yêu cầu đặt lại mật khẩu'
    });

    const { email, buttonText } = values;

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
    };

    const onSubmit = event => {
        event.preventDefault();
        setValues({ ...values, buttonText: 'Đang gửi yêu cầu' });
        axios({
            method: 'PUT',
            url: '/forgot-password',
            data: { email }
        })
            .then(response => {
                toast.success(response.data.message);
                setValues({ ...values, buttonText: 'Đã gửi yêu cầu' });
            })
            .catch(error => {
                toast.error(error.response.data.error);
                setValues({ ...values, buttonText: 'Yêu cầu đặt lại mật khẩu' });
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
                            <h1 className="mb-0">Quên mật khẩu</h1>
                            <p>Nhập địa chỉ email của bạn và chúng tôi sẽ gửi cho bạn một email với hướng dẫn để đặt lại mật khẩu của bạn.</p>
                            <form className="mt-4" onSubmit={onSubmit}>
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Email</label>
                                    <input
                                        type="email"
                                        className="form-control mb-0"
                                        id="exampleInputEmail1"
                                        name="email"
                                        placeholder="Nhập email của bạn"
                                        value={email}
                                        onChange={handleChange('email')}
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

    )
}

export default ForgotPassword

