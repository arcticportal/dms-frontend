import './App.css';
import {ApolloClient, InMemoryCache, ApolloProvider, HttpLink, from} from "@apollo/client";

// react
import React, { useState, useEffect } from 'react';

// openlayers
import GeoJSON from 'ol/format/GeoJSON'
// import Feature from 'ol/Feature';

// components
import MapWrapper from './components/MapWrapper'


function App() {
  
  // set initial state
  const [ features, setFeatures ] = useState([])

  
  return (
    <div className="App">
      
      <MapWrapper features={features} />

    </div>
  )
}

export default App