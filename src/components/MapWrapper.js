import React, { useState, useEffect, useRef } from 'react';

// openlayers
import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import XYZ from 'ol/source/XYZ'
import { transform } from 'ol/proj'
import { toStringXY } from 'ol/coordinate';
import "./MapWrapper.css";

function MapWrapper(props) {

    // set initial state
    const [map, setMap] = useState()
    const [featuresLayer, setFeaturesLayer] = useState()
    const [selectedCoord, setSelectedCoord] = useState()

    // pull refs
    const mapElement = useRef()

    // create state ref that can be accessed in OpenLayers onclick callback function
    //  https://stackoverflow.com/a/60643670
    const mapRef = useRef()
    mapRef.current = map

    // initialize map on first render - logic formerly put into componentDidMount
    useEffect(() => {
        // create and add vector source layer
        const initialFeaturesLayer = new VectorLayer({
            source: new VectorSource()
        })

        // create map
        const initialMap = new Map({
            target: mapElement.current,
            layers: [
                // USGS Topo
                new TileLayer({
                    source: new XYZ({
                        url: 'https://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer/tile/{z}/{y}/{x}',
                    })
                }),
                initialFeaturesLayer
            ],
            view: new View({
                // projection: 'EPSG:3857',
                center: [-2012970.97, 9783629.87],
                zoom: 7,
                maxZoom: 20,
                minZoom: 2,
                // rotation: 0,
            }),
            controls: [],
        })

        // set map onclick handler
        initialMap.on('click', handleMapClick)

        // save map and vector layer references to state
        setMap(initialMap)
        setFeaturesLayer(initialFeaturesLayer)
    }, [])


    // map click handler
    const handleMapClick = (event) => {
        // get clicked coordinate using mapRef to access current React state inside OpenLayers callback
        //  https://stackoverflow.com/a/60643670
        const clickedCoord = mapRef.current.getCoordinateFromPixel(event.pixel);

        // transform coord to EPSG 4326 standard Lat Long
        const transformedCoord = transform(clickedCoord, 'EPSG:3857', 'EPSG:4326')

        // set React state
        setSelectedCoord(transformedCoord)
    }

    // render component
    return (
        <div>
            <div ref={mapElement} className="map-container">
                <div className="clicked-coord-label">
                    <p>{(selectedCoord) ? toStringXY(selectedCoord, 5) : ''}</p>
                </div>
            </div>
        </div>
    )
}
export default MapWrapper