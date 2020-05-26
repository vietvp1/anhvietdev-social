import React, { Fragment } from 'react'

const Music = () => {
    return (
        <Fragment>
            <div className="header-for-bg">
            <div className="background-header position-relative">
                <img src="images/page-img/profile-bg8.jpg" className="img-fluid w-100 rounded rounded" alt="header-bg" />
                <div className="title-on-header">
                <div className="data-block">
                    <h2>Music</h2>
                </div>
                </div>
            </div>
            </div>
            {/* Page Content  */}
            <div id="content-page" className="content-page">
            <div className="container">
                <div className="row">
                <div className="col-md-4">
                    <div className="iq-card iq-card-block iq-card-stretch iq-card-height">
                    <div className="iq-card-header d-flex justify-content-between">
                        <div className="iq-header-title">
                        <h4 className="card-title">Play Lists</h4>
                        </div>
                    </div>
                    <div className="iq-card-body">
                        <ul className="music-lists m-0 p-0">
                        <li className="d-flex mb-4 align-items-center">
                            <div className="user-img img-fluid"><img src="images/page-img/l1.jpg" alt="story-img" className="rounded-circle avatar-40" /></div>
                            <div className="media-support-info ml-3">
                            <h6>Ember</h6>
                            </div>
                            <div className="music-time">3:00</div>
                        </li>
                        <li className="d-flex mb-4 align-items-center">
                            <div className="user-img img-fluid"><img src="images/page-img/l2.jpg" alt="story-img" className="rounded-circle avatar-40" /></div>
                            <div className="media-support-info ml-3">
                            <h6>Light Out(Bonus Track)</h6>
                            </div>
                            <div className="music-time">5:00</div>
                        </li>
                        <li className="d-flex mb-4 align-items-center">
                            <div className="user-img img-fluid"><img src="images/page-img/l3.jpg" alt="story-img" className="rounded-circle avatar-40" /></div>
                            <div className="media-support-info ml-3">
                            <h6>Darkness Overture</h6>
                            </div>
                            <div className="music-time">2:30</div>
                        </li>
                        <li className="d-flex mb-4 align-items-center">
                            <div className="user-img img-fluid"><img src="images/page-img/l4.jpg" alt="story-img" className="rounded-circle avatar-40" /></div>
                            <div className="media-support-info ml-3">
                            <h6>Dritin</h6>
                            </div>
                            <div className="music-time">4:20</div>
                        </li>
                        <li className="d-flex mb-4 align-items-center">
                            <div className="user-img img-fluid"><img src="images/page-img/l5.jpg" alt="story-img" className="rounded-circle avatar-40" /></div>
                            <div className="media-support-info ml-3">
                            <h6>Bones</h6>
                            </div>
                            <div className="music-time">1:45</div>
                        </li>
                        <li className="d-flex align-items-center">
                            <div className="user-img img-fluid"><img src="images/page-img/l6.jpg" alt="story-img" className="rounded-circle avatar-40" /></div>
                            <div className="media-support-info ml-3">
                            <h6>Hozier</h6>
                            </div>
                            <div className="music-time">2:00</div>
                        </li>
                        </ul>
                    </div>
                    </div>
                </div>
                <div className="col-md-8">
                    <div className="iq-card iq-card-block iq-card-stretch iq-card-height">
                    <div className="iq-card-body p-0  ">
                        <a href="/#"><img src="images/page-img/48.jpg" alt="story-img" className="img-fluid rounded" /></a>
                    </div>
                    </div>
                </div>
                <div className="col-sm-12">
                    <div className="iq-card iq-card-block iq-card-stretch iq-card-height">
                    <div className="iq-card-header d-flex justify-content-between">
                        <div className="iq-header-title">
                        <h4 className="card-title">New Music</h4>
                        </div>
                        <div className="iq-card-header-toolbar d-flex align-items-center">
                        <a href="/#">View All</a>
                        </div>
                    </div>
                    <div className="iq-card-body">
                        <ul id="new-music" className="d-flex list-inline m-0 p-0">
                        <li className="text-center col-sm-2">
                            <div className="music-thumbnail position-relative mb-3">
                            <a href="/#"><img src="images/page-img/n1.jpg" alt="music-thumb" className="img-fluid w-100" /></a>
                            <div className="play-btn">
                                <a href="/#"><i className="ri-play-fill text-white" /></a>
                            </div>
                            </div>
                            <h6>Sean Paul</h6>
                            <p className="mb-0">Best Advice</p>
                        </li>
                        <li className="text-center col-sm-2">
                            <div className="music-thumbnail position-relative mb-3">
                            <a href="/#"><img src="images/page-img/n2.jpg" alt="music-thumb" className="img-fluid w-100" /></a>
                            <div className="play-btn">
                                <a href="/#"><i className="ri-play-fill text-white" /></a>
                            </div>
                            </div>
                            <h6>Fetty Wap</h6>
                            <p className="mb-0">Best Advice</p>
                        </li>
                        <li className="text-center col-sm-2">
                            <div className="music-thumbnail position-relative mb-3">
                            <a href="/#"><img src="images/page-img/n3.jpg" alt="music-thumb" className="img-fluid w-100" /></a>
                            <div className="play-btn">
                                <a href="/#"><i className="ri-play-fill text-white" /></a>
                            </div>
                            </div>
                            <h6>Brittany Howard</h6>
                            <p className="mb-0">Best Advice</p>
                        </li>
                        <li className="text-center col-sm-2">
                            <div className="music-thumbnail position-relative mb-3">
                            <a href="/#"><img src="images/page-img/n4.jpg" alt="music-thumb" className="img-fluid w-100" /></a>
                            <div className="play-btn">
                                <a href="/#"><i className="ri-play-fill text-white" /></a>
                            </div>
                            </div>
                            <h6>Elton John</h6>
                            <p className="mb-0">Best Advice</p>
                        </li>
                        <li className="text-center col-sm-2">
                            <div className="music-thumbnail position-relative mb-3">
                            <a href="/#"><img src="images/page-img/n5.jpg" alt="music-thumb" className="img-fluid w-100" /></a>
                            <div className="play-btn">
                                <a href="/#"><i className="ri-play-fill text-white" /></a>
                            </div>
                            </div>
                            <h6>Tierra Whack</h6>
                            <p className="mb-0">Best Advice</p>
                        </li>
                        <li className="text-center col-sm-2">
                            <div className="music-thumbnail position-relative mb-3">
                            <a href="/#"><img src="images/page-img/n6.jpg" alt="music-thumb" className="img-fluid w-100" /></a>
                            <div className="play-btn">
                                <a href="/#"><i className="ri-play-fill text-white" /></a>
                            </div>
                            </div>
                            <h6>Trippie Redd</h6>
                            <p className="mb-0">Best Advice</p>
                        </li>
                        <li className="text-center col-sm-2">
                            <div className="music-thumbnail position-relative mb-3">
                            <a href="/#"><img src="images/page-img/n7.jpg" alt="music-thumb" className="img-fluid w-100" /></a>
                            <div className="play-btn">
                                <a href="/#"><i className="ri-play-fill text-white" /></a>
                            </div>
                            </div>
                            <h6>Quincy Jones</h6>
                            <p className="mb-0">Best Advice</p>
                        </li>
                        <li className="text-center col-sm-2">
                            <div className="music-thumbnail position-relative mb-3">
                            <a href="/#"><img src="images/page-img/n8.jpg" alt="music-thumb" className="img-fluid w-100" /></a>
                            <div className="play-btn">
                                <a href="/#"><i className="ri-play-fill text-white" /></a>
                            </div>
                            </div>
                            <h6>Ciara</h6>
                            <p className="mb-0">Best Advice</p>
                        </li>
                        </ul>
                    </div>
                    </div>
                </div>
                <div className="col-sm-12">
                    <div className="iq-card iq-card-block iq-card-stretch iq-card-height">
                    <div className="iq-card-header d-flex justify-content-between">
                        <div className="iq-header-title">
                        <h4 className="card-title">Recent Added</h4>
                        </div>
                        <div className="iq-card-header-toolbar d-flex align-items-center">
                        <a href="/#">View All</a>
                        </div>
                    </div>
                    <div className="iq-card-body">
                        <ul id="recent-music" className="d-flex list-inline m-0 p-0">
                        <li className="text-center col-sm-2">
                            <div className="music-thumbnail position-relative mb-3">
                            <a href="/#"><img src="images/page-img/n8.jpg" alt="music-thumb" className="img-fluid w-100" /></a>
                            <div className="play-btn">
                                <a href="/#"><i className="ri-play-fill text-white" /></a>
                            </div>
                            </div>
                            <h6>Lizzo</h6>
                            <p className="mb-0">Best Advice</p>
                        </li>
                        <li className="text-center col-sm-2">
                            <div className="music-thumbnail position-relative mb-3">
                            <a href="/#"><img src="images/page-img/r8.jpg" alt="music-thumb" className="img-fluid w-100" /></a>
                            <div className="play-btn">
                                <a href="/#"><i className="ri-play-fill text-white" /></a>
                            </div>
                            </div>
                            <h6>Kathleen Hanna</h6>
                            <p className="mb-0">Best Advice</p>
                        </li>
                        <li className="text-center col-sm-2">
                            <div className="music-thumbnail position-relative mb-3">
                            <a href="/#"><img src="images/page-img/n7.jpg" alt="music-thumb" className="img-fluid w-100" /></a>
                            <div className="play-btn">
                                <a href="/#"><i className="ri-play-fill text-white" /></a>
                            </div>
                            </div>
                            <h6>Sheryl Crow</h6>
                            <p className="mb-0">Best Advice</p>
                        </li>
                        <li className="text-center col-sm-2">
                            <div className="music-thumbnail position-relative mb-3">
                            <a href="/#"><img src="images/page-img/r1.jpg" alt="music-thumb" className="img-fluid w-100" /></a>
                            <div className="play-btn">
                                <a href="/#"><i className="ri-play-fill text-white" /></a>
                            </div>
                            </div>
                            <h6>Karen O</h6>
                            <p className="mb-0">Best Advice</p>
                        </li>
                        <li className="text-center col-sm-2">
                            <div className="music-thumbnail position-relative mb-3">
                            <a href="/#"><img src="images/page-img/n1.jpg" alt="music-thumb" className="img-fluid w-100" /></a>
                            <div className="play-btn">
                                <a href="/#"><i className="ri-play-fill text-white" /></a>
                            </div>
                            </div>
                            <h6>Cyndi Lauper</h6>
                            <p className="mb-0">Best Advice</p>
                        </li>
                        <li className="text-center col-sm-2">
                            <div className="music-thumbnail position-relative mb-3">
                            <a href="/#"><img src="images/page-img/r2.jpg" alt="music-thumb" className="img-fluid w-100" /></a>
                            <div className="play-btn">
                                <a href="/#"><i className="ri-play-fill text-white" /></a>
                            </div>
                            </div>
                            <h6>Rick Ross</h6>
                            <p className="mb-0">Best Advice</p>
                        </li>
                        <li className="text-center col-sm-2">
                            <div className="music-thumbnail position-relative mb-3">
                            <a href="/#"><img src="images/page-img/r7.jpg" alt="music-thumb" className="img-fluid w-100" /></a>
                            <div className="play-btn">
                                <a href="/#"><i className="ri-play-fill text-white" /></a>
                            </div>
                            </div>
                            <h6>Kamasi Washington</h6>
                            <p className="mb-0">Best Advice</p>
                        </li>
                        <li className="text-center col-sm-2">
                            <div className="music-thumbnail position-relative mb-3">
                            <a href="/#"><img src="images/page-img/n2.jpg" alt="music-thumb" className="img-fluid w-100" /></a>
                            <div className="play-btn">
                                <a href="/#"><i className="ri-play-fill text-white" /></a>
                            </div>
                            </div>
                            <h6>Christina Aguilera</h6>
                            <p className="mb-0">Best Advice</p>
                        </li>
                        </ul>
                    </div>
                    </div>
                </div>
                <div className="col-sm-12">
                    <div className="iq-card iq-card-block iq-card-stretch iq-card-height">
                    <div className="iq-card-header d-flex justify-content-between">
                        <div className="iq-header-title">
                        <h4 className="card-title">Top Music</h4>
                        </div>
                        <div className="iq-card-header-toolbar d-flex align-items-center">
                        <a href="/#">View All</a>
                        </div>
                    </div>
                    <div className="iq-card-body">
                        <ul id="top-music" className="d-flex list-inline m-0 p-0">
                        <li className="text-center col-sm-2">
                            <div className="music-thumbnail position-relative mb-3">
                            <a href="/#"><img src="images/page-img/r1.jpg" alt="music-thumb" className="img-fluid w-100" /></a>
                            <div className="play-btn">
                                <a href="/#"><i className="ri-play-fill text-white" /></a>
                            </div>
                            </div>
                            <h6>Mary J. Blige</h6>
                            <p className="mb-0">Best Advice</p>
                        </li>
                        <li className="text-center col-sm-2">
                            <div className="music-thumbnail position-relative mb-3">
                            <a href="/#"><img src="images/page-img/r2.jpg" alt="music-thumb" className="img-fluid w-100" /></a>
                            <div className="play-btn">
                                <a href="/#"><i className="ri-play-fill text-white" /></a>
                            </div>
                            </div>
                            <h6>Ne-Yo</h6>
                            <p className="mb-0">Best Advice</p>
                        </li>
                        <li className="text-center col-sm-2">
                            <div className="music-thumbnail position-relative mb-3">
                            <a href="/#"><img src="images/page-img/r3.jpg" alt="music-thumb" className="img-fluid w-100" /></a>
                            <div className="play-btn">
                                <a href="/#"><i className="ri-play-fill text-white" /></a>
                            </div>
                            </div>
                            <h6>Loric Sih</h6>
                            <p className="mb-0">Best Advice</p>
                        </li>
                        <li className="text-center col-sm-2">
                            <div className="music-thumbnail position-relative mb-3">
                            <a href="/#"><img src="images/page-img/r4.jpg" alt="music-thumb" className="img-fluid w-100" /></a>
                            <div className="play-btn">
                                <a href="/#"><i className="ri-play-fill text-white" /></a>
                            </div>
                            </div>
                            <h6>Annie Flook</h6>
                            <p className="mb-0">Best Advice</p>
                        </li>
                        <li className="text-center col-sm-2">
                            <div className="music-thumbnail position-relative mb-3">
                            <a href="/#"><img src="images/page-img/r5.jpg" alt="music-thumb" className="img-fluid w-100" /></a>
                            <div className="play-btn">
                                <a href="/#"><i className="ri-play-fill text-white" /></a>
                            </div>
                            </div>
                            <h6>Alex Gvojic</h6>
                            <p className="mb-0">Best Advice</p>
                        </li>
                        <li className="text-center col-sm-2">
                            <div className="music-thumbnail position-relative mb-3">
                            <a href="/#"><img src="images/page-img/r6.jpg" alt="music-thumb" className="img-fluid w-100" /></a>
                            <div className="play-btn">
                                <a href="/#"><i className="ri-play-fill text-white" /></a>
                            </div>
                            </div>
                            <h6>Mindy Monk</h6>
                            <p className="mb-0">Best Advice</p>
                        </li>
                        <li className="text-center col-sm-2">
                            <div className="music-thumbnail position-relative mb-3">
                            <a href="/#"><img src="images/page-img/r7.jpg" alt="music-thumb" className="img-fluid w-100" /></a>
                            <div className="play-btn">
                                <a href="/#"><i className="ri-play-fill text-white" /></a>
                            </div>
                            </div>
                            <h6>Coffey Rock</h6>
                            <p className="mb-0">Best Advice</p>
                        </li>
                        <li className="text-center col-sm-2">
                            <div className="music-thumbnail position-relative mb-3">
                            <a href="/#"><img src="images/page-img/r8.jpg" alt="music-thumb" className="img-fluid w-100" /></a>
                            <div className="play-btn">
                                <a href="/#"><i className="ri-play-fill text-white" /></a>
                            </div>
                            </div>
                            <h6>Sam Smith</h6>
                            <p className="mb-0">Best Advice</p>
                        </li>
                        </ul>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </Fragment>
    )
}

export default Music
