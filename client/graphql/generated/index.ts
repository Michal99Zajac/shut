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
export type ZIBookmark = {
  __typename?: 'Bookmark';
  description?: Maybe<Scalars['String']['output']>;
  friendlyName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  url: Scalars['String']['output'];
  user: ZIUser;
};

/** A bookmark group */
export type ZIBookmarkGroup = {
  __typename?: 'BookmarkGroup';
  bookmarks: ZIBookmarkGroupBookmarksConnection;
  children: ZIBookmarkGroupChildrenConnection;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  parent?: Maybe<ZIBookmarkGroup>;
  user: ZIUser;
};


/** A bookmark group */
export type ZIBookmarkGroupBookmarksArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};


/** A bookmark group */
export type ZIBookmarkGroupChildrenArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

export type ZIBookmarkGroupBookmarksConnection = {
  __typename?: 'BookmarkGroupBookmarksConnection';
  edges: Array<Maybe<ZIBookmarkGroupBookmarksConnectionEdge>>;
  pageInfo: ZIPageInfo;
};

export type ZIBookmarkGroupBookmarksConnectionEdge = {
  __typename?: 'BookmarkGroupBookmarksConnectionEdge';
  cursor: Scalars['String']['output'];
  node: ZIBookmark;
};

export type ZIBookmarkGroupChildrenConnection = {
  __typename?: 'BookmarkGroupChildrenConnection';
  edges: Array<Maybe<ZIBookmarkGroupChildrenConnectionEdge>>;
  pageInfo: ZIPageInfo;
};

export type ZIBookmarkGroupChildrenConnectionEdge = {
  __typename?: 'BookmarkGroupChildrenConnectionEdge';
  cursor: Scalars['String']['output'];
  node: ZIBookmarkGroup;
};

/** Input type for creating a bookmark group */
export type ZICreateBookmarkGroupInput = {
  /** Description of the bookmark group */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Name of the bookmark group */
  name: Scalars['String']['input'];
  /** ID of the parent bookmark group */
  parentId?: InputMaybe<Scalars['ID']['input']>;
};

/** Input type for creating a bookmark */
export type ZICreateBookmarkInput = {
  /** ID of the bookmark group to add the bookmark to */
  bookmarkGroupId: Scalars['ID']['input'];
  /** Description of the bookmark */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Friendly name of the bookmark */
  friendlyName: Scalars['String']['input'];
  /** URL of the bookmark */
  url: Scalars['String']['input'];
};

export type ZIMutation = {
  __typename?: 'Mutation';
  createBookmark: ZIBookmark;
  /** Create bookmark group */
  createBookmarkGroup: ZIBookmarkGroup;
  /** Delete a bookmark */
  deleteBookmark: Scalars['ID']['output'];
  /** Delete a bookmark group */
  deleteBookmarkGroup: Scalars['ID']['output'];
  /** Refresh the access token for the current user. */
  refreshAccess: ZIUser;
  /** Sign in */
  signIn: ZIUser;
  /** Sign out the current user. */
  signOut: Scalars['ID']['output'];
  /** Sign up */
  signUp: Scalars['ID']['output'];
  updateBookmark: ZIBookmark;
  updateBookmarkGroup: ZIBookmarkGroup;
};


export type ZIMutationCreateBookmarkArgs = {
  input: ZICreateBookmarkInput;
};


export type ZIMutationCreateBookmarkGroupArgs = {
  input: ZICreateBookmarkGroupInput;
};


export type ZIMutationDeleteBookmarkArgs = {
  id: Scalars['ID']['input'];
};


export type ZIMutationDeleteBookmarkGroupArgs = {
  id: Scalars['ID']['input'];
};


export type ZIMutationSignInArgs = {
  input: ZISignInInput;
};


export type ZIMutationSignUpArgs = {
  input: ZISignUpInput;
};


export type ZIMutationUpdateBookmarkArgs = {
  id: Scalars['ID']['input'];
  input: ZIUpdateBookmarkInput;
};


export type ZIMutationUpdateBookmarkGroupArgs = {
  id: Scalars['ID']['input'];
  input: ZIUpdateBookmarkGroupInput;
};

export type ZIPageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  startCursor?: Maybe<Scalars['String']['output']>;
};

export type ZIQuery = {
  __typename?: 'Query';
  /** Get a bookmark by ID */
  bookmark: ZIBookmark;
  bookmarkGroup: ZIBookmarkGroup;
  /** Get bookmark groups of the current user */
  bookmarkGroups: ZIQueryBookmarkGroupsConnection;
  /** Get bookmarks of the current user */
  bookmarks: ZIQueryBookmarksConnection;
  /** Get the current user */
  me: ZIUser;
};


export type ZIQueryBookmarkArgs = {
  id: Scalars['ID']['input'];
};


export type ZIQueryBookmarkGroupArgs = {
  id: Scalars['ID']['input'];
};


export type ZIQueryBookmarkGroupsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};


export type ZIQueryBookmarksArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

export type ZIQueryBookmarkGroupsConnection = {
  __typename?: 'QueryBookmarkGroupsConnection';
  edges: Array<ZIQueryBookmarkGroupsConnectionEdge>;
  pageInfo: ZIPageInfo;
};

export type ZIQueryBookmarkGroupsConnectionEdge = {
  __typename?: 'QueryBookmarkGroupsConnectionEdge';
  cursor: Scalars['String']['output'];
  node: ZIBookmarkGroup;
};

export type ZIQueryBookmarksConnection = {
  __typename?: 'QueryBookmarksConnection';
  edges: Array<Maybe<ZIQueryBookmarksConnectionEdge>>;
  pageInfo: ZIPageInfo;
};

export type ZIQueryBookmarksConnectionEdge = {
  __typename?: 'QueryBookmarksConnectionEdge';
  cursor: Scalars['String']['output'];
  node: ZIBookmark;
};

/** Input for signing in */
export type ZISignInInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

/** Input for signing up */
export type ZISignUpInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

/** Input type for updating a bookmark group */
export type ZIUpdateBookmarkGroupInput = {
  /** Description of the bookmark group */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Name of the bookmark group */
  name?: InputMaybe<Scalars['String']['input']>;
  /** ID of the parent bookmark group */
  parentId?: InputMaybe<Scalars['ID']['input']>;
};

/** Input type for updating a bookmark */
export type ZIUpdateBookmarkInput = {
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
export type ZIUser = {
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
export type ZISignInMutationFn = Apollo.MutationFunction<ZISignInMutation, ZISignInMutationVariables>;

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
export function useSignInMutation(baseOptions?: Apollo.MutationHookOptions<ZISignInMutation, ZISignInMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ZISignInMutation, ZISignInMutationVariables>(SignInDocument, options);
      }
export type SignInMutationHookResult = ReturnType<typeof useSignInMutation>;
export type SignInMutationResult = Apollo.MutationResult<ZISignInMutation>;
export type SignInMutationOptions = Apollo.BaseMutationOptions<ZISignInMutation, ZISignInMutationVariables>;
export const SignUpDocument = gql`
    mutation SignUp($input: SignUpInput!) {
  signUp(input: $input)
}
    `;
export type ZISignUpMutationFn = Apollo.MutationFunction<ZISignUpMutation, ZISignUpMutationVariables>;

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
export function useSignUpMutation(baseOptions?: Apollo.MutationHookOptions<ZISignUpMutation, ZISignUpMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ZISignUpMutation, ZISignUpMutationVariables>(SignUpDocument, options);
      }
export type SignUpMutationHookResult = ReturnType<typeof useSignUpMutation>;
export type SignUpMutationResult = Apollo.MutationResult<ZISignUpMutation>;
export type SignUpMutationOptions = Apollo.BaseMutationOptions<ZISignUpMutation, ZISignUpMutationVariables>;
export const SignOutDocument = gql`
    mutation SignOut {
  signOut
}
    `;
export type ZISignOutMutationFn = Apollo.MutationFunction<ZISignOutMutation, ZISignOutMutationVariables>;

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
export function useSignOutMutation(baseOptions?: Apollo.MutationHookOptions<ZISignOutMutation, ZISignOutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ZISignOutMutation, ZISignOutMutationVariables>(SignOutDocument, options);
      }
export type SignOutMutationHookResult = ReturnType<typeof useSignOutMutation>;
export type SignOutMutationResult = Apollo.MutationResult<ZISignOutMutation>;
export type SignOutMutationOptions = Apollo.BaseMutationOptions<ZISignOutMutation, ZISignOutMutationVariables>;
export const CreateBookmarkGroupDocument = gql`
    mutation CreateBookmarkGroup($input: CreateBookmarkGroupInput!) {
  createBookmarkGroup(input: $input) {
    id
  }
}
    `;
export type ZICreateBookmarkGroupMutationFn = Apollo.MutationFunction<ZICreateBookmarkGroupMutation, ZICreateBookmarkGroupMutationVariables>;

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
export function useCreateBookmarkGroupMutation(baseOptions?: Apollo.MutationHookOptions<ZICreateBookmarkGroupMutation, ZICreateBookmarkGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ZICreateBookmarkGroupMutation, ZICreateBookmarkGroupMutationVariables>(CreateBookmarkGroupDocument, options);
      }
export type CreateBookmarkGroupMutationHookResult = ReturnType<typeof useCreateBookmarkGroupMutation>;
export type CreateBookmarkGroupMutationResult = Apollo.MutationResult<ZICreateBookmarkGroupMutation>;
export type CreateBookmarkGroupMutationOptions = Apollo.BaseMutationOptions<ZICreateBookmarkGroupMutation, ZICreateBookmarkGroupMutationVariables>;
export const BookmarkGroupsDocument = gql`
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
 *      after: // value for 'after'
 *      before: // value for 'before'
 *      first: // value for 'first'
 *      last: // value for 'last'
 *   },
 * });
 */
export function useBookmarkGroupsQuery(baseOptions?: Apollo.QueryHookOptions<ZIBookmarkGroupsQuery, ZIBookmarkGroupsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ZIBookmarkGroupsQuery, ZIBookmarkGroupsQueryVariables>(BookmarkGroupsDocument, options);
      }
export function useBookmarkGroupsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ZIBookmarkGroupsQuery, ZIBookmarkGroupsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ZIBookmarkGroupsQuery, ZIBookmarkGroupsQueryVariables>(BookmarkGroupsDocument, options);
        }
export type BookmarkGroupsQueryHookResult = ReturnType<typeof useBookmarkGroupsQuery>;
export type BookmarkGroupsLazyQueryHookResult = ReturnType<typeof useBookmarkGroupsLazyQuery>;
export type BookmarkGroupsQueryResult = Apollo.QueryResult<ZIBookmarkGroupsQuery, ZIBookmarkGroupsQueryVariables>;
export type ZISignInMutationVariables = Exact<{
  input: ZISignInInput;
}>;


export type ZISignInMutation = { __typename?: 'Mutation', signIn: { __typename?: 'User', email: string, id: string } };

export type ZISignUpMutationVariables = Exact<{
  input: ZISignUpInput;
}>;


export type ZISignUpMutation = { __typename?: 'Mutation', signUp: string };

export type ZISignOutMutationVariables = Exact<{ [key: string]: never; }>;


export type ZISignOutMutation = { __typename?: 'Mutation', signOut: string };

export type ZICreateBookmarkGroupMutationVariables = Exact<{
  input: ZICreateBookmarkGroupInput;
}>;


export type ZICreateBookmarkGroupMutation = { __typename?: 'Mutation', createBookmarkGroup: { __typename?: 'BookmarkGroup', id: string } };

export type ZIBookmarkGroupsQueryVariables = Exact<{
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
}>;


export type ZIBookmarkGroupsQuery = { __typename?: 'Query', bookmarkGroups: { __typename?: 'QueryBookmarkGroupsConnection', edges: Array<{ __typename?: 'QueryBookmarkGroupsConnectionEdge', cursor: string, node: { __typename?: 'BookmarkGroup', id: string, name: string, parent?: { __typename?: 'BookmarkGroup', id: string } | null } }>, pageInfo: { __typename?: 'PageInfo', endCursor?: string | null, hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null } } };

export const namedOperations = {
  Query: {
    BookmarkGroups: 'BookmarkGroups'
  },
  Mutation: {
    SignIn: 'SignIn',
    SignUp: 'SignUp',
    SignOut: 'SignOut',
    CreateBookmarkGroup: 'CreateBookmarkGroup'
  }
}

type Properties<T> = Required<{
  [K in keyof T]: z.ZodType<T[K], any, T[K]>;
}>;

type definedNonNullAny = {};

export const isDefinedNonNullAny = (v: any): v is definedNonNullAny => v !== undefined && v !== null;

export const definedNonNullAnySchema = z.any().refine((v) => isDefinedNonNullAny(v));

export function ZICreateBookmarkGroupInputSchema(): z.ZodObject<Properties<ZICreateBookmarkGroupInput>> {
  return z.object({
    description: z.string().nullish(),
    name: z.string(),
    parentId: z.string().nullish()
  })
}

export function ZICreateBookmarkInputSchema(): z.ZodObject<Properties<ZICreateBookmarkInput>> {
  return z.object({
    bookmarkGroupId: z.string(),
    description: z.string().nullish(),
    friendlyName: z.string(),
    url: z.string()
  })
}

export function ZISignInInputSchema(): z.ZodObject<Properties<ZISignInInput>> {
  return z.object({
    email: z.string(),
    password: z.string()
  })
}

export function ZISignUpInputSchema(): z.ZodObject<Properties<ZISignUpInput>> {
  return z.object({
    email: z.string(),
    password: z.string()
  })
}

export function ZIUpdateBookmarkGroupInputSchema(): z.ZodObject<Properties<ZIUpdateBookmarkGroupInput>> {
  return z.object({
    description: z.string().nullish(),
    name: z.string().nullish(),
    parentId: z.string().nullish()
  })
}

export function ZIUpdateBookmarkInputSchema(): z.ZodObject<Properties<ZIUpdateBookmarkInput>> {
  return z.object({
    bookmarkGroupId: z.string().nullish(),
    description: z.string().nullish(),
    friendlyName: z.string().nullish(),
    url: z.string().nullish()
  })
}
