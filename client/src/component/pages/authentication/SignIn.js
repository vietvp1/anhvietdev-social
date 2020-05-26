import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../../../actions/auth';
import Particles from 'react-particles-js';
// import Register from './Register';
// import Facebook from './Facebook';
// import Google from './Google'
// import Forgot from './Forgot';
import logo from '../../../images/logo-av.png'
import login1 from '../../../images/login/1.png'
import login2 from '../../../images/login/2.png'
import login3 from '../../../images/login/3.png'
import Google from './Google';
import Facebook from './Facebook';

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
            <Particles
                params={{
                    "particles": {
                        "number": {
                            "value": 120
                        },
                        "size": {
                            "value": 3
                        },
                    },
                }}
            />
            {/* <div id="container-inside">
                <div id="circle-small" />
                <div id="circle-medium" />
                <div id="circle-large" />
                <div id="circle-xlarge" />
                <div id="circle-xxlarge" />
            </div> */}
            <div className="container p-0">
                <div className="row no-gutters">
                    <div className="col-md-6 text-center pt-5">
                        <div className="sign-in-detail text-white">
                            <span className="sign-in-logo mb-5"><img src={logo} className="img-fluid" alt="logo" /></span>

                            <div id="carouselIndicators" className="carousel slide" data-ride="carousel">
                                <ol className="carousel-indicators">
                                    <li data-target="#carouselIndicators" data-slide-to="0" className="active"></li>
                                    <li data-target="#carouselIndicators" data-slide-to="1"></li>
                                    <li data-target="#carouselIndicators" data-slide-to="2"></li>
                                </ol>
                                <div className="carousel-inner">
                                    <div className="carousel-item active">
                                        <img src={login1} className="img-fluid mb-4" alt="logo" />
                                        <h4 className="mb-1 text-white">Tìm bạn mới</h4>
                                        <p>Đó là một thực tế lâu dài rằng một người đọc sẽ bị phân tâm bởi nội dung có thể đọc được.</p>
                                    </div>
                                    <div className="carousel-item">
                                        <img src={login2} className="img-fluid mb-4" alt="logo" />
                                        <h4 className="mb-1 text-white">Connect with the world</h4>
                                        <p>Đó là một thực tế lâu dài rằng một người đọc sẽ bị phân tâm bởi nội dung có thể đọc được.</p>
                                    </div>
                                    <div className="carousel-item">
                                        <img src={login3} className="img-fluid mb-4" alt="logo" />
                                        <h4 className="mb-1 text-white">Create new events</h4>
                                        <p>Đó là một thực tế lâu dài rằng một người đọc sẽ bị phân tâm bởi nội dung có thể đọc được.</p>
                                    </div>
                                </div>
                                <a className="carousel-control-prev" href="#carouselIndicators" role="button" data-slide="prev">
                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span className="sr-only">Previous</span>
                                </a>
                                <a className="carousel-control-next" href="#carouselIndicators" role="button" data-slide="next">
                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span className="sr-only">Next</span>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 bg-white pt-5">
                        <div className="sign-in-from">
                            <h1 className="mb-0">Đăng nhập</h1>
                            <p>Nhập địa chỉ email và mật khẩu của bạn.</p>
                            <form className="mt-4">
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Địa chỉ Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={email}
                                        onChange={e => onChange(e)}
                                        className="form-control mb-0"
                                        id="exampleInputEmail1"
                                        placeholder="Email"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="exampleInputPassword1">Mật khẩu</label>
                                    <a href="/#" className="float-right">Quên mật khẩu?</a>
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
