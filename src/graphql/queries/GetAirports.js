import { gql } from "@apollo/client";

export const LOAD_AIRPORTS = gql`
  query {
    airports(filters: { country: { pk: 146 } }) {
      name
      iataCode
      state
      gpsCode
      point
      url
      ourAirportsId
      wikipediaUrl
      airportType
      country
      localCode
    }
  }
`;

export const GET_AIRPORTS_IN_COUNTRY = gql`
  query ($pk: ID!) {
    airports(filters: { country: { pk: $pk } }) {
      name
      iataCode
      state
      gpsCode
      point
      url
      ourAirportsId
      wikipediaUrl
      airportType
      country
      localCode
    }
  }
`;

export const GET_AIRPORTS_IN_STATE = gql`
  query ($pk: ID!) {
    airports(filters: { state: { pk: $pk } }) {
      name
      iataCode
      state
      gpsCode
      point
      url
      ourAirportsId
      wikipediaUrl
      airportType
      country
      localCode
    }
  }
`;
