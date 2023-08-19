import builder from '#/graphql/builder'

import { resolveRefreshAccess } from '#/auth/graphql/resolvers/resolveRefreshAccess'

builder.mutationField('refreshAccess', (t) =>
  t.withAuth({ logged: true }).prismaField({
    type: 'User',
    description: 'Refresh the access token for the current user.',
    resolve: resolveRefreshAccess,
  }),
)
