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
export type Bookmark = {
  __typename?: 'Bookmark';
  description?: Maybe<Scalars['String']['output']>;
  friendlyName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  url: Scalars['String']['output'];
  user: User;
};

/** A bookmark group */
export type BookmarkGroup = {
  __typename?: 'BookmarkGroup';
  bookmarks: BookmarkGroupBookmarksConnection;
  children: BookmarkGroupChildrenConnection;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  parent?: Maybe<BookmarkGroup>;
  user: User;
};


/** A bookmark group */
export type BookmarkGroupBookmarksArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};


/** A bookmark group */
export type BookmarkGroupChildrenArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

export type BookmarkGroupBookmarksConnection = {
  __typename?: 'BookmarkGroupBookmarksConnection';
  edges: Array<Maybe<BookmarkGroupBookmarksConnectionEdge>>;
  pageInfo: PageInfo;
};

export type BookmarkGroupBookmarksConnectionEdge = {
  __typename?: 'BookmarkGroupBookmarksConnectionEdge';
  cursor: Scalars['String']['output'];
  node: Bookmark;
};

export type BookmarkGroupChildrenConnection = {
  __typename?: 'BookmarkGroupChildrenConnection';
  edges: Array<Maybe<BookmarkGroupChildrenConnectionEdge>>;
  pageInfo: PageInfo;
};

export type BookmarkGroupChildrenConnectionEdge = {
  __typename?: 'BookmarkGroupChildrenConnectionEdge';
  cursor: Scalars['String']['output'];
  node: BookmarkGroup;
};

/** Input type for creating a bookmark group */
export type CreateBookmarkGroupInput = {
  /** Description of the bookmark group */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Name of the bookmark group */
  name: Scalars['String']['input'];
  /** ID of the parent bookmark group */
  parentId?: InputMaybe<Scalars['ID']['input']>;
};

/** Input type for creating a bookmark */
export type CreateBookmarkInput = {
  /** ID of the bookmark group to add the bookmark to */
  bookmarkGroupId: Scalars['ID']['input'];
  /** Description of the bookmark */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Friendly name of the bookmark */
  friendlyName: Scalars['String']['input'];
  /** URL of the bookmark */
  url: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createBookmark: Bookmark;
  /** Create bookmark group */
  createBookmarkGroup: BookmarkGroup;
  /** Delete a bookmark */
  deleteBookmark: Scalars['ID']['output'];
  /** Delete a bookmark group */
  deleteBookmarkGroup: Scalars['ID']['output'];
  /** Refresh the access token for the current user. */
  refreshAccess: User;
  /** Sign in */
  signIn: User;
  /** Sign out the current user. */
  signOut: Scalars['ID']['output'];
  /** Sign up */
  signUp: Scalars['ID']['output'];
  updateBookmark: Bookmark;
  updateBookmarkGroup: BookmarkGroup;
};


export type MutationCreateBookmarkArgs = {
  input: CreateBookmarkInput;
};


export type MutationCreateBookmarkGroupArgs = {
  input: CreateBookmarkGroupInput;
};


export type MutationDeleteBookmarkArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteBookmarkGroupArgs = {
  id: Scalars['ID']['input'];
};


export type MutationSignInArgs = {
  input: SignInInput;
};


export type MutationSignUpArgs = {
  input: SignUpInput;
};


export type MutationUpdateBookmarkArgs = {
  id: Scalars['ID']['input'];
  input: UpdateBookmarkInput;
};


export type MutationUpdateBookmarkGroupArgs = {
  id: Scalars['ID']['input'];
  input: UpdateBookmarkGroupInput;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  startCursor?: Maybe<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  /** Get a bookmark by ID */
  bookmark: Bookmark;
  bookmarkGroup: BookmarkGroup;
  /** Get bookmark groups of the current user */
  bookmarkGroups: QueryBookmarkGroupsConnection;
  /** Get bookmarks of the current user */
  bookmarks: QueryBookmarksConnection;
  /** Get the current user */
  me: User;
};


export type QueryBookmarkArgs = {
  id: Scalars['ID']['input'];
};


export type QueryBookmarkGroupArgs = {
  id: Scalars['ID']['input'];
};


export type QueryBookmarkGroupsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryBookmarksArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

export type QueryBookmarkGroupsConnection = {
  __typename?: 'QueryBookmarkGroupsConnection';
  edges: Array<Maybe<QueryBookmarkGroupsConnectionEdge>>;
  pageInfo: PageInfo;
};

export type QueryBookmarkGroupsConnectionEdge = {
  __typename?: 'QueryBookmarkGroupsConnectionEdge';
  cursor: Scalars['String']['output'];
  node: BookmarkGroup;
};

export type QueryBookmarksConnection = {
  __typename?: 'QueryBookmarksConnection';
  edges: Array<Maybe<QueryBookmarksConnectionEdge>>;
  pageInfo: PageInfo;
};

export type QueryBookmarksConnectionEdge = {
  __typename?: 'QueryBookmarksConnectionEdge';
  cursor: Scalars['String']['output'];
  node: Bookmark;
};

/** Input for signing in */
export type SignInInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

/** Input for signing up */
export type SignUpInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

/** Input type for updating a bookmark group */
export type UpdateBookmarkGroupInput = {
  /** Description of the bookmark group */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Name of the bookmark group */
  name?: InputMaybe<Scalars['String']['input']>;
  /** ID of the parent bookmark group */
  parentId?: InputMaybe<Scalars['ID']['input']>;
};

/** Input type for updating a bookmark */
export type UpdateBookmarkInput = {
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
export type User = {
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
export type SignInMutationFn = Apollo.MutationFunction<SignInMutation, SignInMutationVariables>;

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
export function useSignInMutation(baseOptions?: Apollo.MutationHookOptions<SignInMutation, SignInMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignInMutation, SignInMutationVariables>(SignInDocument, options);
      }
export type SignInMutationHookResult = ReturnType<typeof useSignInMutation>;
export type SignInMutationResult = Apollo.MutationResult<SignInMutation>;
export type SignInMutationOptions = Apollo.BaseMutationOptions<SignInMutation, SignInMutationVariables>;
export type SignInMutationVariables = Exact<{
  input: SignInInput;
}>;


export type SignInMutation = { __typename?: 'Mutation', signIn: { __typename?: 'User', email: string, id: string } };

export const namedOperations = {
  Mutation: {
    SignIn: 'SignIn'
  }
}

type Properties<T> = Required<{
  [K in keyof T]: z.ZodType<T[K], any, T[K]>;
}>;

type definedNonNullAny = {};

export const isDefinedNonNullAny = (v: any): v is definedNonNullAny => v !== undefined && v !== null;

export const definedNonNullAnySchema = z.any().refine((v) => isDefinedNonNullAny(v));

export function CreateBookmarkGroupInputSchema(): z.ZodObject<Properties<CreateBookmarkGroupInput>> {
  return z.object({
    description: z.string().nullish(),
    name: z.string(),
    parentId: z.string().nullish()
  })
}

export function CreateBookmarkInputSchema(): z.ZodObject<Properties<CreateBookmarkInput>> {
  return z.object({
    bookmarkGroupId: z.string(),
    description: z.string().nullish(),
    friendlyName: z.string(),
    url: z.string()
  })
}

export function SignInInputSchema(): z.ZodObject<Properties<SignInInput>> {
  return z.object({
    email: z.string(),
    password: z.string()
  })
}

export function SignUpInputSchema(): z.ZodObject<Properties<SignUpInput>> {
  return z.object({
    email: z.string(),
    password: z.string()
  })
}

export function UpdateBookmarkGroupInputSchema(): z.ZodObject<Properties<UpdateBookmarkGroupInput>> {
  return z.object({
    description: z.string().nullish(),
    name: z.string().nullish(),
    parentId: z.string().nullish()
  })
}

export function UpdateBookmarkInputSchema(): z.ZodObject<Properties<UpdateBookmarkInput>> {
  return z.object({
    bookmarkGroupId: z.string().nullish(),
    description: z.string().nullish(),
    friendlyName: z.string().nullish(),
    url: z.string().nullish()
  })
}
