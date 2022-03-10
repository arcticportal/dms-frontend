import { gql } from '@apollo/client'

export const GET_COUNTRIES_BY_NAME = gql`
query ($name: String!){
  countries(filters: {name: {iContains: $name}}) {
    name
    id
  }
}
`