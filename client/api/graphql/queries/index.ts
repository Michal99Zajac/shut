import { gql } from '@apollo/client'

export const bookmarkGroups = gql`
  query BookmarkGroups($filter: BookmarkGroupFilterInput) {
    bookmarkGroups(filter: $filter) {
      id
      name
      parent {
        id
      }
    }
  }
`
