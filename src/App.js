import React, { useState } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, from } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { fromLonLat } from "ol/proj";

// components
import MapWrapper from './ol-map/MapWrapper';
import { Controls, FullScreenControl } from "./ol-map/controls";
import { Layers, TileLayer, VectorLayer } from './ol-map/layers';
import { OSM, VectorSource } from "./ol-map/source";
import Feature from 'ol/Feature';
import Polygon from 'ol/geom/Polygon';
import Point from 'ol/geom/Point';
import { Style, Icon } from "ol/style";
import { GetAirports } from "./graphql/airports";
import './App.css';

// apollo 
const errorLink = onError(({ graphqlErrors, networkError }) => {
    if (graphqlErrors) {
        graphqlErrors.map(({ message, location, path }) => {
            alert(`Graphql error ${message}`);
            return { location }
        });
    }
});

const link = from([
    errorLink,
    new HttpLink({ uri: 'http://localhost:8000/graphiql/' })
]);

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: link,
});
// apollo end

const App = () => {
    // set initial state
    const [center, setCenter] = useState([-2012970.97, 9783629.87]);
    const [zoom, setZoom] = useState(5);

    var feature = new Feature({
        geometry: new Point(fromLonLat([-18.0709, 65.657])),
    });
    const olstyle = new Style({
        image: new Icon({
            anchorXUnits: "fraction",
            anchorYUnits: "pixels",
            src: "https://cdn2.iconfinder.com/data/icons/social-media-and-payment/64/-47-64.png",
        }),
    })
    // feature.setStyle(olstyle)

    var [features, setFeatures] = useState([feature])


    return (
        <div>
            <div className="App">
                <MapWrapper center={center} zoom={zoom}>
                    <Layers>
                        <TileLayer source={OSM()} />
                        {/* <ApolloProvider client={client}>
                            {" "}
                            <GetAirports />
                        </ApolloProvider> */}

                        <VectorLayer source={VectorSource({ features })} zIndex={10} />
                    </Layers>
                    <Controls>
                        <FullScreenControl />
                    </Controls>
                </MapWrapper>
            </div>
        </div>
    );
}

export default App