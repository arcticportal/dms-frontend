import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { LOAD_AIRPORTS } from '../../graphql/Queries'

function GetAirports() {

    const { error, loading, data } = useQuery(LOAD_AIRPORTS)
    const [airports, setAirports] = useState([]);

    useEffect(() => {
        console.log(data)
        if (data) {
            setAirports(data.airports)
        }
    }, [data])


    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
        <div>
        </div>
    );
};

export default GetAirports