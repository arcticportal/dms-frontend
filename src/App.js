import React, { useState } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, from } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
// import { fromLonLat } from "ol/proj";

// components
import MapWrapper from './ol-map/map-context/MapWrapper'
import GetAirports from './graphql/airports/GetAirports';
import { Controls, FullScreenControl } from "./ol-map/controls";
import { Layers, TileLayer } from './ol-map/layers';
import { osm } from "./ol-map/source";
import './App.css';


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
])

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
})

const App = () => {
  // set initial state
  const [center, setCenter] = useState([-2012970.97, 9783629.87]);
  const [zoom, setZoom] = useState(5);


  return (
    // <div>
    //   <ApolloProvider client={client}>
    //     {" "}
    //     <GetAirports />
    //   </ApolloProvider>
    <div className="App">
      <MapWrapper center={center} zoom={zoom}>
        <Layers>
          <TileLayer source={osm()} zIndex={0} />
        </Layers>
        <Controls>
          <FullScreenControl />
        </Controls>
      </MapWrapper>
    </div>
    // </div>
  );
}

export default App