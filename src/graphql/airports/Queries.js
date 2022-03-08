import {gql} from '@apollo/client'

export const LOAD_AIRPORTS = gql`
query {
    airports(filters: {country: {pk: 146}}) {
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