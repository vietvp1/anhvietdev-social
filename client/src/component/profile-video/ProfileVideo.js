import React, { Fragment } from 'react'
import bg from '../../images/page-img/profile-bg9.jpg'

const ProfileVideo = () => {
    return (
        <Fragment>
            <div className="header-for-bg">
            <div className="background-header position-relative">
                <img src={bg} className="img-fluid w-100 rounded rounded" alt="profile-bg" />
                <div className="title-on-header">
                <div className="data-block">
                    <h2>Your Videos</h2>
                </div>
                </div>
            </div>
            </div>
            {/* Page Content  */}
            <div id="content-page" className="content-page">
            <div className="container">
                <div className="row">
                    <div className="col-md-6 col-lg-4 mb-3">
                        <div className="user-images position-relative overflow-hidden">
                        <div className="embed-responsive embed-responsive-16by9">
                            <iframe title="video" className="embed-responsive-item" src="https://www.youtube.com/embed/K3M-czGNUCg" allowFullScreen />
                        </div>
                        <div className="image-hover-data">
                            <div className="product-elements-icon">
                            <ul className="d-flex align-items-center m-0 p-0 list-inline">
                                <li><a href="/#" className="pr-3 text-white"> 60 <i className="ri-thumb-up-line" /> </a></li>
                                <li><a href="/#" className="pr-3 text-white"> 30 <i className="ri-chat-3-line" /> </a></li>
                                <li><a href="/#" className="pr-3 text-white"> 10 <i className="ri-share-forward-line" /> </a></li>
                            </ul>
                            </div>
                        </div>
                        <a href="/#" className="image-edit-btn" data-toggle="tooltip" data-placement="top" data-original-title="Edit or Remove"><i className="ri-edit-2-fill" /></a>
                        </div>
                    </div>
                </div>
            </div>
            </div>

        </Fragment>
    )
}

export default ProfileVideo