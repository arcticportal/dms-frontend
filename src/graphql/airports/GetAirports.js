import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { LOAD_AIRPORTS } from './Queries'
import { VectorLayer } from '../../ol-map/layers';
import GeoJSON from 'ol/format/GeoJSON'
import { VectorSource } from '../../ol-map/source';
import Feature from 'ol/Feature';
import Polygon from 'ol/geom/Polygon';
import Point from 'ol/geom/Point';
import { fromLonLat, get } from "ol/proj";

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
    window.tmp = new Feature({
        geometry: new Point([-2012970.97, 9783629.87]),
        name: "SASASAS"
                })
        return ;
    // return <OLVectorLayer source={vector(
    //     new Feature({
    //         geometry: new Point([-2012970.97, 9783629.87]),
    //         name: "SASASAS"
    //                 })
    //         )}/>;
};

export default GetAirports