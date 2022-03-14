import "./MapWrapper.css";
import OLCesium from "olcs/OLCesium.js"
// import OLCesium from 'ol-cesium';
import React, { useState, useEffect, useRef } from 'react';

// openlayers
import Map from 'ol/Map';
import View from 'ol/View';
import MapContext from "./MapContext";
import * as Cesium from 'cesium';
import "../../node_modules/cesium/Build/Cesium/Widgets/widgets.css";



// window.CESIUM_BASE_URL = '../node_modules/cesium/Build/Cesium/';
window.Cesium = Cesium

const MapWrapper = ({ children, zoom, center }) => {
	const mapRef = useRef();
	const [map, setMap] = useState(null);
	const [ol3d, setOl3d] = useState(null)
	const [cesiumSwitch, setCesiumSwitch] = useState(false)
	const mapElement = useRef()
	mapElement.current = map

	useEffect(() => {
		if (ol3d) {
			ol3d.setEnabled(cesiumSwitch);
		}
		console.log("3D: ", cesiumSwitch)
		console.log(ol3d)
	}, [cesiumSwitch])

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
		setOl3d(new OLCesium({ map: mapObject }));
		console.log(ol3d)
		return () => {mapObject.setTarget(undefined); setOl3d(null);}
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
			<input
				type="checkbox"
				checked={cesiumSwitch}
				onChange={e => setCesiumSwitch(!cesiumSwitch)}
				className="cesium-switch"
			/>
		</MapContext.Provider>

	)
}
export default MapWrapper