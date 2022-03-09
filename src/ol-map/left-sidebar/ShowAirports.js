import React, { useContext, useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import MapContext from "../MapContext";
import { LOAD_AIRPORTS } from "../../graphql/airports/Queries.js"
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
	console.log(features)
	return features;
}

const ShowAirports = () => {
	const { map } = useContext(MapContext)
	const { error, loading, data } = useQuery(LOAD_AIRPORTS)
	const [checked, setChecked] = useState(false)
	const [representation, setRepresentation] = useState({})

	function addLayer(map, lay) {
		map.addLayer(lay); lay.setZIndex(10)
		return () => { if (map) { map.removeLayer(lay); console.log('cleanup')} }
	}

	useEffect(() => {  // update screen when check toggled
		if (!map) return
		var lay = representation.vectorLayer
		if (!checked) { return () => { console.log('hello')}}
		return addLayer(map, lay)
	}, [checked])

	useEffect(() => {  // update screen when repr changed
		if (!map || !checked) return
		var prev = representation.previousLayer
		if (prev) map.removeLayer(prev)
		return addLayer(map, representation.vectorLayer)
		// return () => {
		// 	if (map) {
		// 		map.removeLayer(prev)
		// 	}
		// }
	}, [representation])

	useEffect(() => {  // update representation
		if (!data) return
		setRepresentation({
			previousLayer: representation.vectorLayer,
			vectorLayer: new OLVectorLayer({
				source: new OLVectorSource({
					features: addMarkers(convertData(data.airports))
				})
			})
		})
	}, [data])

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
}

// const ShowAirports = () => {
// 	const { map } = useContext(MapContext);

// 	const { error, loading, data } = useQuery(LOAD_AIRPORTS)
// 	const [airports, setAirports] = useState([]);
// 	const [features, setFeatures] = useState([]);
// 	const [checked, setChecked] = useState(false);
// 	console.log(data)


// 	useEffect(() => {
// 		if (data && checked) {
// 			setAirports(convertData(data.airports))
// 		}
// 	}, [data, checked])

// 	useEffect(() => {
// 		if (airports.length) {
// 			setFeatures(addMarkers(airports))
// 		}
// 	}, [airports])

// 	useEffect(() => {
// 		let vectorLayer = {}
// 		if (!map) return;
// 		if (checked) {
// 			vectorLayer = new OLVectorLayer({
// 				source: new OLVectorSource({ features }),
// 			});
// 			map.addLayer(vectorLayer);
// 			vectorLayer.setZIndex(10);
// 		}
// 		return () => {
// 			if (map) {
// 				map.removeLayer(vectorLayer);
// 			}
// 		};
// 	}, [checked, features]);

// 	if (loading) return <p>Loading...</p>;
// 	if (error) return <p>Error :(</p>;
// 	return (
// 		<>
// 			<input
// 				type="checkbox"
// 				checked={checked}
// 				onChange={e => setChecked(e.target.checked)}
// 			/>
// 			{" "}
// 			Iceland airports
// 		</>
// 	);
// };

export default ShowAirports;