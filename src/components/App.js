import React from 'react';
import CrimeMap from './CrimeMap'

import '../styles/components/app.scss';

class App extends React.Component {

    constructor() {
        super();
    }

    render() {
        return (
            <div className="app">
                <CrimeMap
                    isMarkerShown
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyD7E9Z1JUBNM-AuoGIeK-YXGjAUz4yG2i0&v=3.exp&libraries=geometry,drawing,places"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `400px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                />
            </div>
        )
    }
}

export default App;
