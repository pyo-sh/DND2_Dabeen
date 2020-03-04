import React, { useState, useEffect } from 'react';
import Geocode from 'react-geocode';    //주소를 위도, 경도로 계산해서 나타내줌
import apiKeys from '../../api/apiKeys';
import GoogleMapReact from 'google-map-react';
import { MarkImage, Map } from './MyLocation.styled';

const MyLocation = ({myLocation}) => {
    // //임시로 부경대학교 위치가 제일 처음 뜨게 설정했다.
    const [lat, setLat] = useState(35.135);
    const [lng, setLng] = useState(129.107);
    const Marker = ({ image }) => <MarkImage src={image} alt="지도 핀"/>;

    useEffect(()=>{
        Geocode.setApiKey(apiKeys.geocoding);
        Geocode.setLanguage("kr");
        Geocode.fromAddress(myLocation).then(
            response => {
                setLat(response.results[0].geometry.location.lat)
                setLng(response.results[0].geometry.location.lng)
            },
            error => {
                console.error(error);
            }
        )
        
    }, [myLocation]);

    return (
        <Map>
            <GoogleMapReact
                bootstrapURLKeys={{key: apiKeys.googlemap}}
                center={{lat: lat, lng: lng}}
                defaultZoom={16}
            >
                <Marker lat={lat} lng={lng} image="/images/pin.svg"/>
            </GoogleMapReact>
        </Map>
    );
};

export default MyLocation;