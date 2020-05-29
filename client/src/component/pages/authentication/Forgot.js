import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const Forgot = ({ history, setAuthtype }) => {
    const [values, setValues] = useState({
        email: '',
        buttonText: 'Yêu cầu đặt lại mật khẩu'
    });

    const { email, buttonText } = values;

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, buttonText: 'Đang gửi yêu cầu' });
        axios({
            method: 'PUT',
            url: '/forgot-password',
            data: { email }
        })
            .then(response => {
                console.log('FORGOT PASSWORD SUCCESS', response);
                toast.success(response.data.message);
                setValues({ ...values, buttonText: 'Đã gửi yêu cầu' });
            })
            .catch(error => {
                console.log('FORGOT PASSWORD ERROR', "error.response.data");
                toast.error("error.response.data.error");
                setValues({ ...values, buttonText: 'Yêu cầu đặt lại mật khẩu' });
            });
    };

    const passwordForgotForm = () => (
        <form className="login100-form validate-form">
            <span className="login100-form-title">
				Quên mật khẩu
			</span>
            <div className="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
                <input className="input100" 
                type="email" 
                name="email" 
                placeholder="Vui lòng nhập email"
                value={email}
                onChange={handleChange('email')}
                required 
                />
                <span className="focus-input100"></span>
                <span className="symbol-input100">
                    <i className="fa fa-envelope" aria-hidden="true"></i>
                </span>
            </div>
            <div className="container-login100-form-btn">
                <button type="submit" className="login100-form-btn" onClick={clickSubmit}>
                    {buttonText}
                </button>
            </div>
            <div className="text-center p-t-136">
                <div className="txt2" onClick={e=> setAuthtype('login')}>
                    Quay lại đăng nhập&nbsp;
                    <i className="fa fa-long-arrow-right m-l-5" aria-hidden="true"></i>
                </div>
            </div>
        </form>
    );

    return (
        passwordForgotForm()
    );
};

export default Forgot;