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

import { config } from '@/config'

function makeClient() {
  const httpLink = new HttpLink({
    uri: `${config.client.url}/graphql`,
    credentials: 'include',
  })

  const errorLink = onError(({ networkError, forward, operation, graphQLErrors }) => {
    if (networkError) console.log(`[Network error]: ${networkError}`)

    if (graphQLErrors) {
      return forward(operation)
    }
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
            errorLink,
            httpLink,
          ])
        : from([errorLink, httpLink]),
  })
}

export function ApolloProvider({ children }: React.PropsWithChildren) {
  return <ApolloNextAppProvider makeClient={makeClient}>{children}</ApolloNextAppProvider>
}

export default ApolloProvider
