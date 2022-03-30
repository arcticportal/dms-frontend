import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, from } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import MapWrapper from "./ol-map/MapWrapper";
import { SidebarLeft, ShowAirports, GetCountriesByName, GetFilteredData } from "./ol-map/left-sidebar";
import { Controls, FullScreenControl, ShowCoordinates } from "./ol-map/controls";
import { Layers, TileLayer } from "./ol-map/layers";
import { GET_COUNTRIES_ID_BY_NAME, GET_STATES_ID_BY_NAME } from "./graphql/queries/GetCountries";
import { GET_AIRPORTS_IN_COUNTRY, GET_AIRPORTS_IN_STATE } from "./graphql/queries/GetAirports";
import { GET_CITIES_IN_COUNTRY, GET_CITIES_IN_STATE } from "./graphql/queries/GetCities";
import "./App.css";

// apollo
const errorLink = onError(({ graphqlErrors, networkError }) => {
  if (graphqlErrors) {
    graphqlErrors.map(({ message, location, path }) => {
      alert(`Graphql error ${message}`);
      return { location };
    });
  }
});

const link = from([errorLink, new HttpLink({ uri: "http://localhost:8000/graphiql/" })]);

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
              <GetFilteredData
                datasetName={"Search airports in state:"}
                filterQuery={GET_STATES_ID_BY_NAME}
                resultQuery={GET_AIRPORTS_IN_STATE}
              />
              <GetFilteredData
                datasetName={"Search cities in country:"}
                filterQuery={GET_COUNTRIES_ID_BY_NAME}
                resultQuery={GET_CITIES_IN_COUNTRY}
              />
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
};

export default App;
