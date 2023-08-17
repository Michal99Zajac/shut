import { ApolloServer } from '@apollo/server'
import { startServerAndCreateNextHandler } from '@as-integrations/next'

import schema from './schema'
import { Context, buildContext } from './context'

const server = new ApolloServer<Context>({
  schema,
})

export const handler = startServerAndCreateNextHandler(server, {
  context: buildContext,
})
