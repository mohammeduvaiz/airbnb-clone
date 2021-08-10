import ReactMapGL, { Marker, Popup } from 'react-map-gl'
import { useState } from 'react';
import getCenter from "geolib/es/getCenter";
function Maps({searchResults}) {
    const [selectedLocation, setSelectedLocation] = useState({})
    
    const coordinates = searchResults.map((result) => ({
        longitude : result.long ,
        latitude : result.lat
    }));

    const center = getCenter(coordinates);

   
    const [viewPort, setViewPort] = useState({
        width:"100%",
        height:"100%",
        latitude: center.latitude,
        longitude: center.longitude,
        zoom: 13
    });

    return (
        <ReactMapGL
            mapStyle="mapbox://styles/uvaiz05/cks3gr3fi3gw118o4rr5b4az3"
            mapboxApiAccessToken={process.env.mapbox_key}
            {...viewPort}
            onViewportChange={(nextViewPort) => setViewPort(nextViewPort)}
        >
            {searchResults.map((result) => (
                <div key={result.long}>
                    <Marker
                        longitude={result.long}
                        latitude={result.lat}
                        offsetLeft={-20}
                        offsetTop={-10}
                    >
                        <p
                            onClick={() => setSelectedLocation(result)}
                            className="cursor-pointer text-2xl animate-bounce">
                            📌
                         </p>
                    </Marker>
                    {selectedLocation.long === result.long ?
                        (
                            <Popup
                                onClose={() => setSelectedLocation({})}
                                closeOnClick={true}
                                latitude={result.lat}
                                longitude={result.long}
                            >
                                {result.title}
                            </Popup>
                        ) : (
                            false
                        )}
                </div>
            ))}
        </ReactMapGL>
    )
}

export default Maps
