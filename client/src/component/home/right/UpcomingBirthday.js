import React from 'react'

const UpcomingBirthday = () => {
    return (
        <div className="iq-card">
            <div className="iq-card-header d-flex justify-content-between">
            <div className="iq-header-title">
                <h4 className="card-title">Sinh nhật</h4>
            </div>
            </div>
            <div className="iq-card-body">
            <ul className="media-story m-0 p-0">
                <li className="d-flex mb-4 align-items-center">
                <img src={`${process.env.REACT_APP_API}/uploads/avatar/adminViet.jpg`} alt="story-img" className="rounded-circle img-fluid" />
                <div className="stories-data ml-3">
                    <h5>Anh Việt</h5>
                    <p className="mb-0">Hôm nay</p>
                </div>
                </li>
                <li className="d-flex align-items-center">
                <img src={`${process.env.REACT_APP_API}/uploads/avatar/adminViet.jpg`} alt="story-img" className="rounded-circle img-fluid" />
                <div className="stories-data ml-3">
                    <h5>Việt Tốt Bụng</h5>
                    <p className="mb-0">Ngày mai</p>
                </div>
                </li>
            </ul>
            </div>
        </div>
    )
}

export default UpcomingBirthday
