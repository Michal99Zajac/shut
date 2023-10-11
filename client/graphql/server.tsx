import { HttpLink } from '@apollo/client'
import {
  NextSSRInMemoryCache,
  NextSSRApolloClient,
} from '@apollo/experimental-nextjs-app-support/ssr'
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support/rsc'

import { config } from '@/config'

export const { getClient } = registerApolloClient(() => {
  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    link: new HttpLink({
      uri: `${config.client.url}/graphql`,
    }),
  })
})

export default getClient
