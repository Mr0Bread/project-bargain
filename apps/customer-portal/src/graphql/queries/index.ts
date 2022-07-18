import { gql } from "@apollo/client";

export const isSignedInQuery = gql`
  query {
    isSignedIn
  }
`
