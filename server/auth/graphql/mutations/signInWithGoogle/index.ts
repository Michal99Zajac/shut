import builder from '#/graphql/builder'

import { OAuthCodeInput } from '../../inputs/OAuthCodeInput'
import resolveSignInWithGoogle from '../../resolvers/resolveSignInWithGoogle'

builder.mutationField('signInWithGoogle', (t) =>
  t.prismaField({
    type: 'User',
    description: 'Sign in with Google',
    args: {
      input: t.arg({ type: OAuthCodeInput, required: true }),
    },
    nullable: true,
    resolve: resolveSignInWithGoogle,
  }),
)
