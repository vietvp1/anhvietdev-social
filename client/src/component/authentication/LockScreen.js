import React from 'react';
import CarouselInAuthPage from './CarouselInAuthPage';
import ParticlesPage from './ParticlesPage';

const LockScreen = () => {
    return (
        <section className="sign-in-page">
            <ParticlesPage />
            <div className="container p-0">
                <div className="row no-gutters">
                    <CarouselInAuthPage />
                    <div className="col-md-6 bg-white pt-5">
                        <div className="sign-in-from">
                            <image src="images/user/1.jpg" alt="user-image" className="rounded-circle" />
                            <h4 className="mt-3 mb-0">Hi ! Michael Smith</h4>
                            <p>Enter your password to access the admin.</p>
                            <form className="mt-4">

                                <div className="form-group">
                                    <label for="exampleInputEmail2">Password</label>
                                    <input type="Password" className="form-control mb-0" id="exampleInputEmail2" placeholder="Password" />
                                </div>

                                <div className="d-inline-block w-100">
                                    <button type="submit" className="btn btn-primary float-right">Log In</button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}

export default LockScreen