import React, { useContext, useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import MapContext from "../MapContext";
import { LOAD_AIRPORTS } from "../../graphql/airports/Queries.js"
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { fromLonLat } from "ol/proj";
import { Layers, TileLayer, VectorLayer } from '../layers';
import { OSM, VectorSource } from "../source";
import OLVectorLayer from "ol/layer/Vector";
import { Vector as OLVectorSource } from 'ol/source';


function convertData(query) {
	if (query) {
		return query.map(a => a.point.split("(")[1].split(" ").map((a) => parseFloat(a)))
	} else return []
}

function addMarkers(lonLatArray) {
	let features = lonLatArray.map((item) => {
		let feature = new Feature({
			geometry: new Point(fromLonLat(item)),
		});
		return feature;
	});
	console.log(features)
	return features;
}

const ShowAirports = () => {
	const { map } = useContext(MapContext);

	const { error, loading, data } = useQuery(LOAD_AIRPORTS)
	const [airports, setAirports] = useState([]);
	const [features, setFeatures] = useState([]);
	const [checked, setChecked] = useState(false);
	let vectorLayer = {}

	useEffect(() => {
		if (data) {
			setAirports(convertData(data.airports))
			setFeatures(addMarkers(airports))
		}
	}, [data, checked])


	useEffect(() => {
		if (!map) return;
		if (checked) {
			vectorLayer = new OLVectorLayer({
				source: new OLVectorSource({ features }),
			});
			map.addLayer(vectorLayer);
			vectorLayer.setZIndex(10);
		} else { vectorLayer = {}}
		return () => {
			if (map) {
				map.removeLayer(vectorLayer);
			}
		};
	}, [map, features]);

	// console.log(airports)
	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error :(</p>;
	return (
		<>
			<input
				type="checkbox"
				checked={checked}
				onChange={e => setChecked(e.target.checked)}
			/>
			{" "}
			Iceland airports
		</>

	);
	// const { map } = useContext(MapContext);

	// useEffect(() => {
	// 	if (!map) return;

	// 	let fullScreenControl = new FullScreen({});

	// 	map.controls.push(fullScreenControl);

	// 	return () => map.controls.remove(fullScreenControl);
	// }, [map]);

};

export default ShowAirports;