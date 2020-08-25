import React from 'react'
import Stories from './right/Stories'
import SuggestedPages from './right/SuggestedPages'
import NewsFeed from './newsfeed/NewsFeed'

const Home = () => {
    return (
        <div id="content-page" className="content-page">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 m-0 p-0">
                  <NewsFeed/>
              </div>
              <div className="col-lg-4">
                <Stories/>
                <SuggestedPages/>
              </div>
              <div className="col-sm-12 text-center">
                <img src={require("../../images/page-img/page-load-loader.gif")} alt="loader" style={{height: '100px'}} />
              </div>
            </div>
          </div>
        </div>
    )
}

export default Home