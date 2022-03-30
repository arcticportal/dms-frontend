import { gql } from "@apollo/client";

export const GET_CITIES_IN_COUNTRY = gql`
  query ($pk: ID!) {
    cities(filters: { country: { pk: $pk } }) {
      name
      point
      country
      cityType
      wikidataId
      whosonfirstId
      geonamesId
    }
  }
`;
