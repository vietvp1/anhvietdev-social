import React from 'react'

const PageLoader = () => {
    return (
        <div className="col-sm-12 spinner-page">
            <img style={{width: "80px"}} src={require('../../../images/page-img/page-load-loader.gif')} alt="loader"/>
        </div>
    )
}

export default PageLoader