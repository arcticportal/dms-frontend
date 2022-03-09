import React, { useContext, useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import MapContext from "../MapContext";
import { LOAD_AIRPORTS } from "../../graphql/airports/Queries.js";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { fromLonLat } from "ol/proj";
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
	console.log(features);
	return features;
}

const ShowAirports = () => {
	const { map } = useContext(MapContext);
	const [getAirports, { error, loading, data }] = useLazyQuery(LOAD_AIRPORTS);
	const [checked, setChecked] = useState(false);
	const [visibility, setVisibility] = useState(true)
	const [vectorLayer, setVectorLayer] = useState({});

	useEffect(() => {  // update screen when representation or check changed
		if (!map || !checked) return;
		map.addLayer(vectorLayer);
		vectorLayer.setZIndex(10);
		console.log('addLayer');
		return () => {
			if (map) {
				map.removeLayer(vectorLayer);
				console.log('cleanup');
			}
		}
	}, [vectorLayer, checked])

	useEffect(() => {  // update representation
		if (!data) return
		setVectorLayer(
			new OLVectorLayer({
				source: new OLVectorSource({
					features: addMarkers(convertData(data.airports))
				})
			})
		);
	}, [data]);

	if (loading) return <p>Loading... Icelandic airports</p>;
	if (error) return <p>Error :(</p>;
	return (
		<a>
			<input
				type="checkbox"
				checked={checked}
				onChange={e => setChecked(e.target.checked)}
				className={visibility ? "hidden" : "visible"}
			/>
			<button
				onClick={() => {getAirports({}); setVisibility(false)}}
				className={visibility ? "visible" : "hidden"}
			>
				Fetch
			</button>

			{" "}
			Icelandic airports
			{" "}
		</a>
	);
}

export default ShowAirports;