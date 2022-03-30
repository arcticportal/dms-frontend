import xyz from "ol/source/XYZ";

function XYZ({ url, attributions, maxZoom }) {
  return new xyz({ url, attributions, maxZoom });
}

export default XYZ;
