import React from 'react'

const ContentLoader = () => {
    return (
        <div className="test-spinner">
            <img src={require("../../../images/page-img/page-load-loader.gif")} alt="loader" style={{ height: '100px' }} />
        </div>
    )
}

export default ContentLoader
