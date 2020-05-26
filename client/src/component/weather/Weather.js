import React, { Fragment, useState, useEffect } from 'react'
import moment from 'moment';
import Icon from './Icon';
import Spinner from '../layout/spinner/ContentLoader';
import MapLocation from './MapLocation';
import bg2 from "../../images/page-img/profile-bg2.jpg"
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng
} from "react-places-autocomplete";

const Weather = () => {
    const [current, setCurrent] = useState(null)
    const [temp, setTemp] = useState([])
    const [cityName, setCityName] = useState('')
    const [country, setCountry] = useState('')
    const [latLng, setLatLng] = useState({
        lat: 21.14,
        lng: 105.5
    })

    const [address, setAddress] = useState("");
    const [coordinates, setCoordinates] = useState({
        lat: null,
        lng: null
    });

    const handleSelect = async value => {
        const results = await geocodeByAddress(value);
        const latLng = await getLatLng(results[0]);
        setAddress(value);
        setCoordinates(latLng);
    };

    // const api = {
    //     key: "f5f6a60d129f4010aab7939e7688da1d",
    //     base: "https://api.openweathermap.org/data/2.5/"
    // }

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(async (position) => {
            setLatLng({
                lat: position.coords.latitude,
                lng: position.coords.longitude
            })
            await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${position.coords.latitude}&lon=${position.coords.longitude}&exclude=minutely,hourly&units=metric&appid=ff3360ceee082483de51fd9ec4206f92`)
                .then(res => res.json())
                .then(result => {
                    console.log(result);
                    setCurrent(result.current);
                    setTemp(result.daily);
                });
        });
    }, [])

    const checkWether = async (e) => {
        e.preventDefault();
        await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latLng.lat}&lon=${latLng.lng}&exclude=minutely,hourly&units=metric&appid=ff3360ceee082483de51fd9ec4206f92`)
            .then(res => res.json())
            .then(result => {
                setCurrent(result.current);
                setTemp(result.daily);
            });
    }

    return (
        <Fragment>
            <div className="header-for-bg">
                <div className="background-header position-relative">
                    <img src={bg2} className="img-fluid w-100 rounded rounded" alt="header-bg" />
                    <div className="title-on-header">
                        <div className="data-block">
                            <h2>Thời tiết</h2>
                        </div>
                    </div>
                </div>
            </div>
            {/* Page Content  */}
            <div id="content-page" className="content-page">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3">
                            <div className="iq-card iq-card-block iq-card-stretch iq-card-height">
                                <div className="iq-card-body">
                                    <form onSubmit={checkWether}>
                                        <div className="form-group">
                                            <label htmlFor="country-and-timezone">Thành phố</label>
                                            <input className="form-control" placeholder="Nhập tên thành phố..." />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="temperature-unit">Đơn vị nhiệt độ</label>
                                            <select className="form-control" id="temperature-unit" defaultValue="Temperature Unit">
                                                <option>C°</option>
                                                <option>F°</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <button type="submit" className="btn  btn-primary d-block w-100">Xem thời tiết</button>
                                        </div>
                                    </form>
                                </div>
                                {/* <PlacesAutocomplete
                                    value={address}
                                    onChange={setAddress}
                                    onSelect={handleSelect}
                                >
                                    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                        <div>

                                            <div className="mt-3 ml-3">
                                                <p>Latitude: {coordinates.lat}</p>
                                                <p>Longitude: {coordinates.lng}</p>

                                            </div>

                                            <div className="iq-card-body">
                                                <form onSubmit={checkWether}>
                                                    <div className="form-group">
                                                        <label htmlFor="country-and-timezone">Thành phố</label>
                                                        <input className="form-control" {...getInputProps({ placeholder: "Nhập tên thành phố..." })} />
                                                    </div>

                                                    <div>
                                                        {loading ? <div>...loading</div> : null}

                                                        {suggestions.map(suggestion => {
                                                            const style = {
                                                                backgroundColor: suggestion.active ? "#41b6e6" : "#fff"
                                                            };

                                                            return (
                                                                <div {...getSuggestionItemProps(suggestion, { style })}>
                                                                    {suggestion.description}
                                                                </div>
                                                            );
                                                        })}
                                                    </div>


                                                    <div className="form-group">
                                                        <label htmlFor="temperature-unit">Đơn vị nhiệt độ</label>
                                                        <select className="form-control" id="temperature-unit" defaultValue="Temperature Unit">
                                                            <option>C°</option>
                                                            <option>F°</option>
                                                        </select>
                                                    </div>
                                                    <div className="form-group">
                                                        <button type="submit" className="btn  btn-primary d-block w-100">Xem thời tiết</button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    )}
                                </PlacesAutocomplete> */}
                            </div>

                        </div>
                        <div className="col-lg-6">
                            <MapLocation latLng={latLng} />
                        </div>
                        <div className="col-lg-3">
                            {
                                current ?
                                    <div className="iq-card iq-card-block iq-card-stretch iq-card-height bg-primary rounded">
                                        <div className="iq-card-body p-4">
                                            <div className="text-center">
                                                <div className="d-flex align-items-center justify-content-center">
                                                    <Icon icon={current.weather[0].id} />
                                                    <div className="text-left">
                                                        <h6 className="text-white"> {country} </h6>
                                                        <p className="mb-0">{cityName}</p>
                                                    </div>
                                                </div>
                                                <div className="main-temp">
                                                    <h1 className="text-white">{parseInt(current.temp)}</h1>
                                                </div>
                                                <ul className="d-flex align-items-center justify-content-center list-inline m-0 p-0">
                                                    <li>
                                                        <p className="text-white mb-0">Hôm nay</p>
                                                        <h6 className="text-white">
                                                            <strong>
                                                                {current.weather[0].description}
                                                            </strong>
                                                        </h6>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div> : <Spinner />
                            }

                        </div>
                        <div className="col-sm-12">
                            {
                                temp.length > 0 ?
                                    <div className="iq-card">
                                        <div className="iq-card-body bg-info rounded">
                                            <ul className="iq-week-data d-flex justify-content-between list-inline m-0 p-0">
                                                {
                                                    temp.map((t, i) =>
                                                        <li key={i} className="text-center pt-4 pb-4">
                                                            <p className="mb-0">
                                                                {moment.unix(t.dt).locale('vi').format('dddd').toUpperCase()}
                                                            </p>
                                                            <p className="mb-0 font-size-12">
                                                                {moment.unix(t.dt).format('DD-MM-YYYY')}
                                                            </p>
                                                            <div className="weather-icon">
                                                                <Icon icon={t.weather[0].id} />
                                                            </div>
                                                            <h6>
                                                                <strong>
                                                                    {parseInt(t.temp.min)} ° - {parseInt(t.temp.max)} °
                                                        </strong>
                                                            </h6>
                                                            <p className="mb-0 font-size-12">
                                                                {t.weather[0].description}
                                                            </p>
                                                        </li>
                                                    )
                                                }
                                            </ul>
                                        </div>
                                    </div> : <Spinner />
                            }

                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default Weather