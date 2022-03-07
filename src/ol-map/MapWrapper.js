import React, { useState, useEffect, useRef } from 'react';

// openlayers
import Map from 'ol/Map';
import View from 'ol/View';
import { transform } from 'ol/proj';
import { toStringXY } from 'ol/coordinate';
import MapContext from "./MapContext";
import "./MapWrapper.css";


const MapWrapper = ({ children, zoom, center }) => {
	const mapRef = useRef();
	const [map, setMap] = useState(null);
	const [selectedCoord, setSelectedCoord] = useState(null);

	const mapElement = useRef()
	mapElement.current = map

	// on component mount
	useEffect(() => {
		let options = {
			target: mapRef.current,
			view: new View({ zoom, center, maxZoom: 17, minZoom: 2, rotation: 0 }),
			layers: [],
			controls: [],
			overlays: []
		};

		let mapObject = new Map(options);
		mapObject.on('click', handleMapClick)
		mapObject.setTarget(mapRef.current);
		setMap(mapObject);

		return () => mapObject.setTarget(undefined);
	}, []);

	// zoom change handler
	useEffect(() => {
		if (!mapElement.current) return;

		mapElement.current.getView().setZoom(zoom);
	}, [zoom]);

	// center change handler
	useEffect(() => {
		if (!mapElement.current) return;

		mapElement.current.getView().setCenter(center)
	}, [center])

	const handleMapClick = (e) => {
		// get clicked coordinate using mapRef to access current React state inside OpenLayers callback
		//  https://stackoverflow.com/a/60643670
		const clickedCoord = mapElement.current.getCoordinateFromPixel(e.pixel);

		// transform coord to EPSG 4326 standard Lat Long
		const transormedCoord = transform(clickedCoord, 'EPSG:3857', 'EPSG:4326')

		// set React state
		setSelectedCoord(transormedCoord)
	}

	return (
		<MapContext.Provider value={{ map }}>
			<div ref={mapRef} className="ol-map">
				{children}
				<div className="clicked-coord-label">
					<p>{(selectedCoord) ? toStringXY(selectedCoord, 5) : ''}</p>
				</div>
			</div>
		</MapContext.Provider>

	)
}
export default MapWrapper