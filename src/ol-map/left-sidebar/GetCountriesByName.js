import React, { useContext, useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import MapContext from "../MapContext";
import { GET_COUNTRIES_BY_NAME } from "../../graphql/queries/GetCountries";
import { Vector as VectorSource } from "ol/source";
import WKT from "ol/format/WKT";
import VectorLayer from "ol/layer/Vector";

function convertToWKT(query) {
  if (query) {
    return query.map((a) =>
      new WKT().readFeature(a.geometry.split(";")[1], {
        dataProjection: "EPSG:4326",
        featureProjection: "EPSG:3857",
      })
    );
  } else return [];
}

const GetCountriesByName = () => {
  const { map } = useContext(MapContext);
  const [getCountries, { error, loading, data }] = useLazyQuery(GET_COUNTRIES_BY_NAME);
  const [searchedCountry, setSearchedCountry] = useState("");
  const [vectorLayer, setVectorLayer] = useState({});

  useEffect(() => {
    if (!map) return;
    map.addLayer(vectorLayer);
    vectorLayer.setZIndex(5);
    console.log(vectorLayer);
    console.log("addLayer");
    return () => {
      if (map) {
        map.removeLayer(vectorLayer);
        console.log("cleanup");
      }
    };
  }, [vectorLayer]);

  useEffect(() => {
    if (!data) return;
    console.log(convertToWKT(data.countries));
    setVectorLayer(
      new VectorLayer({
        source: new VectorSource({
          features: convertToWKT(data.countries),
        }),
      })
    );
  }, [data]);

  if (error) return <p>Error fetching data...</p>;
  if (loading) return <p>Loading...</p>;
  return (
    <p>
      <span>Find country:</span>
      <span>
        <input type="text" placeholder="search..." onChange={(e) => setSearchedCountry(e.target.value)} />
        <button
          onClick={() => {
            getCountries({ variables: { name: searchedCountry } });
          }}
        >
          Go
        </button>
      </span>
    </p>
  );
};
export default GetCountriesByName;
