import React, { Fragment } from 'react'

const EmailCompose = () => {
    return (
        <Fragment>
            <div id="content-page" className="content-page">
                <div className="container">
                <div className="row row-eq-height">
                    <div className="col-md-12">
                    <div className="row">
                        <div className="col-md-12">
                        <div className="iq-card iq-border-radius-20">
                            <div className="iq-card-body">
                            <div className="row">
                                <div className="col-md-12 mb-3">
                                <h5 className="text-primary card-title"><i className="ri-pencil-fill" /> Compose Message</h5>
                                </div>
                            </div>
                            <form className="email-form">
                                <div className="form-group row">
                                <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">To:</label>
                                <div className="col-sm-10">
                                    <select id="inputEmail3" className="select2jsMultiSelect form-control" multiple="multiple">
                                    <option value="Petey Cruiser">Petey Cruiser</option>
                                    <option value="Bob Frapples">Bob Frapples</option>
                                    <option value="Barb Ackue">Barb Ackue</option>
                                    <option value="Greta Life">Greta Life</option>
                                    </select>
                                </div>
                                </div>
                                <div className="form-group row">
                                <label htmlFor="cc" className="col-sm-2 col-form-label">Cc:</label>
                                <div className="col-sm-10">
                                    <select id="cc" className="select2jsMultiSelect form-control" multiple="multiple">
                                    <option value="Brock Lee">Brock Lee</option>
                                    <option value="Rick O'Shea">Rick O'Shea</option>
                                    <option value="Cliff Hanger">Cliff Hanger</option>
                                    <option value="Barb Dwyer">Barb Dwyer</option>
                                    </select>
                                </div>
                                </div>
                                <div className="form-group row">
                                <label htmlFor="subject" className="col-sm-2 col-form-label">Subject:</label>
                                <div className="col-sm-10">
                                    <input type="text" id="subject" className="form-control" />
                                </div>
                                </div>
                                <div className="form-group row">
                                <label htmlFor="subject" className="col-sm-2 col-form-label">Your Message:</label>
                                <div className="col-md-10">
                                    <textarea className="textarea form-control" rows={5} defaultValue={"Next, use our Get Started docs to setup Tiny!"} />
                                </div>
                                </div>
                                <div className="form-group row align-items-center">
                                <div className="d-flex flex-grow-1 align-items-center">
                                    <div className="send-btn pl-3">
                                    <button type="submit" className="btn btn-primary">Send</button>
                                    </div>
                                    <div className="send-panel">
                                    <label className="ml-2 mb-0 iq-bg-primary rounded" htmlFor="file"> <input type="file" id="file" style={{display: 'none'}} /> <a href="/#"><i className="ri-attachment-line" /> </a> </label>
                                    <label className="ml-2 mb-0 iq-bg-primary rounded"> <a href="/#"> <i className="ri-map-pin-user-line text-primary" /></a></label>
                                    <label className="ml-2 mb-0 iq-bg-primary rounded"> <a href="/#"> <i className="ri-drive-line text-primary" /></a></label>
                                    <label className="ml-2 mb-0 iq-bg-primary rounded"> <a href="/#"> <i className="ri-camera-line text-primary" /></a></label>
                                    <label className="ml-2 mb-0 iq-bg-primary rounded"> <a href="/#"> <i className="ri-user-smile-line text-primary" /></a></label>
                                    </div>
                                </div>
                                <div className="d-flex mr-3 align-items-center">
                                    <div className="send-panel float-right">
                                    <label className="ml-2 mb-0 iq-bg-primary rounded"><a href="/#"><i className="ri-settings-2-line text-primary" /></a></label>
                                    <label className="ml-2 mb-0 iq-bg-primary rounded"><a href="/#">  <i className="ri-delete-bin-line text-primary" /></a></label>
                                    </div>
                                </div>
                                </div>
                            </form>
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

export default EmailCompose
