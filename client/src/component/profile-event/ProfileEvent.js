import React from 'react'
import { Fragment } from 'react'
import imgTest from '../../images/Man_at_work.png'
import pageImg from '../../images/page-img/51.jpg'
import bg from '../../images/page-img/profile-bg6.jpg'

const ProfileEvent = () => {
    return (
        <Fragment>
            <div className="header-for-bg">
                <div className="background-header position-relative">
                    <img src={bg} className="img-fluid w-100 rounded rounded" alt="profile-bg" />
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
                                    <span>
                                        <img src={pageImg} className="img-fluid" alt="Responsive img" />
                                    </span>
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
                                                    <span className="iq-media">
                                                        <img className="img-fluid avatar-40 rounded-circle" src={imgTest} alt="" />
                                                    </span>
                                                    <span className="iq-media">
                                                        <img className="img-fluid avatar-40 rounded-circle" src={imgTest} alt="" />
                                                    </span>
                                                    <span className="iq-media">
                                                        <img className="img-fluid avatar-40 rounded-circle" src={imgTest} alt="" />
                                                    </span>
                                                    <span className="iq-media">
                                                        <img className="img-fluid avatar-40 rounded-circle" src={imgTest} alt="" />
                                                    </span>
                                                    <span className="iq-media">
                                                        <img className="img-fluid avatar-40 rounded-circle" src={imgTest} alt="" />
                                                    </span>
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
