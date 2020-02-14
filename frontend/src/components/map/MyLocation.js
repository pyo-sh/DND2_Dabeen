import React, { useCallback, useState } from 'react';
import {GoogleApiWrapper, InfoWindow, Map, Marker} from 'google-maps-react';
import Geocode from 'react-geocode';    //주소를 위도, 경도로 계산해서 나타내줌
import apiKeys from '../../api/apiKeys';

Geocode.setApiKey(apiKeys.geocoding);
Geocode.setLanguage("kr");

const MyLocation = ({myLocation}) => {
    const [lat, setLat] = useState(0);
    const [lng, setLng] = useState(0);

    Geocode.fromAddress(myLocation).then(
        response => {
            setLat(response.results[0].geometry.location.lat)
            setLng(response.results[0].geometry.location.lng)
        },
        error => {
            console.error(error);
        }
    )

    return (
        <div>
            <Map google={google} 
                style={{width: '29vw', height: '10vh'}}
                zoom={14}
                center={{lat: lat, lng: lng}}
                >
                <Marker 
                    name={"Current location"} 
                    position={{lat: lat, lng: lng}}
                />
                <InfoWindow>
                    <div>
                        <h1>test</h1>
                    </div>
                </InfoWindow>
            </Map>
        </div>
    );
};

export default GoogleApiWrapper({
    apiKey: apiKeys.googlemap
})(MyLocation);