import React, { Fragment } from 'react'

const Todo = () => {
    return (
        <Fragment>
            <div id="content-page" className="content-page">
                <div className="container relative">
                <div className="row">
                    <div className="col-lg-3">
                    <div className="iq-card">
                        <div className="iq-card-body">
                        <div className="iq-todo-page">
                            <form className="position-relative">
                            <div className="form-group mb-0">
                                <input type="text" className="form-control todo-search" id="exampleInputEmail002" placeholder="Search" />
                                <a className="search-link" href="/#"><i className="far fa-search" /></a>
                            </div>
                            </form>
                            <div className="add-new-project mt-3 mb-3">
                            <a href="/#" className="d-block nrw-project"><i className="fal fa-plus mr-2" />add Project</a>
                            </div>
                            <ul className="todo-task-list p-0 m-0">
                            <li>
                                <a href="/#"><i className="ri-stack-fill mr-2" /> Secrat Project</a>
                                <ul id="todo-task1" className="sub-task  show mt-2 p-0">
                                <li className="active"><a href="/#"><i className="ri-checkbox-blank-circle-fill text-success" /> All Task </a></li>
                                <li><a href="/#"><i className="ri-checkbox-blank-circle-fill text-warning" /> People </a></li>
                                <li><a href="/#"><i className="ri-checkbox-blank-circle-fill text-danger" /> Files <span className="badge badge-danger ml-2 float-right">44</span> </a></li>
                                <li><a href="/#"><i className="ri-checkbox-blank-circle-fill text-primary" /> Statistics </a></li>
                                </ul>
                            </li>
                            <li>
                                <a href="/#"><i className="ri-stack-fill mr-2" /> Bnie Mobile App</a>
                                <ul id="todo-task2" className="sub-task  mt-2 p-0">
                                <li><a href="/#"><i className="ri-checkbox-blank-circle-fill text-success" /> All Task </a></li>
                                <li><a href="/#"><i className="ri-checkbox-blank-circle-fill text-warning" /> People </a></li>
                                <li><a href="/#"><i className="ri-checkbox-blank-circle-fill text-danger" /> Files <span className="badge badge-danger ml-2 float-right">20</span> </a></li>
                                <li><a href="/#"><i className="ri-checkbox-blank-circle-fill text-primary" /> Statistics </a></li>
                                </ul>
                            </li>
                            <li>
                                <a href="/#"><i className="ri-stack-fill mr-2" /> New Portfolio Site</a>
                                <ul id="todo-task3" className="sub-task  mt-2 p-0">
                                <li><a href="/#"><i className="ri-checkbox-blank-circle-fill text-success" /> All Task </a></li>
                                <li><a href="/#"><i className="ri-checkbox-blank-circle-fill text-warning" /> People </a></li>
                                <li><a href="/#"><i className="ri-checkbox-blank-circle-fill text-danger" /> Files <span className="badge badge-danger ml-2 float-right">10</span> </a></li>
                                <li><a href="/#"><i className="ri-checkbox-blank-circle-fill text-primary" /> Statistics </a></li>
                                </ul>
                            </li>
                            </ul>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div className="col-lg-9">
                    <div className="row">
                        <div className="col-sm-12">
                        <div className="iq-card">
                            <div className="iq-card-body">
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="todo-date d-flex mr-3">
                                <i className="ri-calendar-2-line text-success mr-2" />
                                <span>Wednesday, 08th January, 2020</span>
                                </div>
                                <div className="todo-notification d-flex align-items-center">
                                <div className="notification-icon position-relative d-flex align-items-center mr-3">
                                    <a href="/#"><i className="ri-notification-3-line font-size-16" /></a>
                                    <span className="bg-danger text-white">5</span>
                                </div>
                                <button type="submit" className="btn iq-bg-success">Add Task</button>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                        <div className="col-md-8">
                        <div className="iq-card">
                            <div className="iq-card-body p-0">
                            <ul className="todo-task-lists m-0 p-0">
                                <li className="d-flex align-items-center p-3">
                                <div className="user-img img-fluid"><img src="images/user/01.jpg" alt="story-img" className="rounded-circle avatar-40" /></div>
                                <div className="media-support-info ml-3">
                                    <h6 className="d-inline-block">Landing page for secret Project</h6>
                                    <span className="badge badge-warning ml-3 text-white">expirinq</span>
                                    <p className="mb-0">by Danlel Cllfferton</p>
                                </div>
                                <div className="iq-card-header-toolbar d-flex align-items-center">
                                    <div className="custom-control custom-checkbox">
                                    <input type="checkbox" name="todo-check" className="custom-control-input" id="check1" />
                                    <label className="custom-control-label" htmlFor="check1" />
                                    </div>
                                </div>
                                </li>
                                <li className="d-flex align-items-center p-3 active-task">
                                <div className="user-img img-fluid"><img src="images/user/01.jpg" alt="story-img" className="rounded-circle avatar-40" /></div>
                                <div className="media-support-info ml-3">
                                    <h6>Fix Critical Crashes</h6>
                                    <p className="mb-0">by Cralg Danles</p>
                                </div>
                                <div className="iq-card-header-toolbar d-flex align-items-center">
                                    <div className="custom-control custom-checkbox">
                                    <input type="checkbox" name="todo-check" className="custom-control-input" id="check2" defaultChecked="checked" />
                                    <label className="custom-control-label" htmlFor="check2" />
                                    </div>
                                </div>
                                </li>
                                <li className="d-flex align-items-center p-3">
                                <div className="user-img img-fluid"><img src="images/user/02.jpg" alt="story-img" className="rounded-circle avatar-40" /></div>
                                <div className="media-support-info ml-3">
                                    <h6 className="d-inline-block">IOS App - Redesign the contact</h6>
                                    <span className="badge badge-success ml-3">ending</span>
                                    <p className="mb-0">by Simona Gomez </p>
                                </div>
                                <div className="iq-card-header-toolbar d-flex align-items-center">
                                    <div className="custom-control custom-checkbox">
                                    <input type="checkbox" name="todo-check" className="custom-control-input" id="check3" />
                                    <label className="custom-control-label" htmlFor="check3" />
                                    </div>
                                </div>
                                </li>
                                <li className="d-flex align-items-center p-3">
                                <div className="user-img img-fluid"><img src="images/user/03.jpg" alt="story-img" className="rounded-circle avatar-40" /></div>
                                <div className="media-support-info ml-3">
                                    <h6>Final Meetup for the Secrat Project Client</h6>
                                    <p className="mb-0">bt Serena Gemoz</p>
                                </div>
                                <div className="iq-card-header-toolbar d-flex align-items-center">
                                    <div className="custom-control custom-checkbox">
                                    <input type="checkbox" name="todo-check" className="custom-control-input" id="check4" />
                                    <label className="custom-control-label" htmlFor="check4" />
                                    </div>
                                </div>
                                </li>
                                <li className="d-flex align-items-center p-3">
                                <div className="user-img img-fluid"><img src="images/user/04.jpg" alt="story-img" className="rounded-circle avatar-40" /></div>
                                <div className="media-support-info ml-3">
                                    <h6>Code the Parsing Element</h6>
                                    <p className="mb-0">by Jeena Gaze</p>
                                </div>
                                <div className="iq-card-header-toolbar d-flex align-items-center">
                                    <div className="custom-control custom-checkbox">
                                    <input type="checkbox" name="todo-check" className="custom-control-input" id="check5" />
                                    <label className="custom-control-label" htmlFor="check5" />
                                    </div>
                                </div>
                                </li>
                                <li className="d-flex align-items-center p-3">
                                <div className="user-img img-fluid"><img src="images/user/05.jpg" alt="story-img" className="rounded-circle avatar-40" /></div>
                                <div className="media-support-info ml-3">
                                    <h6 className="d-inline-block">Test the Bug, that causes design</h6>
                                    <span className="badge badge-danger ml-3">urgent</span>
                                    <p className="mb-0">by migule Slimmonas</p>
                                </div>
                                <div className="iq-card-header-toolbar d-flex align-items-center">
                                    <div className="custom-control custom-checkbox">
                                    <input type="checkbox" name="todo-check" className="custom-control-input" id="check6" />
                                    <label className="custom-control-label" htmlFor="check6" />
                                    </div>
                                </div>
                                </li>
                                <li className="d-flex align-items-center p-3">
                                <div className="user-img img-fluid"><img src="images/user/06.jpg" alt="story-img" className="rounded-circle avatar-40" /></div>
                                <div className="media-support-info ml-3">
                                    <h6>Android App Design</h6>
                                    <p className="mb-0">by Becky Dimes</p>
                                </div>
                                <div className="iq-card-header-toolbar d-flex align-items-center">
                                    <div className="custom-control custom-checkbox">
                                    <input type="checkbox" name="todo-check" className="custom-control-input" id="check7" />
                                    <label className="custom-control-label" htmlFor="check7" />
                                    </div>
                                </div>
                                </li>
                                <li className="d-flex align-items-center p-3">
                                <div className="user-img img-fluid"><img src="images/user/07.jpg" alt="story-img" className="rounded-circle avatar-40" /></div>
                                <div className="media-support-info ml-3">
                                    <h6>Skype Meetup with clients</h6>
                                    <p className="mb-0">by James Romero</p>
                                </div>
                                <div className="iq-card-header-toolbar d-flex align-items-center">
                                    <div className="custom-control custom-checkbox">
                                    <input type="checkbox" name="todo-check" className="custom-control-input" id="check8" />
                                    <label className="custom-control-label" htmlFor="check8" />
                                    </div>
                                </div>
                                </li>
                            </ul>
                            </div>
                        </div>
                        </div>
                        <div className="col-md-4">
                        <div className="iq-card">
                            <div className="iq-card-body">
                            <div className="iq-todo-right">
                                <form className="position-relative">
                                <div className="form-group mb-0">
                                    <input type="text" className="form-control todo-search" id="exampleInputEmail001" placeholder="Search" />
                                    <a className="search-link" href="/#"><i className="far fa-search" /></a>
                                </div>
                                </form>
                                <div className="iq-todo-friendlist mt-3">
                                <ul className="suggestions-lists m-0 p-0">
                                    <li className="d-flex mb-4 align-items-center">
                                    <div className="user-img img-fluid"><img src="images/user/01.jpg" alt="story-img" className="rounded-circle avatar-40" /></div>
                                    <div className="media-support-info ml-3">
                                        <h6>Paul Molive</h6>
                                        <p className="mb-0">trainee</p>
                                    </div>
                                    <div className="iq-card-header-toolbar d-flex align-items-center">
                                        <div className="dropdown">
                                        <span className="dropdown-toggle text-primary" id="dropdownMenuButton41" data-toggle="dropdown">
                                            <i className="ri-more-2-line" />
                                        </span>
                                        <div className="dropdown-menu dropdown-menu-right" style={{}}>
                                            <a className="dropdown-item" href="/#"><i className="ri-user-unfollow-line mr-2" />Unfollow</a>
                                            <a className="dropdown-item" href="/#"><i className="ri-close-circle-line mr-2" />Unfriend</a>
                                            <a className="dropdown-item" href="/#"><i className="ri-lock-line mr-2" />block</a>
                                        </div>
                                        </div>
                                    </div>
                                    </li>
                                    <li className="d-flex mb-4 align-items-center">
                                    <div className="user-img img-fluid"><img src="images/user/02.jpg" alt="story-img" className="rounded-circle avatar-40" /></div>
                                    <div className="media-support-info ml-3">
                                        <h6>Anna Mull</h6>
                                        <p className="mb-0">Web Developer</p>
                                    </div>
                                    <div className="iq-card-header-toolbar d-flex align-items-center">
                                        <div className="dropdown">
                                        <span className="dropdown-toggle text-primary" id="dropdownMenuButton42" data-toggle="dropdown">
                                            <i className="ri-more-2-line" />
                                        </span>
                                        <div className="dropdown-menu dropdown-menu-right" style={{}}>
                                            <a className="dropdown-item" href="/#"><i className="ri-user-unfollow-line mr-2" />Unfollow</a>
                                            <a className="dropdown-item" href="/#"><i className="ri-close-circle-line mr-2" />Unfriend</a>
                                            <a className="dropdown-item" href="/#"><i className="ri-lock-line mr-2" />block</a>
                                        </div>
                                        </div>
                                    </div>
                                    </li>
                                    <li className="d-flex mb-4 align-items-center">
                                    <div className="user-img img-fluid"><img src="images/user/03.jpg" alt="story-img" className="rounded-circle avatar-40" /></div>
                                    <div className="media-support-info ml-3">
                                        <h6>Paige Turner</h6>
                                        <p className="mb-0">trainee</p>
                                    </div>
                                    <div className="iq-card-header-toolbar d-flex align-items-center">
                                        <div className="dropdown">
                                        <span className="dropdown-toggle text-primary" id="dropdownMenuButton43" data-toggle="dropdown">
                                            <i className="ri-more-2-line" />
                                        </span>
                                        <div className="dropdown-menu dropdown-menu-right" style={{}}>
                                            <a className="dropdown-item" href="/#"><i className="ri-user-unfollow-line mr-2" />Unfollow</a>
                                            <a className="dropdown-item" href="/#"><i className="ri-close-circle-line mr-2" />Unfriend</a>
                                            <a className="dropdown-item" href="/#"><i className="ri-lock-line mr-2" />block</a>
                                        </div>
                                        </div>
                                    </div>
                                    </li>
                                    <li className="d-flex mb-4 align-items-center">
                                    <div className="user-img img-fluid"><img src="images/user/04.jpg" alt="story-img" className="rounded-circle avatar-40" /></div>
                                    <div className="media-support-info ml-3">
                                        <h6>Barb Ackue</h6>
                                        <p className="mb-0">Web Designer</p>
                                    </div>
                                    <div className="iq-card-header-toolbar d-flex align-items-center">
                                        <div className="dropdown">
                                        <span className="dropdown-toggle text-primary" id="dropdownMenuButton44" data-toggle="dropdown">
                                            <i className="ri-more-2-line" />
                                        </span>
                                        <div className="dropdown-menu dropdown-menu-right" style={{}}>
                                            <a className="dropdown-item" href="/#"><i className="ri-user-unfollow-line mr-2" />Unfollow</a>
                                            <a className="dropdown-item" href="/#"><i className="ri-close-circle-line mr-2" />Unfriend</a>
                                            <a className="dropdown-item" href="/#"><i className="ri-lock-line mr-2" />block</a>
                                        </div>
                                        </div>
                                    </div>
                                    </li>
                                    <li className="d-flex mb-4 align-items-center">
                                    <div className="user-img img-fluid"><img src="images/user/05.jpg" alt="story-img" className="rounded-circle avatar-40" /></div>
                                    <div className="media-support-info ml-3">
                                        <h6>Greta Life</h6>
                                        <p className="mb-0">Tester</p>
                                    </div>
                                    <div className="iq-card-header-toolbar d-flex align-items-center">
                                        <div className="dropdown">
                                        <span className="dropdown-toggle text-primary" id="dropdownMenuButton45" data-toggle="dropdown">
                                            <i className="ri-more-2-line" />
                                        </span>
                                        <div className="dropdown-menu dropdown-menu-right" style={{}}>
                                            <a className="dropdown-item" href="/#"><i className="ri-user-unfollow-line mr-2" />Unfollow</a>
                                            <a className="dropdown-item" href="/#"><i className="ri-close-circle-line mr-2" />Unfriend</a>
                                            <a className="dropdown-item" href="/#"><i className="ri-lock-line mr-2" />block</a>
                                        </div>
                                        </div>
                                    </div>
                                    </li>
                                    <li className="d-flex mb-4 align-items-center">
                                    <div className="user-img img-fluid"><img src="images/user/06.jpg" alt="story-img" className="rounded-circle avatar-40" /></div>
                                    <div className="media-support-info ml-3">
                                        <h6>Ira Membrit</h6>
                                        <p className="mb-0">Android Developer</p>
                                    </div>
                                    <div className="iq-card-header-toolbar d-flex align-items-center">
                                        <div className="dropdown">
                                        <span className="dropdown-toggle text-primary" id="dropdownMenuButton46" data-toggle="dropdown">
                                            <i className="ri-more-2-line" />
                                        </span>
                                        <div className="dropdown-menu dropdown-menu-right" style={{}}>
                                            <a className="dropdown-item" href="/#"><i className="ri-user-unfollow-line mr-2" />Unfollow</a>
                                            <a className="dropdown-item" href="/#"><i className="ri-close-circle-line mr-2" />Unfriend</a>
                                            <a className="dropdown-item" href="/#"><i className="ri-lock-line mr-2" />block</a>
                                        </div>
                                        </div>
                                    </div>
                                    </li>
                                    <li className="d-flex mb-4 align-items-center">
                                    <div className="user-img img-fluid"><img src="images/user/07.jpg" alt="story-img" className="rounded-circle avatar-40" /></div>
                                    <div className="media-support-info ml-3">
                                        <h6>Pete Sariya</h6>
                                        <p className="mb-0">Web Designer</p>
                                    </div>
                                    <div className="iq-card-header-toolbar d-flex align-items-center">
                                        <div className="dropdown">
                                        <span className="dropdown-toggle text-primary" id="dropdownMenuButton47" data-toggle="dropdown">
                                            <i className="ri-more-2-line" />
                                        </span>
                                        <div className="dropdown-menu dropdown-menu-right" style={{}}>
                                            <a className="dropdown-item" href="/#"><i className="ri-user-unfollow-line mr-2" />Unfollow</a>
                                            <a className="dropdown-item" href="/#"><i className="ri-close-circle-line mr-2" />Unfriend</a>
                                            <a className="dropdown-item" href="/#"><i className="ri-lock-line mr-2" />block</a>
                                        </div>
                                        </div>
                                    </div>
                                    </li>
                                </ul>
                                <a href="/#" className="btn btn-primary d-block"><i className="fal fa-plus" /> Load More</a>
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

export default Todo
