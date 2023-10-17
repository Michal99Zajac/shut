import { NoInfer, SuspenseQueryHookOptions } from '@apollo/client'
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr'

import {
  BookmarkDocument,
  BookmarkGroupsDocument,
  BookmarksDocument,
  GQL_BookmarkGroupsQuery,
  GQL_BookmarkGroupsQueryVariables,
  GQL_BookmarkQuery,
  GQL_BookmarkQueryVariables,
  GQL_BookmarksQuery,
  GQL_BookmarksQueryVariables,
  GQL_MeQuery,
  GQL_MeQueryVariables,
  MeDocument,
} from '@/graphql/generated'

export const useBookmarkGroupsSuspenseQuery = (
  options?: SuspenseQueryHookOptions<
    NoInfer<GQL_BookmarkGroupsQuery>,
    NoInfer<GQL_BookmarkGroupsQueryVariables>
  >,
) =>
  useSuspenseQuery<GQL_BookmarkGroupsQuery, GQL_BookmarkGroupsQueryVariables>(
    BookmarkGroupsDocument,
    options,
  )

export const useBookmarksSuspenseQuery = (
  options?: SuspenseQueryHookOptions<
    NoInfer<GQL_BookmarksQuery>,
    NoInfer<GQL_BookmarksQueryVariables>
  >,
) => useSuspenseQuery<GQL_BookmarksQuery, GQL_BookmarksQueryVariables>(BookmarksDocument, options)

export const useBookmarkSuspenseQuery = (
  options?: SuspenseQueryHookOptions<
    NoInfer<GQL_BookmarkQuery>,
    NoInfer<GQL_BookmarkQueryVariables>
  >,
) => useSuspenseQuery<GQL_BookmarkQuery, GQL_BookmarkQueryVariables>(BookmarkDocument, options)

export const useMeSuspenseQuery = (
  options?: SuspenseQueryHookOptions<NoInfer<GQL_MeQuery>, NoInfer<GQL_MeQueryVariables>>,
) => useSuspenseQuery<GQL_MeQuery, GQL_MeQueryVariables>(MeDocument, options)
