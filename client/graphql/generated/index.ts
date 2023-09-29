import { z } from 'zod'
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

/** A bookmark */
export type GQL_Bookmark = {
  __typename?: 'Bookmark';
  bookmarkGroup: GQL_BookmarkGroup;
  description?: Maybe<Scalars['String']['output']>;
  friendlyName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  url: Scalars['String']['output'];
  user: GQL_User;
};

/** Input type for filtering bookmarks */
export type GQL_BookmarkFilterInput = {
  /** Bookmark group to filter bookmarks */
  group?: InputMaybe<GQL_BookmarkFilterInputGroupField>;
  /** Query string to filter bookmarks */
  query?: InputMaybe<Scalars['String']['input']>;
};

export type GQL_BookmarkFilterInputGroupField = {
  /** Depth of the bookmark group to filter bookmarks */
  depth?: Scalars['Int']['input'];
  /** Id of the bookmark group to filter bookmarks */
  id: Scalars['ID']['input'];
};

/** A bookmark group */
export type GQL_BookmarkGroup = {
  __typename?: 'BookmarkGroup';
  bookmarks: GQL_BookmarkGroupBookmarksConnection;
  children: GQL_BookmarkGroupChildrenConnection;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  parent?: Maybe<GQL_BookmarkGroup>;
  user: GQL_User;
};


/** A bookmark group */
export type GQL_BookmarkGroupBookmarksArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};


/** A bookmark group */
export type GQL_BookmarkGroupChildrenArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

export type GQL_BookmarkGroupBookmarksConnection = {
  __typename?: 'BookmarkGroupBookmarksConnection';
  edges: Array<Maybe<GQL_BookmarkGroupBookmarksConnectionEdge>>;
  pageInfo: GQL_PageInfo;
};

export type GQL_BookmarkGroupBookmarksConnectionEdge = {
  __typename?: 'BookmarkGroupBookmarksConnectionEdge';
  cursor: Scalars['String']['output'];
  node: GQL_Bookmark;
};

export type GQL_BookmarkGroupChildrenConnection = {
  __typename?: 'BookmarkGroupChildrenConnection';
  edges: Array<Maybe<GQL_BookmarkGroupChildrenConnectionEdge>>;
  pageInfo: GQL_PageInfo;
};

export type GQL_BookmarkGroupChildrenConnectionEdge = {
  __typename?: 'BookmarkGroupChildrenConnectionEdge';
  cursor: Scalars['String']['output'];
  node: GQL_BookmarkGroup;
};

/** Input type for filtering bookmark groups */
export type GQL_BookmarkGroupFilterInput = {
  /** Query string to filter bookmark groups */
  query?: InputMaybe<Scalars['String']['input']>;
};

/** Input type for creating a bookmark group */
export type GQL_CreateBookmarkGroupInput = {
  /** Description of the bookmark group */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Name of the bookmark group */
  name: Scalars['String']['input'];
  /** ID of the parent bookmark group */
  parentId?: InputMaybe<Scalars['ID']['input']>;
};

/** Input type for creating a bookmark */
export type GQL_CreateBookmarkInput = {
  /** ID of the bookmark group to add the bookmark to */
  bookmarkGroupId: Scalars['ID']['input'];
  /** Description of the bookmark */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Friendly name of the bookmark */
  friendlyName: Scalars['String']['input'];
  /** URL of the bookmark */
  url: Scalars['String']['input'];
};

export type GQL_Mutation = {
  __typename?: 'Mutation';
  createBookmark: GQL_Bookmark;
  /** Create bookmark group */
  createBookmarkGroup: GQL_BookmarkGroup;
  /** Delete a bookmark */
  deleteBookmark: Scalars['ID']['output'];
  /** Delete a bookmark group */
  deleteBookmarkGroup: Scalars['ID']['output'];
  /** Refresh the access token for the current user. */
  refreshAccess: GQL_User;
  /** Sign in */
  signIn: GQL_User;
  /** Sign out the current user. */
  signOut: Scalars['ID']['output'];
  /** Sign up */
  signUp: Scalars['ID']['output'];
  updateBookmark: GQL_Bookmark;
  updateBookmarkGroup: GQL_BookmarkGroup;
};


export type GQL_MutationCreateBookmarkArgs = {
  input: GQL_CreateBookmarkInput;
};


export type GQL_MutationCreateBookmarkGroupArgs = {
  input: GQL_CreateBookmarkGroupInput;
};


export type GQL_MutationDeleteBookmarkArgs = {
  id: Scalars['ID']['input'];
};


export type GQL_MutationDeleteBookmarkGroupArgs = {
  id: Scalars['ID']['input'];
};


export type GQL_MutationSignInArgs = {
  input: GQL_SignInInput;
};


export type GQL_MutationSignUpArgs = {
  input: GQL_SignUpInput;
};


export type GQL_MutationUpdateBookmarkArgs = {
  id: Scalars['ID']['input'];
  input: GQL_UpdateBookmarkInput;
};


export type GQL_MutationUpdateBookmarkGroupArgs = {
  id: Scalars['ID']['input'];
  input: GQL_UpdateBookmarkGroupInput;
};

export type GQL_PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  startCursor?: Maybe<Scalars['String']['output']>;
};

export type GQL_Query = {
  __typename?: 'Query';
  /** Get a bookmark by ID */
  bookmark: GQL_Bookmark;
  bookmarkGroup: GQL_BookmarkGroup;
  /** Get bookmark groups of the current user */
  bookmarkGroups: Array<GQL_BookmarkGroup>;
  /** Get bookmarks of the current user */
  bookmarks: GQL_QueryBookmarksConnection;
  /** Get the current user */
  me: GQL_User;
};


export type GQL_QueryBookmarkArgs = {
  id: Scalars['ID']['input'];
};


export type GQL_QueryBookmarkGroupArgs = {
  id: Scalars['ID']['input'];
};


export type GQL_QueryBookmarkGroupsArgs = {
  filter?: InputMaybe<GQL_BookmarkGroupFilterInput>;
};


export type GQL_QueryBookmarksArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<GQL_BookmarkFilterInput>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

export type GQL_QueryBookmarksConnection = {
  __typename?: 'QueryBookmarksConnection';
  edges: Array<GQL_QueryBookmarksConnectionEdge>;
  pageInfo: GQL_PageInfo;
};

export type GQL_QueryBookmarksConnectionEdge = {
  __typename?: 'QueryBookmarksConnectionEdge';
  cursor: Scalars['String']['output'];
  node: GQL_Bookmark;
};

/** Input for signing in */
export type GQL_SignInInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

/** Input for signing up */
export type GQL_SignUpInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

/** Input type for updating a bookmark group */
export type GQL_UpdateBookmarkGroupInput = {
  /** Description of the bookmark group */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Name of the bookmark group */
  name?: InputMaybe<Scalars['String']['input']>;
  /** ID of the parent bookmark group */
  parentId?: InputMaybe<Scalars['ID']['input']>;
};

/** Input type for updating a bookmark */
export type GQL_UpdateBookmarkInput = {
  /** ID of the bookmark group to add the bookmark to */
  bookmarkGroupId?: InputMaybe<Scalars['ID']['input']>;
  /** Description of the bookmark */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Friendly name of the bookmark */
  friendlyName?: InputMaybe<Scalars['String']['input']>;
  /** URL of the bookmark */
  url?: InputMaybe<Scalars['String']['input']>;
};

/** A user */
export type GQL_User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
};


export const SignInDocument = gql`
    mutation SignIn($input: SignInInput!) {
  signIn(input: $input) {
    email
    id
  }
}
    `;
export type GQL_SignInMutationFn = Apollo.MutationFunction<GQL_SignInMutation, GQL_SignInMutationVariables>;

/**
 * __useSignInMutation__
 *
 * To run a mutation, you first call `useSignInMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignInMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signInMutation, { data, loading, error }] = useSignInMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSignInMutation(baseOptions?: Apollo.MutationHookOptions<GQL_SignInMutation, GQL_SignInMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GQL_SignInMutation, GQL_SignInMutationVariables>(SignInDocument, options);
      }
export type SignInMutationHookResult = ReturnType<typeof useSignInMutation>;
export type SignInMutationResult = Apollo.MutationResult<GQL_SignInMutation>;
export type SignInMutationOptions = Apollo.BaseMutationOptions<GQL_SignInMutation, GQL_SignInMutationVariables>;
export const SignUpDocument = gql`
    mutation SignUp($input: SignUpInput!) {
  signUp(input: $input)
}
    `;
export type GQL_SignUpMutationFn = Apollo.MutationFunction<GQL_SignUpMutation, GQL_SignUpMutationVariables>;

/**
 * __useSignUpMutation__
 *
 * To run a mutation, you first call `useSignUpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignUpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signUpMutation, { data, loading, error }] = useSignUpMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSignUpMutation(baseOptions?: Apollo.MutationHookOptions<GQL_SignUpMutation, GQL_SignUpMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GQL_SignUpMutation, GQL_SignUpMutationVariables>(SignUpDocument, options);
      }
export type SignUpMutationHookResult = ReturnType<typeof useSignUpMutation>;
export type SignUpMutationResult = Apollo.MutationResult<GQL_SignUpMutation>;
export type SignUpMutationOptions = Apollo.BaseMutationOptions<GQL_SignUpMutation, GQL_SignUpMutationVariables>;
export const SignOutDocument = gql`
    mutation SignOut {
  signOut
}
    `;
export type GQL_SignOutMutationFn = Apollo.MutationFunction<GQL_SignOutMutation, GQL_SignOutMutationVariables>;

/**
 * __useSignOutMutation__
 *
 * To run a mutation, you first call `useSignOutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignOutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signOutMutation, { data, loading, error }] = useSignOutMutation({
 *   variables: {
 *   },
 * });
 */
export function useSignOutMutation(baseOptions?: Apollo.MutationHookOptions<GQL_SignOutMutation, GQL_SignOutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GQL_SignOutMutation, GQL_SignOutMutationVariables>(SignOutDocument, options);
      }
export type SignOutMutationHookResult = ReturnType<typeof useSignOutMutation>;
export type SignOutMutationResult = Apollo.MutationResult<GQL_SignOutMutation>;
export type SignOutMutationOptions = Apollo.BaseMutationOptions<GQL_SignOutMutation, GQL_SignOutMutationVariables>;
export const CreateBookmarkGroupDocument = gql`
    mutation CreateBookmarkGroup($input: CreateBookmarkGroupInput!) {
  createBookmarkGroup(input: $input) {
    id
  }
}
    `;
export type GQL_CreateBookmarkGroupMutationFn = Apollo.MutationFunction<GQL_CreateBookmarkGroupMutation, GQL_CreateBookmarkGroupMutationVariables>;

/**
 * __useCreateBookmarkGroupMutation__
 *
 * To run a mutation, you first call `useCreateBookmarkGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBookmarkGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBookmarkGroupMutation, { data, loading, error }] = useCreateBookmarkGroupMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateBookmarkGroupMutation(baseOptions?: Apollo.MutationHookOptions<GQL_CreateBookmarkGroupMutation, GQL_CreateBookmarkGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GQL_CreateBookmarkGroupMutation, GQL_CreateBookmarkGroupMutationVariables>(CreateBookmarkGroupDocument, options);
      }
export type CreateBookmarkGroupMutationHookResult = ReturnType<typeof useCreateBookmarkGroupMutation>;
export type CreateBookmarkGroupMutationResult = Apollo.MutationResult<GQL_CreateBookmarkGroupMutation>;
export type CreateBookmarkGroupMutationOptions = Apollo.BaseMutationOptions<GQL_CreateBookmarkGroupMutation, GQL_CreateBookmarkGroupMutationVariables>;
export const UpdateBookmarkGroupDocument = gql`
    mutation UpdateBookmarkGroup($updateBookmarkGroupId: ID!, $input: UpdateBookmarkGroupInput!) {
  updateBookmarkGroup(id: $updateBookmarkGroupId, input: $input) {
    id
  }
}
    `;
export type GQL_UpdateBookmarkGroupMutationFn = Apollo.MutationFunction<GQL_UpdateBookmarkGroupMutation, GQL_UpdateBookmarkGroupMutationVariables>;

/**
 * __useUpdateBookmarkGroupMutation__
 *
 * To run a mutation, you first call `useUpdateBookmarkGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateBookmarkGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateBookmarkGroupMutation, { data, loading, error }] = useUpdateBookmarkGroupMutation({
 *   variables: {
 *      updateBookmarkGroupId: // value for 'updateBookmarkGroupId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateBookmarkGroupMutation(baseOptions?: Apollo.MutationHookOptions<GQL_UpdateBookmarkGroupMutation, GQL_UpdateBookmarkGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GQL_UpdateBookmarkGroupMutation, GQL_UpdateBookmarkGroupMutationVariables>(UpdateBookmarkGroupDocument, options);
      }
export type UpdateBookmarkGroupMutationHookResult = ReturnType<typeof useUpdateBookmarkGroupMutation>;
export type UpdateBookmarkGroupMutationResult = Apollo.MutationResult<GQL_UpdateBookmarkGroupMutation>;
export type UpdateBookmarkGroupMutationOptions = Apollo.BaseMutationOptions<GQL_UpdateBookmarkGroupMutation, GQL_UpdateBookmarkGroupMutationVariables>;
export const DeleteBookmarkGroupDocument = gql`
    mutation DeleteBookmarkGroup($deleteBookmarkGroupId: ID!) {
  deleteBookmarkGroup(id: $deleteBookmarkGroupId)
}
    `;
export type GQL_DeleteBookmarkGroupMutationFn = Apollo.MutationFunction<GQL_DeleteBookmarkGroupMutation, GQL_DeleteBookmarkGroupMutationVariables>;

/**
 * __useDeleteBookmarkGroupMutation__
 *
 * To run a mutation, you first call `useDeleteBookmarkGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteBookmarkGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteBookmarkGroupMutation, { data, loading, error }] = useDeleteBookmarkGroupMutation({
 *   variables: {
 *      deleteBookmarkGroupId: // value for 'deleteBookmarkGroupId'
 *   },
 * });
 */
export function useDeleteBookmarkGroupMutation(baseOptions?: Apollo.MutationHookOptions<GQL_DeleteBookmarkGroupMutation, GQL_DeleteBookmarkGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GQL_DeleteBookmarkGroupMutation, GQL_DeleteBookmarkGroupMutationVariables>(DeleteBookmarkGroupDocument, options);
      }
export type DeleteBookmarkGroupMutationHookResult = ReturnType<typeof useDeleteBookmarkGroupMutation>;
export type DeleteBookmarkGroupMutationResult = Apollo.MutationResult<GQL_DeleteBookmarkGroupMutation>;
export type DeleteBookmarkGroupMutationOptions = Apollo.BaseMutationOptions<GQL_DeleteBookmarkGroupMutation, GQL_DeleteBookmarkGroupMutationVariables>;
export const CreateBookmarkDocument = gql`
    mutation CreateBookmark($input: CreateBookmarkInput!) {
  createBookmark(input: $input) {
    id
  }
}
    `;
export type GQL_CreateBookmarkMutationFn = Apollo.MutationFunction<GQL_CreateBookmarkMutation, GQL_CreateBookmarkMutationVariables>;

/**
 * __useCreateBookmarkMutation__
 *
 * To run a mutation, you first call `useCreateBookmarkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBookmarkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBookmarkMutation, { data, loading, error }] = useCreateBookmarkMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateBookmarkMutation(baseOptions?: Apollo.MutationHookOptions<GQL_CreateBookmarkMutation, GQL_CreateBookmarkMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GQL_CreateBookmarkMutation, GQL_CreateBookmarkMutationVariables>(CreateBookmarkDocument, options);
      }
export type CreateBookmarkMutationHookResult = ReturnType<typeof useCreateBookmarkMutation>;
export type CreateBookmarkMutationResult = Apollo.MutationResult<GQL_CreateBookmarkMutation>;
export type CreateBookmarkMutationOptions = Apollo.BaseMutationOptions<GQL_CreateBookmarkMutation, GQL_CreateBookmarkMutationVariables>;
export const DeleteBookmarkDocument = gql`
    mutation DeleteBookmark($id: ID!) {
  deleteBookmark(id: $id)
}
    `;
export type GQL_DeleteBookmarkMutationFn = Apollo.MutationFunction<GQL_DeleteBookmarkMutation, GQL_DeleteBookmarkMutationVariables>;

/**
 * __useDeleteBookmarkMutation__
 *
 * To run a mutation, you first call `useDeleteBookmarkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteBookmarkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteBookmarkMutation, { data, loading, error }] = useDeleteBookmarkMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteBookmarkMutation(baseOptions?: Apollo.MutationHookOptions<GQL_DeleteBookmarkMutation, GQL_DeleteBookmarkMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GQL_DeleteBookmarkMutation, GQL_DeleteBookmarkMutationVariables>(DeleteBookmarkDocument, options);
      }
export type DeleteBookmarkMutationHookResult = ReturnType<typeof useDeleteBookmarkMutation>;
export type DeleteBookmarkMutationResult = Apollo.MutationResult<GQL_DeleteBookmarkMutation>;
export type DeleteBookmarkMutationOptions = Apollo.BaseMutationOptions<GQL_DeleteBookmarkMutation, GQL_DeleteBookmarkMutationVariables>;
export const UpdateBookmarkDocument = gql`
    mutation UpdateBookmark($id: ID!, $input: UpdateBookmarkInput!) {
  updateBookmark(id: $id, input: $input) {
    id
  }
}
    `;
export type GQL_UpdateBookmarkMutationFn = Apollo.MutationFunction<GQL_UpdateBookmarkMutation, GQL_UpdateBookmarkMutationVariables>;

/**
 * __useUpdateBookmarkMutation__
 *
 * To run a mutation, you first call `useUpdateBookmarkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateBookmarkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateBookmarkMutation, { data, loading, error }] = useUpdateBookmarkMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateBookmarkMutation(baseOptions?: Apollo.MutationHookOptions<GQL_UpdateBookmarkMutation, GQL_UpdateBookmarkMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GQL_UpdateBookmarkMutation, GQL_UpdateBookmarkMutationVariables>(UpdateBookmarkDocument, options);
      }
export type UpdateBookmarkMutationHookResult = ReturnType<typeof useUpdateBookmarkMutation>;
export type UpdateBookmarkMutationResult = Apollo.MutationResult<GQL_UpdateBookmarkMutation>;
export type UpdateBookmarkMutationOptions = Apollo.BaseMutationOptions<GQL_UpdateBookmarkMutation, GQL_UpdateBookmarkMutationVariables>;
export const BookmarkGroupsDocument = gql`
    query BookmarkGroups($filter: BookmarkGroupFilterInput) {
  bookmarkGroups(filter: $filter) {
    id
    name
    parent {
      id
    }
  }
}
    `;

/**
 * __useBookmarkGroupsQuery__
 *
 * To run a query within a React component, call `useBookmarkGroupsQuery` and pass it any options that fit your needs.
 * When your component renders, `useBookmarkGroupsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBookmarkGroupsQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useBookmarkGroupsQuery(baseOptions?: Apollo.QueryHookOptions<GQL_BookmarkGroupsQuery, GQL_BookmarkGroupsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GQL_BookmarkGroupsQuery, GQL_BookmarkGroupsQueryVariables>(BookmarkGroupsDocument, options);
      }
export function useBookmarkGroupsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GQL_BookmarkGroupsQuery, GQL_BookmarkGroupsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GQL_BookmarkGroupsQuery, GQL_BookmarkGroupsQueryVariables>(BookmarkGroupsDocument, options);
        }
export type BookmarkGroupsQueryHookResult = ReturnType<typeof useBookmarkGroupsQuery>;
export type BookmarkGroupsLazyQueryHookResult = ReturnType<typeof useBookmarkGroupsLazyQuery>;
export type BookmarkGroupsQueryResult = Apollo.QueryResult<GQL_BookmarkGroupsQuery, GQL_BookmarkGroupsQueryVariables>;
export const BookmarksDocument = gql`
    query Bookmarks($after: String, $before: String, $first: Int, $last: Int, $filter: BookmarkFilterInput) {
  bookmarks(
    after: $after
    before: $before
    first: $first
    last: $last
    filter: $filter
  ) {
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
    `;

/**
 * __useBookmarksQuery__
 *
 * To run a query within a React component, call `useBookmarksQuery` and pass it any options that fit your needs.
 * When your component renders, `useBookmarksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBookmarksQuery({
 *   variables: {
 *      after: // value for 'after'
 *      before: // value for 'before'
 *      first: // value for 'first'
 *      last: // value for 'last'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useBookmarksQuery(baseOptions?: Apollo.QueryHookOptions<GQL_BookmarksQuery, GQL_BookmarksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GQL_BookmarksQuery, GQL_BookmarksQueryVariables>(BookmarksDocument, options);
      }
export function useBookmarksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GQL_BookmarksQuery, GQL_BookmarksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GQL_BookmarksQuery, GQL_BookmarksQueryVariables>(BookmarksDocument, options);
        }
export type BookmarksQueryHookResult = ReturnType<typeof useBookmarksQuery>;
export type BookmarksLazyQueryHookResult = ReturnType<typeof useBookmarksLazyQuery>;
export type BookmarksQueryResult = Apollo.QueryResult<GQL_BookmarksQuery, GQL_BookmarksQueryVariables>;
export const BookmarkDocument = gql`
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
    `;

/**
 * __useBookmarkQuery__
 *
 * To run a query within a React component, call `useBookmarkQuery` and pass it any options that fit your needs.
 * When your component renders, `useBookmarkQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBookmarkQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useBookmarkQuery(baseOptions: Apollo.QueryHookOptions<GQL_BookmarkQuery, GQL_BookmarkQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GQL_BookmarkQuery, GQL_BookmarkQueryVariables>(BookmarkDocument, options);
      }
export function useBookmarkLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GQL_BookmarkQuery, GQL_BookmarkQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GQL_BookmarkQuery, GQL_BookmarkQueryVariables>(BookmarkDocument, options);
        }
export type BookmarkQueryHookResult = ReturnType<typeof useBookmarkQuery>;
export type BookmarkLazyQueryHookResult = ReturnType<typeof useBookmarkLazyQuery>;
export type BookmarkQueryResult = Apollo.QueryResult<GQL_BookmarkQuery, GQL_BookmarkQueryVariables>;
export type GQL_SignInMutationVariables = Exact<{
  input: GQL_SignInInput;
}>;


export type GQL_SignInMutation = { __typename?: 'Mutation', signIn: { __typename?: 'User', email: string, id: string } };

export type GQL_SignUpMutationVariables = Exact<{
  input: GQL_SignUpInput;
}>;


export type GQL_SignUpMutation = { __typename?: 'Mutation', signUp: string };

export type GQL_SignOutMutationVariables = Exact<{ [key: string]: never; }>;


export type GQL_SignOutMutation = { __typename?: 'Mutation', signOut: string };

export type GQL_CreateBookmarkGroupMutationVariables = Exact<{
  input: GQL_CreateBookmarkGroupInput;
}>;


export type GQL_CreateBookmarkGroupMutation = { __typename?: 'Mutation', createBookmarkGroup: { __typename?: 'BookmarkGroup', id: string } };

export type GQL_UpdateBookmarkGroupMutationVariables = Exact<{
  updateBookmarkGroupId: Scalars['ID']['input'];
  input: GQL_UpdateBookmarkGroupInput;
}>;


export type GQL_UpdateBookmarkGroupMutation = { __typename?: 'Mutation', updateBookmarkGroup: { __typename?: 'BookmarkGroup', id: string } };

export type GQL_DeleteBookmarkGroupMutationVariables = Exact<{
  deleteBookmarkGroupId: Scalars['ID']['input'];
}>;


export type GQL_DeleteBookmarkGroupMutation = { __typename?: 'Mutation', deleteBookmarkGroup: string };

export type GQL_CreateBookmarkMutationVariables = Exact<{
  input: GQL_CreateBookmarkInput;
}>;


export type GQL_CreateBookmarkMutation = { __typename?: 'Mutation', createBookmark: { __typename?: 'Bookmark', id: string } };

export type GQL_DeleteBookmarkMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GQL_DeleteBookmarkMutation = { __typename?: 'Mutation', deleteBookmark: string };

export type GQL_UpdateBookmarkMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: GQL_UpdateBookmarkInput;
}>;


export type GQL_UpdateBookmarkMutation = { __typename?: 'Mutation', updateBookmark: { __typename?: 'Bookmark', id: string } };

export type GQL_BookmarkGroupsQueryVariables = Exact<{
  filter?: InputMaybe<GQL_BookmarkGroupFilterInput>;
}>;


export type GQL_BookmarkGroupsQuery = { __typename?: 'Query', bookmarkGroups: Array<{ __typename?: 'BookmarkGroup', id: string, name: string, parent?: { __typename?: 'BookmarkGroup', id: string } | null }> };

export type GQL_BookmarksQueryVariables = Exact<{
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  filter?: InputMaybe<GQL_BookmarkFilterInput>;
}>;


export type GQL_BookmarksQuery = { __typename?: 'Query', bookmarks: { __typename?: 'QueryBookmarksConnection', edges: Array<{ __typename?: 'QueryBookmarksConnectionEdge', cursor: string, node: { __typename?: 'Bookmark', friendlyName: string, id: string, url: string } }> } };

export type GQL_BookmarkQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GQL_BookmarkQuery = { __typename?: 'Query', bookmark: { __typename?: 'Bookmark', description?: string | null, friendlyName: string, id: string, url: string, bookmarkGroup: { __typename?: 'BookmarkGroup', id: string } } };

export const namedOperations = {
  Query: {
    BookmarkGroups: 'BookmarkGroups',
    Bookmarks: 'Bookmarks',
    Bookmark: 'Bookmark'
  },
  Mutation: {
    SignIn: 'SignIn',
    SignUp: 'SignUp',
    SignOut: 'SignOut',
    CreateBookmarkGroup: 'CreateBookmarkGroup',
    UpdateBookmarkGroup: 'UpdateBookmarkGroup',
    DeleteBookmarkGroup: 'DeleteBookmarkGroup',
    CreateBookmark: 'CreateBookmark',
    DeleteBookmark: 'DeleteBookmark',
    UpdateBookmark: 'UpdateBookmark'
  }
}

type Properties<T> = Required<{
  [K in keyof T]: z.ZodType<T[K], any, T[K]>;
}>;

type definedNonNullAny = {};

export const isDefinedNonNullAny = (v: any): v is definedNonNullAny => v !== undefined && v !== null;

export const definedNonNullAnySchema = z.any().refine((v) => isDefinedNonNullAny(v));

export function GQL_BookmarkFilterInputSchema(): z.ZodObject<Properties<GQL_BookmarkFilterInput>> {
  return z.object({
    group: z.lazy(() => GQL_BookmarkFilterInputGroupFieldSchema().nullish()),
    query: z.string().nullish()
  })
}

export function GQL_BookmarkFilterInputGroupFieldSchema(): z.ZodObject<Properties<GQL_BookmarkFilterInputGroupField>> {
  return z.object({
    depth: z.number(),
    id: z.string()
  })
}

export function GQL_BookmarkGroupFilterInputSchema(): z.ZodObject<Properties<GQL_BookmarkGroupFilterInput>> {
  return z.object({
    query: z.string().nullish()
  })
}

export function GQL_CreateBookmarkGroupInputSchema(): z.ZodObject<Properties<GQL_CreateBookmarkGroupInput>> {
  return z.object({
    description: z.string().nullish(),
    name: z.string(),
    parentId: z.string().nullish()
  })
}

export function GQL_CreateBookmarkInputSchema(): z.ZodObject<Properties<GQL_CreateBookmarkInput>> {
  return z.object({
    bookmarkGroupId: z.string(),
    description: z.string().nullish(),
    friendlyName: z.string(),
    url: z.string()
  })
}

export function GQL_SignInInputSchema(): z.ZodObject<Properties<GQL_SignInInput>> {
  return z.object({
    email: z.string(),
    password: z.string()
  })
}

export function GQL_SignUpInputSchema(): z.ZodObject<Properties<GQL_SignUpInput>> {
  return z.object({
    email: z.string(),
    password: z.string()
  })
}

export function GQL_UpdateBookmarkGroupInputSchema(): z.ZodObject<Properties<GQL_UpdateBookmarkGroupInput>> {
  return z.object({
    description: z.string().nullish(),
    name: z.string().nullish(),
    parentId: z.string().nullish()
  })
}

export function GQL_UpdateBookmarkInputSchema(): z.ZodObject<Properties<GQL_UpdateBookmarkInput>> {
  return z.object({
    bookmarkGroupId: z.string().nullish(),
    description: z.string().nullish(),
    friendlyName: z.string().nullish(),
    url: z.string().nullish()
  })
}
