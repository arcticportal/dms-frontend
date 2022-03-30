import { Vector as OLVectorSource } from "ol/source";

function VectorSource({ features }) {
  return new OLVectorSource({ features });
}

export default VectorSource;
