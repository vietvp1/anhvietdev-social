import React, { useState } from 'react'
import Particles from 'react-particles-js';
import { Link, Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { register } from '../../../actions/auth';
import { toast } from 'react-toastify';
import logo from '../../../images/logo-av.png'
import login1 from '../../../images/login/1.png'
import login2 from '../../../images/login/2.png'
import login3 from '../../../images/login/3.png'

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
                console.log("vaoo");
                history.push('/sign-in');
			}
        }

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
                        "speed": {
                            "value": 10
                        },
                        // "move": {
                        //     "direction": "bottom",
                        //     "out_mode": "out"
                        // },
                        // "line_linked": {
                        //     "enable": false
                        // }
                    },

                    // "interactivity": {
                    //     "events": {
                    //         "onhover": {
                    //             "enable": true,
                    //             "mode": "repulse"
                    //         }
                    //     }
                    // }
                }}
            />
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
                                    <span className="sr-only">Trước</span>
                                </a>
                                <a className="carousel-control-next" href="#carouselIndicators" role="button" data-slide="next">
                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span className="sr-only">Sau</span>
                                </a>
                            </div>
                        </div>
                    </div>
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
