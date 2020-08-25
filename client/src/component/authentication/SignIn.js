import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../../actions/auth';
import Google from './Google';
import Facebook from './Facebook';
import CarouselInAuthPage from './CarouselInAuthPage';
import ParticlesPage from './ParticlesPage';

const SignIn = () => {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { email, password } = formData;

    const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        await dispatch(login(email, password));
    };

    if (isAuthenticated) {
        return <Redirect to='/' />;
    }

    return (
        <section className="sign-in-page">
            <ParticlesPage/>
            {/* <div id="container-inside">
                <div id="circle-small" />
                <div id="circle-medium" />
                <div id="circle-large" />
                <div id="circle-xlarge" />
                <div id="circle-xxlarge" />
            </div> */}
            <div className="container p-0">
                <div className="row no-gutters">
                    <CarouselInAuthPage/>
                    <div className="col-md-6 bg-white pt-5">
                        <div className="sign-in-from">
                            <h1 className="mb-0">Đăng nhập</h1>
                            <p>Nhập địa chỉ email và mật khẩu của bạn.</p>
                            <form className="mt-4">
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail3">Địa chỉ Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={email}
                                        onChange={e => onChange(e)}
                                        className="form-control mb-0"
                                        id="exampleInputEmail3"
                                        placeholder="Email"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputPassword1">Mật khẩu</label>
                                    <Link to="/forgot-password" className="float-right">Quên mật khẩu?</Link>
                                    <input
                                        type="password"
                                        name='password'
                                        value={password}
                                        onChange={e => onChange(e)}
                                        minLength='6'
                                        className="form-control mb-0"
                                        id="exampleInputPassword1"
                                        placeholder="Mật khẩu"
                                        required
                                    />
                                </div>

                                <div className="d-inline-block w-100">
                                    <div className="custom-control custom-checkbox d-inline-block mt-2 pt-1">
                                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                        <label className="custom-control-label" htmlFor="customCheck1">Nhớ mật khẩu</label>
                                    </div>
                                    <button type="submit" className="btn btn-primary float-right" onClick={e => onSubmit(e)}>Đăng nhập</button>
                                </div>
                                <div className="sign-info">
                                    <span className="dark-color d-inline-block line-height-2">Bạn chưa có tài khoản?
                                <Link to="/sign-up"> Đăng ký</Link>
                                    </span>
                                    <ul className="iq-social-media">
                                        <li>
                                            <Facebook/>
                                        </li>
                                        <li>
                                            <Google/>
                                        </li>
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

export default SignIn