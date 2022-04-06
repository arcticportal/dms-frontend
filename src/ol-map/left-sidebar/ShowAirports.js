import React, { useContext, useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import MapContext from "../MapContext";
import { LOAD_AIRPORTS } from "../../graphql/queries/GetAirports.js";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { fromLonLat } from "ol/proj";
import VectorLayer from "ol/layer/Vector";
import { Vector as VectorSource } from "ol/source";
import WKT from "ol/format/WKT";

function convertData(items) {
	if (items) {
		return items.map(item => {
      return {...item, geometry: new Point(fromLonLat(item.point.split("(")[1].split(" ").map((p) => parseFloat(p))))}
    })
	} else return []
}

function addMarkers(lonLatArray) {
	let features = lonLatArray.map((item) => {
		let feature = new Feature(item);
		return feature;
	});
	console.log(features);
	return features;
}


// function addMarkers(lonLatArray) {
// 	let features = lonLatArray.map((item) => {
// 		let feature = new Feature({
// 			geometry: item.geometry,
//       name: item.name,
//       iataCode: item.iataCode
// 		});
// 		return feature;
// 	});
// 	console.log(features);
// 	return features;
// }

// function convertToWKT(query) {
//   if (query) {
//     return query.map((a) =>
//       new WKT().writeFeature(new Feature({geometry: new Point(a.point.split(";")[1])}), {
//         dataProjection: "EPSG:4326",
//         featureProjection: "EPSG:3857",
//       })
//     );
//   } else return [];
// }

const ShowAirports = () => {
  const { map } = useContext(MapContext);
  const [getAirports, { error, loading, data }] = useLazyQuery(LOAD_AIRPORTS);
  const [checked, setChecked] = useState(false);
  const [visibility, setVisibility] = useState(true);
  const [vectorLayer, setVectorLayer] = useState({});

  useEffect(() => {
    // update screen when representation or check changed
    if (!map || !checked) return;
    map.addLayer(vectorLayer);
    vectorLayer.setZIndex(10);
    console.log("addLayer");
    return () => {
      if (map) {
        map.removeLayer(vectorLayer);
        console.log("cleanup");
      }
    };
  }, [vectorLayer, checked]);

  useEffect(() => {
    // update representation
    if (!data) return;
    console.log(data)
    // console.log(convertToWKT(data.airports));
    setVectorLayer(
      new VectorLayer({
        source: new VectorSource({
          features: addMarkers(convertData(data.airports))
          // features: convertToWKT(data.airports),
        }),
      })
    );
  }, [data]);

  if (loading) return <p>Loading... Icelandic airports</p>;
  if (error) return <p>Error :(</p>;
  return (
    <p>
      <span>Icelandic airports:</span>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
        className={visibility ? "hidden" : "visible"}
      />
      <button
        onClick={() => {
          getAirports({});
          setVisibility(false);
        }}
        // className={visibility ? "visible" : "hidden"}
      >
        Fetch
      </button>
    </p>
  );
};

export default ShowAirports;
