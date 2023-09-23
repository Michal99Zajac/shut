import { gql } from '@apollo/client'

export const bookmarkGroups = gql`
  query BookmarkGroups($after: String, $before: String, $first: Int, $last: Int) {
    bookmarkGroups(after: $after, before: $before, first: $first, last: $last) {
      edges {
        cursor
        node {
          id
          name
          parent {
            id
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
    }
  }
`
