import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';


const CrimeMap = withScriptjs(withGoogleMap((props) =>
    <GoogleMap
        defaultZoom={14}
        defaultCenter={{ lat: 51.4111, lng: - 0.050184 }}
    >
        {props.isMarkerShown && <Marker position={{ lat: 51.4111, lng: - 0.050184 }} />}
    </GoogleMap>
))

export default CrimeMap;