import { useContext, useEffect } from "react";
import Zoom from 'ol/control/Zoom';
import MapContext from "../MapContext";

const ZoomButtons = () => {
  const { map } = useContext(MapContext);

  useEffect(() => {
    if (!map) return;

    let zoomButtons = new Zoom({})
    map.controls.push(zoomButtons);

    return () => map.controls.remove(zoomButtons);
  }, [map]);

  return null;
};

export default ZoomButtons;
