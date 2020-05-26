import React from 'react'
import { Fragment } from 'react'

const ProfileEvent = () => {
    return (
        <Fragment>
            <div className="header-for-bg">
            <div className="background-header position-relative">
                <img src="images/page-img/profile-bg6.jpg" className="img-fluid w-100 rounded rounded" alt="profile-bg" />
                <div className="title-on-header">
                <div className="data-block">
                    <h2>Your Events</h2>
                </div>
                </div>
            </div>
            </div>
            {/* Page Content  */}
            <div id="content-page" className="content-page">
            <div className="container">
                <div className="row">
                    <div className="col-md-6 col-lg-4">
                        <div className="iq-card rounded iq-card-block iq-card-stretch iq-card-height">
                        <div className="event-images">
                            <a href="/#">
                            <img src="images/page-img/51.jpg" className="img-fluid" alt="Responsive img" />
                            </a>
                        </div>
                        <div className="iq-card-body">
                            <div className="d-flex">
                            <div className="date-of-event">
                                <span>Jan</span>
                                <h5>01</h5>
                            </div>
                            <div className="events-detail ml-3">
                                <h5>New Year Celibration</h5>
                                <p>Lorem Ipsum is simply dummy text</p>
                                <div className="event-member">
                                <div className="iq-media-group">
                                    <a href="/#" className="iq-media">
                                    <img className="img-fluid avatar-40 rounded-circle" src="images/user/05.jpg" alt="" />
                                    </a>
                                    <a href="/#" className="iq-media">
                                    <img className="img-fluid avatar-40 rounded-circle" src="images/user/06.jpg" alt="" />
                                    </a>
                                    <a href="/#" className="iq-media">
                                    <img className="img-fluid avatar-40 rounded-circle" src="images/user/07.jpg" alt="" />
                                    </a>
                                    <a href="/#" className="iq-media">
                                    <img className="img-fluid avatar-40 rounded-circle" src="images/user/08.jpg" alt="" />
                                    </a>
                                    <a href="/#" className="iq-media">
                                    <img className="img-fluid avatar-40 rounded-circle" src="images/user/09.jpg" alt="" />
                                    </a>
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-4">
                        <div className="iq-card rounded iq-card-block iq-card-stretch iq-card-height">
                        <div className="event-images">
                            <a href="/#">
                            <img src="images/page-img/52.jpg" className="img-fluid" alt="Responsive img" />
                            </a>
                        </div>
                        <div className="iq-card-body">
                            <div className="d-flex">
                            <div className="date-of-event">
                                <span>Jan</span>
                                <h5>24</h5>
                            </div>
                            <div className="events-detail ml-3">
                                <h5>Birthday Celibration</h5>
                                <p>Lorem Ipsum is simply dummy text</p>
                                <div className="event-member">
                                <div className="iq-media-group">
                                    <a href="/#" className="iq-media">
                                    <img className="img-fluid avatar-40 rounded-circle" src="images/user/05.jpg" alt="" />
                                    </a>
                                    <a href="/#" className="iq-media">
                                    <img className="img-fluid avatar-40 rounded-circle" src="images/user/06.jpg" alt="" />
                                    </a>
                                    <a href="/#" className="iq-media">
                                    <img className="img-fluid avatar-40 rounded-circle" src="images/user/07.jpg" alt="" />
                                    </a>
                                    <a href="/#" className="iq-media">
                                    <img className="img-fluid avatar-40 rounded-circle" src="images/user/08.jpg" alt="" />
                                    </a>
                                    <a href="/#" className="iq-media">
                                    <img className="img-fluid avatar-40 rounded-circle" src="images/user/09.jpg" alt="" />
                                    </a>
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
            
        </Fragment>
    )
}

export default ProfileEvent
