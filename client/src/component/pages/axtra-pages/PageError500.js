import React from 'react'
import { Link } from 'react-router-dom'

const PageError500 = () => {
    return (
        <div className="container p-0">
            <div className="row no-gutters">
            <div className="col-sm-12 text-center">
                <div className="iq-error position-relative mt-5">
                <img src="images/error/01.png" className="img-fluid iq-error-img" alt="" />
                <h1 className="text-in-box">500</h1>
                <h2 className="mb-0">Oops! This Page is Not Working.</h2>
                <p>The requested is Internal Server Error.</p>
                <Link className="btn btn-primary mt-3" to='/'><i className="ri-home-4-line" />Back to Home</Link>      
                </div>
            </div>
            </div>
        </div>
    )
}

export default PageError500
