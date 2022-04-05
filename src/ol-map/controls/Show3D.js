import { useContext, useState, useEffect } from "react";
import MapContext from "../MapContext";
import OLCesium from "olcs/OLCesium";
import * as Cesium from "cesium";

window.Cesium = Cesium;

const Show3D = () => {
  const [cesiumSwitch, setCesiumSwitch] = useState(false);
  const [ol3d, setOl3d] = useState(null);

  const { map } = useContext(MapContext);
  let spatialMap = null;

  useEffect(() => {
    if (!map) return;

    if (setCesiumSwitch) {
      spatialMap = new OLCesium({ map: map });
      spatialMap.setEnabled(cesiumSwitch);
    } else {
      spatialMap = null;
    }
    console.log("3D switch");
    return () => {
      spatialMap.setEnabled(false);
      spatialMap = null;
    };
  }, [cesiumSwitch]);

  return (
    <>
      <input
        type="checkbox"
        checked={cesiumSwitch}
        onChange={(e) => setCesiumSwitch(!cesiumSwitch)}
        className="cesium-switch"
      />
    </>
  );
};

export default Show3D;
