import { useContext, useEffect } from "react";
import Rotate from 'ol/control/Rotate';
import MapContext from "../MapContext";

const ResetRotation = () => {
  const { map } = useContext(MapContext);

  useEffect(() => {
    if (!map) return;

    let resetRotation = new Rotate({tipLabel: "Reset rotation", className: "ol-rotate", autoHide: true})

    map.controls.push(resetRotation);

    return () => map.controls.remove(resetRotation);
  }, [map]);

  return null;
};

export default ResetRotation;
