import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, from } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import MapWrapper from './ol-map/MapWrapper';
import { SidebarLeft, ShowAirports, GetCountriesByName } from './ol-map/left-sidebar';
import { Controls, FullScreenControl, ShowCoordinates } from "./ol-map/controls";
import { Layers, TileLayer } from './ol-map/layers';
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
    const center = [-2012970.97, 9783629.87];
    const zoom = 5;

    return (
        <div>
            <div className="App">
                <ApolloProvider client={client}>
                    <MapWrapper center={center} zoom={zoom}>
                        <SidebarLeft>
                            <ShowAirports />
                            <GetCountriesByName />
                        </SidebarLeft>
                        <Layers>
                            <TileLayer />
                        </Layers>
                        <Controls>
                            <ShowCoordinates />
                            <FullScreenControl />
                        </Controls>
                    </MapWrapper>
                </ApolloProvider>
            </div>
        </div>
    );
}

export default App