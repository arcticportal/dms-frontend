import { useContext, useEffect, useRef, useState } from "react";
import MapContext from "../MapContext";
import { toStringXY } from "ol/coordinate";
import { transform } from "ol/proj";

const ShowCoordinates = () => {
  const { map } = useContext(MapContext);
  const [selectedCoord, setSelectedCoord] = useState(null);

  const mapElement = useRef();
  mapElement.current = map;

  useEffect(() => {
    if (!map) return;
    map.on("click", handleMapClick);

    return () => map.setTarget(undefined);
  }, [map]);

  const handleMapClick = (e) => {
    // get clicked coordinate using mapRef to access current React state inside OpenLayers callback
    //  https://stackoverflow.com/a/60643670
    const clickedCoord = mapElement.current.getCoordinateFromPixel(e.pixel);

    // transform coord to EPSG 4326 standard Lat Long
    const transormedCoord = transform(clickedCoord, "EPSG:3857", "EPSG:4326");

    // set React state
    setSelectedCoord(transormedCoord);
  };

  return (
    <div className="clicked-coord-label">
      <p>{selectedCoord ? toStringXY(selectedCoord, 5) : ""}</p>
    </div>
  );
};

export default ShowCoordinates;
