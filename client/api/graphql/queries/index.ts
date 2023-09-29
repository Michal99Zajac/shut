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

export const bookmarks = gql`
  query Bookmarks(
    $after: String
    $before: String
    $first: Int
    $last: Int
    $filter: BookmarkFilterInput
  ) {
    bookmarks(after: $after, before: $before, first: $first, last: $last, filter: $filter) {
      edges {
        cursor
        node {
          friendlyName
          id
          url
        }
      }
    }
  }
`

export const bookmark = gql`
  query Bookmark($id: ID!) {
    bookmark(id: $id) {
      description
      friendlyName
      id
      url
      bookmarkGroup {
        id
      }
    }
  }
`
