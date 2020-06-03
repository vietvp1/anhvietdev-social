import React, { useEffect, useState }  from 'react'
import ImageLibrary from '../../../grid-images';
import axios from "axios"

const PhotosGroup = ({group}) => {
    const [photos, setPhotos] = useState([]);
    useEffect(() => {
        let isSubscribed = true;
        axios.get(`/group/get-photos-in-group/${group._id}`).then(res => {
            if(isSubscribed) {
                let img = [];
                res.data.photos.forEach(item => {
                    img.push(`${process.env.REACT_APP_UPLOADS_IMG}/${item.fileName}`);
                });
                setPhotos(img);
            }
        });
        return () => isSubscribed = false
    },[group._id])

    return (
        <div className="tab-pane fade" id="photos-group" role="tabpanel">
            <div className="iq-card">
                <div className="iq-card-body">
                <h2>Hình ảnh trong nhóm</h2>
                <div className="friend-list-tab mt-2">
                    <ul className="nav nav-pills d-flex align-items-center justify-content-left friend-list-items p-0 mb-2">
                    <li>
                        <a className="nav-link active" data-toggle="pill" href="#photosofgroup">Hình ảnh trong nhóm</a>
                    </li>
                    </ul>
                    <div className="tab-content">
                        <div className="tab-pane fade active show" id="photosofgroup" role="tabpanel">
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

export default PhotosGroup
