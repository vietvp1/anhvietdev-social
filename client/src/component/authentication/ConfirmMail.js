import React from 'react';
import CarouselInAuthPage from './CarouselInAuthPage';
import ParticlesPage from './ParticlesPage';

const ConfirmMail = () => {
    return (
        <section className="sign-in-page">
            <ParticlesPage/>
            <div className="container p-0">
                <div className="row no-gutters">
                    <CarouselInAuthPage/>

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

