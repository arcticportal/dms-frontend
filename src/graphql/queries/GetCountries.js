import { gql } from '@apollo/client'

export const GET_COUNTRIES_BY_NAME = gql`
query ($name: String!){
  countries(filters: {name: {iContains: $name}}) {
    name
    id
    geometry
  }
}
`


export const GET_COUNTRIES_ID_BY_NAME = gql`
query ($name: String!){
  countries(filters: {name: {iContains: $name}}) {
    name
    id
  }
}
`

export const GET_STATES_ID_BY_NAME = gql`
query ($name: String!){
  states(filters: {name: {iContains: $name}}) {
    name
    id
  }
}
`