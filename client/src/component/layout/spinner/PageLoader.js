import React from 'react'

const PageLoader = () => {
    return (
        <div className="col-sm-12 spinner-page">
            <img src={require('../../../images/page-img/page-load-loader.gif')} alt="loader"/>
        </div>
    )
}

export default PageLoader