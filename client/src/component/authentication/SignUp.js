import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { register } from '../../actions/auth';
import { toast } from 'react-toastify';
import CarouselInAuthPage from './CarouselInAuthPage';
import ParticlesPage from './ParticlesPage';

const SignUp = ({history}) => {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        password2: ''
    });

    const { firstName, lastName, email, password, password2 } = formData;

    const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        if (password !== password2) {
            toast.error('Nhập lại mật khẩu không chính xác');
        } else {
            const res = await dispatch(register({ firstName, lastName, email, password }));
            if (res.success) {
                history.push('/sign-in');
			}
        }

    };

    if (isAuthenticated) {
        return <Redirect to='/' />;
    }

    return (
        <section className="sign-in-page">
            <ParticlesPage/>
            <div className="container p-0">
                <div className="row no-gutters">
                    <CarouselInAuthPage/>
                    <div className="col-md-6 bg-white pt-5">
                        <div className="sign-in-from">
                            <h1 className="mb-0">Đăng ký</h1>
                            <p>Nhập địa chỉ email và mật khẩu của bạn.</p>
                            <form className="mt-4" onSubmit={onSubmit}>
                                <div className="form-group">
                                    <label htmlFor="firstNameSignUp">Họ của bạn</label>
                                    <input
                                        className="form-control mb-0"
                                        id="firstNameSignUp"
                                        name="firstName"
                                        required
                                        value={firstName}
                                        onChange={onChange}
                                        placeholder="Họ của bạn"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="secondNameSignUp">Tên của bạn</label>
                                    <input
                                        required
                                        className="form-control mb-0"
                                        id="secondNameSignUp"
                                        name="lastName"
                                        value={lastName}
                                        onChange={onChange}
                                        placeholder="Tên của bạn"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="emailSignUp">Email</label>
                                    <input
                                        type="email"
                                        required
                                        className="form-control mb-0"
                                        id="emailSignUp"
                                        name="email"
                                        value={email}
                                        onChange={onChange}
                                        placeholder="Địa chỉ Email"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="passwordSignUp">Mật khẩu</label>
                                    <input
                                        type="password"
                                        required
                                        className="form-control mb-0"
                                        id="passwordSignUp"
                                        placeholder="Mật khẩu"
                                        value={password}
                                        onChange={onChange}
                                        name="password"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="passwordSignUp2">Nhập lại mật khẩu</label>
                                    <input
                                        type="password"
                                        required
                                        className="form-control mb-0"
                                        id="passwordSignUp2"
                                        placeholder="Nhập lại mật khẩu"
                                        value={password2}
                                        name="password2"
                                        onChange={onChange}
                                    />
                                </div>
                                <div className="d-inline-block w-100">
                                    <div className="custom-control custom-checkbox d-inline-block mt-2 pt-1">
                                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                        <label className="custom-control-label" htmlFor="customCheck1">Đồng ý với <span className="d-link">các điều khoản và điều kiện</span></label>
                                    </div>
                                    <button type="submit" className="btn btn-primary float-right">Đăng ký</button>
                                </div>

                                <div className="sign-info">
                                    <span className="dark-color d-inline-block line-height-2">Đã có tài khoản ? <Link to="/sign-in">Đăng Nhập</Link></span>
                                    <ul className="iq-social-media">
                                        <li><span><i className="ri-facebook-box-line" /></span></li>
                                        <li><span><i className="ri-twitter-line" /></span></li>
                                        <li><span><i className="ri-instagram-line" /></span></li>
                                    </ul>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SignUp
