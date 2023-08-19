import builder from '#/graphql/builder'

import { resolveSignOut } from '../../resolvers/resolveSignOut'

builder.mutationField('signOut', (t) =>
  t.withAuth({ logged: true }).id({
    description: 'Sign out the current user.',
    resolve: resolveSignOut,
  }),
)
