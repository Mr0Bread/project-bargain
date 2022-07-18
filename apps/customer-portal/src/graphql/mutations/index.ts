import { gql } from "@apollo/client";

export const signInMutation = gql`
  mutation SignIn($email: String!, $password: String!) {
    signIn(input: { email: $email, password: $password }) {
      isSuccess
    }
  }
`
export const refreshTokenMutation = gql`
  mutation refreshAccessToken {
    refreshAccessToken
  }
`
