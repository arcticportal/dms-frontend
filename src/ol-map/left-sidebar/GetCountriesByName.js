import React, { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import MapContext from "../MapContext";
import { GET_COUNTRIES_BY_NAME } from "../../graphql/queries/GetCountries";
import { Vector as OLVectorSource } from 'ol/source';

function GQLToGeoJSON(api) {
    return api
}

const GetCountriesByName = () => {
    // const { map } = useContext(MapContext);
    const [getCountries, { error, loading, data }] = useLazyQuery(GET_COUNTRIES_BY_NAME);
    const [searchedCountry, setSearchedCountry] = useState("");


    useEffect(() => {  // update representation
        if (!data) return
        console.log(data.countries)
    }, [data]);

    if (error) console.log(error)
    if (loading) return <p>Loading...</p>
    return (
        <a>
            <input
                type="text"
                placeholder="search..."
                onChange={e => setSearchedCountry(e.target.value)}
            />
            <button onClick={() => {
                getCountries({ variables: { name: searchedCountry } })
            }}>Go</button>
        </a>
    );
}
export default GetCountriesByName;