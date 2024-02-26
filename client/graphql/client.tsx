'use client'

import { ApolloLink, HttpLink, from } from '@apollo/client'
import {
  ApolloNextAppProvider,
  NextSSRInMemoryCache,
  NextSSRApolloClient,
  SSRMultipartLink,
} from '@apollo/experimental-nextjs-app-support/ssr'
import { relayStylePagination } from '@apollo/client/utilities'
import { onError } from '@apollo/client/link/error'

function makeClient() {
  const httpLink = new HttpLink({
    uri: '/graphql',
    credentials: 'include',
    fetch: (url, options) => fetch(url, options),
  })

  const errorLink = onError(({ networkError, forward, operation, graphQLErrors }) => {
    if (networkError) console.error(`[Network error]: ${networkError}`)

    if (graphQLErrors) {
      for (const err of graphQLErrors) {
        console.error(`[GraphQL error]: ${err.message}`)
      }
    }

    return forward(operation)
  })

  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            bookmarks: relayStylePagination(['filter']),
          },
        },
      },
    }),
    link:
      typeof window === 'undefined'
        ? ApolloLink.from([
            new SSRMultipartLink({
              stripDefer: true,
            }),
            httpLink,
          ])
        : from([errorLink, httpLink]),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'cache-and-network',
      },
      query: {
        fetchPolicy: 'network-only',
      },
    },
  })
}

export function ApolloProvider({ children }: React.PropsWithChildren) {
  return <ApolloNextAppProvider makeClient={makeClient}>{children}</ApolloNextAppProvider>
}

export default ApolloProvider
