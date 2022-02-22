import XYZ from "ol/source/XYZ";

function xyz({ url, attributions, maxZoom }) {
	return new XYZ({ url, attributions, maxZoom });
}

export default xyz;