import React, { Fragment } from 'react'
import Discussion from './discussion/Discussion'
import AboutGroup from './about/AboutGroup'
import Members from "./members/Members"
import PhotosGroup from "./photos/PhotosGroup"

const GroupTabing = ({group, setGroup}) => {
    return (
        <Fragment>
            <div className="tab-content">
                <Discussion group={group}/>
                <AboutGroup group={group}/>
                <Members group={group}/>
                <PhotosGroup group={group}/>
            </div> 
        </Fragment>
    )
}

export default GroupTabing
