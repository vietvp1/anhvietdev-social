import React, { Fragment } from 'react'
import Timeline from './timeline/Timeline' 
import About from './about/About' 
import Friends from './friends/Friends' 
import Photos from './photos/Photos' 

const UserTabling = ({user}) => {
    return user?(
        <Fragment>
            <div className="tab-content">
                <Timeline user={user}/>
                <About user={user}/>
                <Friends user={user}/>
                <Photos user={user}/>   
            </div> 
        </Fragment>
    ):null
}

export default UserTabling
