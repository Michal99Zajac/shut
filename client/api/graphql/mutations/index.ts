import { gql } from '@apollo/client'

export const signIn = gql`
  mutation SignIn($input: SignInInput!) {
    signIn(input: $input) {
      email
      id
    }
  }
`
