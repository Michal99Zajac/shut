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

export const updateBookmarkGroup = gql`
  mutation UpdateBookmarkGroup($updateBookmarkGroupId: ID!, $input: UpdateBookmarkGroupInput!) {
    updateBookmarkGroup(id: $updateBookmarkGroupId, input: $input) {
      id
    }
  }
`

export const deleteBookmarkGroup = gql`
  mutation DeleteBookmarkGroup($deleteBookmarkGroupId: ID!) {
    deleteBookmarkGroup(id: $deleteBookmarkGroupId)
  }
`

export const createBookmark = gql`
  mutation CreateBookmark($input: CreateBookmarkInput!) {
    createBookmark(input: $input) {
      id
    }
  }
`

export const deleteBookmark = gql`
  mutation DeleteBookmark($id: ID!) {
    deleteBookmark(id: $id)
  }
`
