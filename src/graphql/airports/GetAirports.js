import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { LOAD_AIRPORTS } from './Queries'

function GetAirports() {

    const { error, loading, data } = useQuery(LOAD_AIRPORTS)
    const [airports, setAirports] = useState([]);

    useEffect(() => {
        if (data) {
            setAirports(data.airports)
        }
    }, [data])

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return airports;
};

export default GetAirports