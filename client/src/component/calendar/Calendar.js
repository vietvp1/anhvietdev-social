import React, { Fragment } from 'react'

const Calendar = () => {
    return (
        <Fragment>
            <div className="header-for-bg">
            <div className="background-header position-relative">
                <img src="images/page-img/profile-bg6.jpg" className="img-fluid w-100" alt="profile-bg" />
                <div className="title-on-header">
                <div className="data-block">
                    <h2>Calender and Events</h2>
                </div>
                </div>
            </div>
            </div>
            {/* Page Content  */}
            <div id="content-page" className="content-page">
            <div className="container">
                <div className="row row-eq-height">
                <div className="col-md-3">
                    <div className="iq-card calender-small">
                    <div className="iq-card-body">
                        <input type="text" className="flatpicker d-none" />
                    </div>
                    </div>
                    <div className="iq-card">
                    <div className="iq-card-header d-flex justify-content-between">
                        <div className="iq-header-title">
                        <h4 className="card-title ">Classification</h4>
                        </div>
                        <div className="iq-card-header-toolbar d-flex align-items-center">
                            <i className="fa fa-plus  mr-0" aria-hidden="true" />
                        </div>
                    </div>
                    <div className="iq-card-body">
                        <ul className="m-0 p-0 job-classification">
                        <li><i className="ri-check-line bg-danger" />Meeting</li>
                        <li><i className="ri-check-line bg-success" />Business travel</li>
                        <li><i className="ri-check-line bg-warning" />Personal Work</li>
                        <li><i className="ri-check-line bg-info" />Team Project</li>
                        </ul>
                    </div>
                    </div>
                    <div className="iq-card">
                    <div className="iq-card-header d-flex justify-content-between">
                        <div className="iq-header-title">
                        <h4 className="card-title">Today's Schedule</h4>
                        </div>
                    </div>
                    <div className="iq-card-body">
                        <ul className="m-0 p-0 today-schedule">
                        <li className="d-flex">
                            <div className="schedule-icon"><i className="ri-checkbox-blank-circle-fill text-primary" /></div>
                            <div className="schedule-text"> <span>Web Design</span>
                            <span>09:00 to 12:00</span>
                            </div>
                        </li>
                        <li className="d-flex">
                            <div className="schedule-icon"><i className="ri-checkbox-blank-circle-fill text-success" /></div>
                            <div className="schedule-text"> <span>Participate in Design</span>
                            <span>09:00 to 12:00</span>
                            </div>
                        </li>
                        </ul>
                    </div>
                    </div>
                </div>
                <div className="col-md-9">
                    <div className="iq-card">
                    <div className="iq-card-header d-flex justify-content-between">
                        <div className="iq-header-title">
                        <h4 className="card-title">Book Appointment</h4>
                        </div>
                        <div className="iq-card-header-toolbar d-flex align-items-center">
                        <a href="/#" className="btn btn-primary"><i className="fal fa-plus mr-2" />Book Appointment</a>
                        </div>
                    </div>
                    <div className="iq-card-body">
                        <div id="calendar1"></div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
            
        </Fragment>
    )
}

export default Calendar
