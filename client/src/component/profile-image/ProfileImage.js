import React, { useEffect, useState, Fragment }  from 'react'
import axios from "axios"
import { useSelector } from 'react-redux';
import ImageLibrary from '../grid-images';
import { bufferToBase64 } from '../../clientHelper/helperClient';
import bg from '../../images/page-img/profile-bg5.jpg';

const ProfileImage = () => {
    const user = useSelector(state => state.auth.user);
    const [photos, setPhotos] = useState([]);
    useEffect(() => {
        let isSubscribed = true;
        user && axios.get(`/photos/${user._id}`).then(res => {
            if(isSubscribed) 
                res.data.photos.forEach(item => {
                    setPhotos(p => [...p, `data:${item.contentType};base64,${bufferToBase64(item.data.data)}`])
                })
        });
        return () => isSubscribed = false
    },[user])
    return (
        <Fragment>
            <div className="header-for-bg">
            <div className="background-header position-relative">
                <img src={bg} className="img-fluid rounded w-100 rounded rounded" alt="profile-bg" />
                <div className="title-on-header">
                <div className="data-block">
                    <h2>Your Photos</h2>
                </div>
                </div>
            </div>
            </div>
            {/* Page Content  */}
            <div id="content-page" className="content-page">
            <div className="container">
                <ImageLibrary images={photos}/>
            </div>
            </div>

        </Fragment>
    )
}

export default ProfileImage
