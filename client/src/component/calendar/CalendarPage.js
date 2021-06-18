import React, { Fragment, useState } from 'react'
import Calendar from 'react-calendar';
import bg from '../../images/page-img/profile-bg6.jpg'

const CalendarPage = () => {
    const [date, setDate] = useState(new Date())

    const onChange = date => {
        setDate(date);
    }

    return (
        <Fragment>
            <div className="header-for-bg">
                <div className="background-header position-relative">
                    <img src={bg} className="img-fluid w-100" alt="profile-bg" />
                    <div className="title-on-header">
                        <div className="data-block">
                            <h2>Lịch</h2>
                        </div>
                    </div>
                </div>
            </div>
            {/* Page Content  */}
            <div id="content-page" className="content-page">
                <div className="container">
                    <div className="row row-eq-height">
                        <div className="col-md-12">
                            <div className="iq-card">
                                <div className="iq-card-header d-flex justify-content-between">
                                    <div className="iq-header-title">
                                        <h4 className="card-title">Lịch</h4>
                                    </div>
                                </div>
                                <div className="iq-card-body">
                                    <Calendar
                                        showWeekNumbers
                                        onChange={onChange}
                                        value={date}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </Fragment>
    )
}

export default CalendarPage
