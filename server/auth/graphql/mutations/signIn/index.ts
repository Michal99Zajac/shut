import builder from '#/graphql/builder'

import { SignInInput } from '../../inputs/SignInInput'
import { resolveSignIn } from '../../resolvers/resolveSignIn'

builder.mutationField('signIn', (t) =>
  t.prismaField({
    type: 'User',
    description: 'Sign in',
    args: {
      input: t.arg({ type: SignInInput, required: true }),
    },
    resolve: resolveSignIn,
  }),
)
