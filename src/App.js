import './App.css';
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, from } from '@apollo/client';
import { onError } from '@apollo/client/link/error';

// react
import React, { useState } from 'react';

// components
import MapWrapper from './components/MapWrapper'
import GetAirports from './components/apollo/GetAirports';

const errorLink = onError(({ graphqlErrors, networkError }) => {
  if (graphqlErrors) {
    graphqlErrors.map(({ message, location, path }) => {
      alert(`Graphql error ${message}`);
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

function App() {

  // set initial state
  const [features, setFeatures] = useState([])


  return (
    <ApolloProvider client={client}>
      {" "}
      <GetAirports />
      <div className="App">

        <MapWrapper features={features} />

      </div>
    </ApolloProvider>
  )
}

export default App