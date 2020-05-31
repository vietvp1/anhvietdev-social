import React from 'react'
import { Link } from 'react-router-dom'
import img from '../../../images/error/01.png'

const PageError404 = () => {
    return (
        <div className="content-page">
            <div className="container p-0">
                <div className="row no-gutters">
                    <div className="col-sm-12 text-center">
                        <div className="iq-error position-relative mt-5">
                            <img src={img} className="img-fluid iq-error-img" alt="" />
                            <h1 className="text-in-box">404</h1>
                            <h2 className="mb-0">Trang này không hoạt động.</h2>
                            <p>The requested page dose not exist.</p>
                            <Link className="btn btn-primary mt-3" to='/'><i className="ri-home-4-line" />Trở về trang chủ</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PageError404
