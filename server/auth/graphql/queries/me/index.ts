import builder from '#/graphql/builder'

import { resolveMe } from '../../resolvers/resolveMe'

builder.queryField('me', (t) =>
  t.withAuth({ logged: true }).prismaField({
    type: 'User',
    resolve: resolveMe,
  }),
)
