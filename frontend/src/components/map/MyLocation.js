import React, { useState } from 'react';
import {GoogleApiWrapper, InfoWindow, Map, Marker} from 'google-maps-react';
import Geocode from 'react-geocode';    //주소를 위도, 경도로 계산해서 나타내줌
import apiKeys from '../../api/apiKeys';

const MyLocation = ({myLocation}) => {
    const [lat, setLat] = useState(0);
    const [lng, setLng] = useState(0);

    Geocode.setApiKey(apiKeys.geocoding);
    Geocode.setLanguage("kr");
    Geocode.fromAddress(myLocation).then(
        response => {
            setLat(response.results[0].geometry.location.lat)
            setLng(response.results[0].geometry.location.lng)
            console.log(response.results[0].geometry.location)
        },
        error => {
            console.error(error);
        }
    )

    return (
        <div>
            <Map google={google} 
                style={{width: '29vw', height: '20vh'}}
                zoom={16}
                // 우리학교 위치를 초기값으로
                initialCenter={{
                    lat: 35.134,
                    lng: 129.108
                }}
                center={{lat: lat, lng: lng}}
                >
                <Marker 
                    name={"Current location"} 
                    position={{lat: lat, lng: lng}}
                />
            </Map>
        </div>
    );
};

export default GoogleApiWrapper({
    apiKey: apiKeys.googlemap
})(MyLocation);