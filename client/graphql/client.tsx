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

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`),
    )
  if (networkError) console.log(`[Network error]: ${networkError}`)
})

function makeClient() {
  const httpLink = new HttpLink({
    uri: `${config.client.url}/graphql`,
    fetchOptions: { cache: 'no-store' },
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
            errorLink,
            new SSRMultipartLink({
              stripDefer: true,
            }),
            httpLink,
          ])
        : from([errorLink, httpLink]),
  })
}

export function ApolloProvider({ children }: React.PropsWithChildren) {
  return <ApolloNextAppProvider makeClient={makeClient}>{children}</ApolloNextAppProvider>
}

export default ApolloProvider
