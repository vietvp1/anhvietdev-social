import React, { Fragment } from 'react'

const Files = () => {
    return (
        <Fragment>

            <div id="content-page" className="content-page">
                <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                    <div className="iq-card">
                        <div className="iq-card-header d-flex justify-content-between">
                        <div className="iq-header-title">
                            <h4 className="card-title">Files</h4>
                        </div>
                        <div className="iq-card-header-toolbar d-flex align-items-center">
                            <div className="dropdown">
                            <span className="dropdown-toggle text-primary" id="dropdownMenuButton5" data-toggle="dropdown">
                                <i className="ri-more-2-fill" />
                            </span>
                            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton5">
                                <a className="dropdown-item" href="/#"><i className="ri-eye-fill mr-2" />View</a>
                                <a className="dropdown-item" href="/#"><i className="ri-delete-bin-6-fill mr-2" />Delete</a>
                                <a className="dropdown-item" href="/#"><i className="ri-pencil-fill mr-2" />Edit</a>
                                <a className="dropdown-item" href="/#"><i className="ri-printer-fill mr-2" />Print</a>
                                <a className="dropdown-item" href="/#"><i className="ri-file-download-fill mr-2" />Download</a>
                            </div>
                            </div>
                        </div>
                        </div>
                        <div className="iq-card-body">
                        <div className="table-responsive">
                            <div className="row justify-content-between">
                            <div className="col-sm-12 col-md-6">
                                <div id="user_list_datatable_info" className="dataTables_filter">
                                <form className="mr-3 position-relative">
                                    <div className="form-group mb-0">
                                    <input type="search" className="form-control" id="exampleInputSearch" placeholder="Search" />
                                    </div>
                                </form>
                                </div>
                            </div>
                            <div className="col-sm-12 col-md-6">
                                <div className="user-list-files d-flex float-right">
                                <a href="/#" className="chat-icon-phone btn iq-bg-primary">
                                    Print
                                </a>
                                <a href="/#" className="chat-icon-video btn iq-bg-primary">
                                    Excel
                                </a>
                                <a href="/#" className="chat-icon-delete btn iq-bg-primary">
                                    Pdf
                                </a>
                                </div>
                            </div>
                            </div>
                            <table className="files-lists table table-striped mt-4">
                            <thead>
                                <tr>
                                <th scope="col">
                                    <div className="checkbox text-center">
                                    <input type="checkbox" className="checkbox-input" />
                                    </div>
                                </th>
                                <th scope="col">File Name</th>
                                <th scope="col">File Type</th>
                                <th scope="col">Date</th>
                                <th scope="col">Size</th>
                                <th scope="col">Author</th>
                                <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                <td>
                                    <div className="checkbox text-center">
                                    <input type="checkbox" className="checkbox-input" />
                                    </div>
                                </td>
                                <td>
                                    <img className="rounded-circle img-fluid avatar-40 mr-2" src="images/page-img/43.png" alt="profile" /> post report
                                </td>
                                <td>Document</td>
                                <td>
                                    Mar 12, 2020
                                </td>
                                <td>390 kb</td>
                                <td>
                                    Anna Sthesia
                                </td>
                                <td>
                                    <div className="flex align-items-center list-user-action">
                                    <a data-toggle="tooltip" data-placement="top" data-original-title="Download" href="/#"><i className="ri-download-line" /></a>
                                    <a data-toggle="tooltip" data-placement="top" data-original-title="Delete" href="/#"><i className="ri-delete-bin-line" /></a>
                                    </div>
                                </td>
                                </tr>
                                <tr>
                                <td>
                                    <div className="checkbox text-center">
                                    <input type="checkbox" className="checkbox-input" />
                                    </div>
                                </td>
                                <td>
                                    <img className="rounded-circle img-fluid avatar-40 mr-2" src="images/page-img/44.png" alt="profile" /> usages
                                </td>
                                <td>Document</td>
                                <td>
                                    Mar 18, 2020
                                </td>
                                <td>600 kb</td>
                                <td>
                                    Paul Molive
                                </td>
                                <td>
                                    <div className="flex align-items-center list-user-action">
                                    <a data-toggle="tooltip" data-placement="top" data-original-title="Download" href="/#"><i className="ri-download-line" /></a>
                                    <a data-toggle="tooltip" data-placement="top" data-original-title="Delete" href="/#"><i className="ri-delete-bin-line" /></a>
                                    </div>
                                </td>
                                </tr>
                                <tr>
                                <td>
                                    <div className="checkbox text-center">
                                    <input type="checkbox" className="checkbox-input" />
                                    </div>
                                </td>
                                <td>
                                    <img className="rounded-circle img-fluid avatar-40 mr-2" src="images/page-img/45.png" alt="profile" /> Images file
                                </td>
                                <td>Slide</td>
                                <td>
                                    Mar 19, 2020
                                </td>
                                <td>800 kb</td>
                                <td>
                                    Bob Frapples
                                </td>
                                <td>
                                    <div className="flex align-items-center list-user-action">
                                    <a data-toggle="tooltip" data-placement="top" data-original-title="Download" href="/#"><i className="ri-download-line" /></a>
                                    <a data-toggle="tooltip" data-placement="top" data-original-title="Delete" href="/#"><i className="ri-delete-bin-line" /></a>
                                    </div>
                                </td>
                                </tr>
                                <tr>
                                <td>
                                    <div className="checkbox text-center">
                                    <input type="checkbox" className="checkbox-input" />
                                    </div>
                                </td>
                                <td>
                                    <img className="rounded-circle img-fluid avatar-40 mr-2" src="images/page-img/46.png" alt="profile" /> total comments
                                </td>
                                <td>Document</td>
                                <td>
                                    Mar 21, 2020
                                </td>
                                <td>500 kb</td>
                                <td>
                                    Barb Ackue
                                </td>
                                <td>
                                    <div className="flex align-items-center list-user-action">
                                    <a data-toggle="tooltip" data-placement="top" data-original-title="Download" href="/#"><i className="ri-download-line" /></a>
                                    <a data-toggle="tooltip" data-placement="top" data-original-title="Delete" href="/#"><i className="ri-delete-bin-line" /></a>
                                    </div>
                                </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div className="checkbox text-center">
                                        <input type="checkbox" className="checkbox-input" />
                                        </div>
                                    </td>
                                    <td>
                                        <img className="rounded-circle img-fluid avatar-40 mr-2" src="images/page-img/47.png" alt="profile" /> popular events
                                    </td>
                                    <td>Pdf</td>
                                    <td>
                                        Mar 24, 2020
                                    </td>
                                    <td>320 kb</td>
                                    <td>
                                        Barb Ackue
                                    </td>
                                    <td>
                                        <div className="flex align-items-center list-user-action">
                                        <a data-toggle="tooltip" data-placement="top" data-original-title="Download" href="/#"><i className="ri-download-line" /></a>
                                        <a data-toggle="tooltip" data-placement="top" data-original-title="Delete" href="/#"><i className="ri-delete-bin-line" /></a>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                            </table>
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

export default Files
