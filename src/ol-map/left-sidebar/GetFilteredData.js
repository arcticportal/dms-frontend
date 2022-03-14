import React, { useContext, useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import MapContext from "../MapContext";
// import { GET_COUNTRIES_BY_NAME, GET_COUNTRIES_ID_BY_NAME, GET_STATES_ID_BY_NAME } from "../../graphql/queries/GetCountries";
import { Vector as VectorSource } from 'ol/source';
import WKT from 'ol/format/WKT';
import VectorLayer from "ol/layer/Vector";


function convertToWKT(query) {
    if (query) {
        return query.map(a => new WKT().readFeature(a.point.split(";")[1], {
            dataProjection: "EPSG:4326",
            featureProjection: "EPSG:3857"
        }))
    } else return []
}


const GetFilteredData = ({ datasetName, filterQuery, resultQuery }) => {
    const { map } = useContext(MapContext);
    const [getDataset, { error, loading, data }] = useLazyQuery(filterQuery);
    const [getResult, { error: resultError, loading: resultLoading, data: resultData }] = useLazyQuery(resultQuery);
    const [searchText, setSearchText] = useState("");
    const [suggestions, setSuggestions] = useState([])
    const [vectorLayer, setVectorLayer] = useState({});

    useEffect(() => {
        if (!resultData) return
        let fetchedResultData = resultData.airports ? resultData.airports : (resultData.cities ? resultData.cities : {})
        if (!resultData) return
        console.log(convertToWKT(fetchedResultData))
        setVectorLayer(
            new VectorLayer({
                source: new VectorSource({
                    features: convertToWKT(fetchedResultData)
                })
            })
        );
    }, [resultData])

    useEffect(() => {
        if (!map) return;
        map.addLayer(vectorLayer);
        vectorLayer.setZIndex(10);
        console.log(vectorLayer)
        console.log('addLayer');
        return () => {
            if (map) {
                map.removeLayer(vectorLayer);
                console.log('cleanup');
            }
        }
    }, [vectorLayer])

    useEffect(() => {  // update representation
        if (!data) return
        let fetchedData = data.countries ? data.countries : (data.states ? data.states : {})
        console.log(fetchedData)
        setSuggestions(fetchedData)
    }, [data]);

    useEffect(() => {
        if (searchText.length > 1) {
            getDataset({ variables: { name: searchText } })
        }
    }, [searchText])

    if (error) return <p>Error fetching data...</p>
    if (loading) console.log("loading...")
    return (
        <p>
            <span>{datasetName}</span>
            <span>
                <input
                    type="text"
                    placeholder="search..."
                    value={searchText}
                    onBlur={() => {
                        setTimeout(() => {
                            setSuggestions([])
                        }, 200)
                    }
                    }
                    onChange={e => setSearchText(e.target.value)}
                />
                {suggestions && suggestions.map((el, i) => (
                    <div
                        key={i}
                        className="suggestion"
                        onClick={() => {
                            setSearchText(el.name);
                            setSuggestions([]);
                            getResult({ variables: { pk: el.id } });
                        }}
                    >
                        {el.name}
                    </div>
                ))}
            </span>
        </p>
    );
}
export default GetFilteredData;