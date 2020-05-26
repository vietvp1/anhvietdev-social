import React from 'react'

const Stories = () => {
    return (
        <div className="iq-card">
            <div className="iq-card-header d-flex justify-content-between">
            <div className="iq-header-title">
                <h4 className="card-title">Tin</h4>
            </div>
            </div>
            <div className="iq-card-body">
            <ul className="media-story m-0 p-0">
                <li className="d-flex mb-4 align-items-center">
                <i className="fal fa-plus font-size-18" />
                <div className="stories-data ml-3">
                    <h5>Tạo</h5>
                    <p className="mb-0">Thời gian tạo</p>
                </div>
                </li>
                <li className="d-flex mb-4 align-items-center active">
                <img src={require("../../../images/page-img/s2.jpg")} alt="story-img" className="rounded-circle img-fluid" />
                <div className="stories-data ml-3">
                    <h5>Việt Đẹp Trai</h5>
                    <p className="mb-0">1 giờ trước</p>
                </div>
                </li>
                <li className="d-flex mb-4 align-items-center">
                <img src={require("../../../images/page-img/s3.jpg")} alt="story-img" className="rounded-circle img-fluid" />
                <div className="stories-data ml-3">
                    <h5>Việt Tốt Bụng</h5>
                    <p className="mb-0">4 giờ trước</p>
                </div>
                </li>
                <li className="d-flex align-items-center">
                <img src={require("../../../images/page-img/s1.jpg")} alt="story-img" className="rounded-circle img-fluid" />
                <div className="stories-data ml-3">
                    <h5>Việt Joker</h5>
                    <p className="mb-0">9 giờ trước</p>
                </div>
                </li>
            </ul>
            <a href="/" className="btn btn-primary d-block mt-3">Xem tất cả</a>
            </div>
        </div>  
    )
}

export default Stories
