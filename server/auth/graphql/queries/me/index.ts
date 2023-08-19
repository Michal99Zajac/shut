import builder from '#/graphql/builder'

import { resolveMe } from '../../resolvers/resolveMe'

builder.queryField('me', (t) =>
  t.withAuth({ logged: true }).prismaField({
    type: 'User',
    description: 'Get the current user',
    resolve: resolveMe,
  }),
)
