import React from 'react'
import { Link } from 'react-router-dom'

const PageError404 = () => {
    return (
        <div className="container p-0">
            <div className="row no-gutters">
            <div className="col-sm-12 text-center">
                <div className="iq-error position-relative mt-5">
                <img src= {`${process.env.REACT_APP_PUBLIC_FILE}/images/error/01.png`} className="img-fluid iq-error-img" alt="" />
                <h1 className="text-in-box">404</h1>
                <h2 className="mb-0">Oops! This Page is Not Found.</h2>
                <p>The requested page dose not exist.</p>
                <Link className="btn btn-primary mt-3" to='/'><i className="ri-home-4-line" />Back to Home</Link>                            
                </div>
            </div>
            </div>
        </div>
    )
}

export default PageError404
