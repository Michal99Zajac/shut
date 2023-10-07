import SchemaBuilder from '@pothos/core'
import ScopeAuthPlugin from '@pothos/plugin-scope-auth'
import type PrismaTypes from '@pothos/plugin-prisma/generated'
import PrismaPlugin from '@pothos/plugin-prisma'
import ValidationPlugin from '@pothos/plugin-validation'
import RelayPlugin from '@pothos/plugin-relay'

import { prisma } from '#/db'

import { Context, AuthContext, GoogleAuthContext } from './context'

interface SchemaTypes {
  Context: Context
  AuthScopes: {
    logged: boolean
    googleLogged: boolean
  }
  AuthContexts: {
    logged: AuthContext
    googleLogged: GoogleAuthContext
  }
  PrismaTypes: PrismaTypes
}

const builder = new SchemaBuilder<SchemaTypes>({
  plugins: [ScopeAuthPlugin, PrismaPlugin, ValidationPlugin, RelayPlugin],
  authScopes: (context) => ({
    logged: !!context.user,
    googleLogged: async () => {
      if (!context.user) return false

      const isGoogleUser = await context.prisma.googleUser.findFirst({
        where: {
          user: {
            id: context.user.id,
          },
        },
      })

      return !!isGoogleUser
    },
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
    cursorType: 'String', // the string created based on the uuid id
  },
})

// Init builder query and mutation types
builder.mutationType({})
builder.queryType({})

export default builder
