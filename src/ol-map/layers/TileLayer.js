import { useContext, useEffect, useState } from "react";
import MapContext from "../MapContext";
import OLTileLayer from "ol/layer/Tile";
import { OSM, XYZ } from "../source";
import './Layers.css'


const TileLayer = ({ source, zIndex = 0 }) => {
	const { map } = useContext(MapContext);

	const [pickedLayer, setPickedLayer] = useState("openStreetMapStandard");

	if (pickedLayer === "openStreetMapStandard") {
		source = OSM()
	} if (pickedLayer === "satelliteLayer") {
		source = XYZ({ url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}.png" })
	} if (pickedLayer === "stamenTerrain") {
		source = XYZ({ url: "https://stamen-tiles.a.ssl.fastly.net/terrain/{z}/{x}/{y}.jpg" })
	} if (pickedLayer === "monochromeLayer") {
		source = XYZ({ url: "https://stamen-tiles.a.ssl.fastly.net/toner/{z}/{x}/{y}.png" })
	} else { }

	const handleChange = (e) => {
		setPickedLayer(e.target.value);
	}

	useEffect(() => {
		if (!map) return;

		let tileLayer = new OLTileLayer({
			source,
			zIndex,
		});

		map.addLayer(tileLayer);
		tileLayer.setZIndex(zIndex);

		return () => {
			if (map) {
				map.removeLayer(tileLayer);
			}
		};
	}, [map, pickedLayer]);

	return (
		<div className="layer-picker">
			<p>Layers:</p>
			<input
				type="radio"
				name="baseLayerRadioButton"
				value="openStreetMapStandard"
				onChange={handleChange}
				checked={pickedLayer === 'openStreetMapStandard'}
			/>{" "}Street<br></br>

			<input
				type="radio"
				name="baseLayerRadioButton"
				value="satelliteLayer"
				onChange={handleChange}
				checked={pickedLayer === 'satelliteLayer'}
			/>{" "}Satellite<br></br>

			<input
				type="radio"
				name="baseLayerRadioButton"
				value="stamenTerrain"
				onChange={handleChange}
				checked={pickedLayer === 'stamenTerrain'}
			/>{" "}Stamen Terrain<br></br>

			<input
				type="radio"
				name="baseLayerRadioButton"
				value="monochromeLayer"
				onChange={handleChange}
				checked={pickedLayer === 'monochromeLayer'}
			/>{" "}Monochrome<br></br>
		</div>
	);
};

export default TileLayer;
