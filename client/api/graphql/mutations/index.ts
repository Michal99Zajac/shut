import { gql } from '@apollo/client'

export const signIn = gql`
  mutation SignIn($input: SignInInput!) {
    signIn(input: $input) {
      email
      id
    }
  }
`

export const signUp = gql`
  mutation SignUp($input: SignUpInput!) {
    signUp(input: $input)
  }
`

export const signOut = gql`
  mutation SignOut {
    signOut
  }
`

export const createBookmarkGroup = gql`
  mutation CreateBookmarkGroup($input: CreateBookmarkGroupInput!) {
    createBookmarkGroup(input: $input) {
      id
    }
  }
`
