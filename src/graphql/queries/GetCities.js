import { gql } from '@apollo/client'

export const GET_CITIES_IN_COUNTRY = gql`
query ($pk: ID!){
    airports(filters: {country: {pk: $pk}}) {
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
`

export const GET_CITIES_IN_STATE = gql`
query ($pk: ID!){
    airports(filters: {state: {pk: $pk}}) {
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
`