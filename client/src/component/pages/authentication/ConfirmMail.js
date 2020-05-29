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

const ConfirmMail = () => {
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
                            <img src="images/login/mail.png" width="80"  alt=""/>
                            <h1 className="mt-3 mb-0">Success !</h1>
                            <p>A email has been send to <a href="/cdn-cgi/l/email-protection" className="__cf_email__" data-cfemail="6910061c1b0c04080005290d0604080007470a060447">[email&#160;protected]</a> Please check for an email from company and click on the included link to reset your password.</p>
                            <div className="d-inline-block w-100">
                                <button type="submit" className="btn btn-primary mt-3">Back to Home</button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>

    )
}

export default ConfirmMail

