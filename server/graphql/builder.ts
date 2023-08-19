import SchemaBuilder from '@pothos/core'
import ScopeAuthPlugin from '@pothos/plugin-scope-auth'
import type PrismaTypes from '@pothos/plugin-prisma/generated'
import PrismaPlugin from '@pothos/plugin-prisma'
import ValidationPlugin from '@pothos/plugin-validation'
import RelayPlugin from '@pothos/plugin-relay'

import { prisma } from '#/db'

import { Context, AuthContext } from './context'

interface SchemaTypes {
  Context: Context
  AuthScopes: {
    logged: boolean
  }
  AuthContexts: {
    logged: AuthContext
  }
  PrismaTypes: PrismaTypes
}

const builder = new SchemaBuilder<SchemaTypes>({
  plugins: [ScopeAuthPlugin, PrismaPlugin, ValidationPlugin, RelayPlugin],
  authScopes: (context) => ({
    logged: !!context.user,
  }),
  prisma: {
    client: prisma,
  },
  validationOptions: {
    validationError: (error, args, context, info) => {
      return error
    },
  },
  relayOptions: {
    clientMutationId: 'optional',
    cursorType: 'ID',
  },
})

// Init builder query and mutation types
builder.mutationType({})
builder.queryType({})

export default builder
