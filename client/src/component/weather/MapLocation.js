import React, { useState, useEffect } from 'react'
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import GPS from './GPS.png';


const MapLocation = ({ latLng }) => {
    const [state, setState] = useState({
        GPS: latLng,
        zoom: 12
    })

    useEffect(() => {
        setState({
            GPS: latLng,
            zoom: 12
        })
    },[latLng])

    const GPSIcon = L.icon({
        iconUrl: GPS,
        iconSize: [60, 60], // size of the icon
        shadowSize: [50, 64], // size of the shadow
        iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
        shadowAnchor: [4, 62],  // the same for the shadow
        popupAnchor: [-3, -76]
    });

    const positionGPS = [state.GPS.lat, state.GPS.lng];

    const handleClick = (e) => {
        console.log(e.latlng);
    }

    return (
        <div className="iq-card iq-card-block iq-card-stretch iq-card-height">
            <div className="iq-card-body p-0">
                <div id="weather-chart">
                    <Map className="map" center={positionGPS} zoom={state.zoom} onClick={handleClick}>
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        <Marker position={positionGPS} icon={GPSIcon}>
                            <Popup>
                                I'm here
                            </Popup>
                        </Marker>
                    </Map>
                </div>



            </div>
        </div>
    )
}

export default MapLocation
