import React, { useState, useEffect, useRef } from 'react';

// openlayers
import Map from 'ol/Map';
import View from 'ol/View';
import MapContext from "./MapContext";
import "./MapWrapper.css";


const MapWrapper = ({ children, zoom, center }) => {
	const mapRef = useRef();
	const [map, setMap] = useState(null);
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


	return (
		<MapContext.Provider value={{ map }}>
			<div ref={mapRef} className="ol-map">
				{children}
			</div>
		</MapContext.Provider>

	)
}
export default MapWrapper