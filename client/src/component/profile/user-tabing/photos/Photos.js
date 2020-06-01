import React, { useEffect, useState }  from 'react'
import ImageLibrary from '../../../grid-images';
import axios from "axios"
import { bufferToBase64 } from '../../../../clientHelper/helperClient';

const Photos = ({user}) => {
    const [photos, setPhotos] = useState([]);
    useEffect(() => {
        let isSubscribed = true;
        axios.get(`/photos/${user._id}`).then(res => {
            if(isSubscribed) {
                let img = [];
                res.data.photos.forEach(item => {
                    img.push(`data:${item.contentType};base64,${bufferToBase64(item.data.data)}`);
                });
                setPhotos(img);
            }
        });
        return () => isSubscribed = false
    },[user])

    return (
        <div className="tab-pane fade" id="photos" role="tabpanel">
            <div className="iq-card">
                <div className="iq-card-body">
                <h2>Hình ảnh</h2>
                <div className="friend-list-tab mt-2">
                    <ul className="nav nav-pills d-flex align-items-center justify-content-left friend-list-items p-0 mb-2">
                    <li>
                        <a className="nav-link active" data-toggle="pill" href="#photosofyou">Ảnh của bạn</a>
                    </li>
                    </ul>
                    <div className="tab-content">
                        <div className="tab-pane fade active show" id="photosofyou" role="tabpanel">
                            <div className="iq-card-body p-0">
                                <ImageLibrary images={photos}/>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
            
        </div>
            
    )
}

export default Photos
