import builder from '#/graphql/builder'

import { resolveRefreshAccess } from '#/auth/graphql/resolvers/resolveRefreshAccess'

builder.mutationField('refreshAccess', (t) =>
  t.withAuth({ logged: true }).prismaField({
    type: 'User',
    resolve: resolveRefreshAccess,
  }),
)
