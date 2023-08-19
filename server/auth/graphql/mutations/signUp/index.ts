import builder from '#/graphql/builder'

import { SignUpInput } from '../../inputs/SignUpInput'
import { resolveSignUp } from '../../resolvers/resolveSignUp'

builder.mutationField('signUp', (t) =>
  t.id({
    description: 'Sign up',
    args: {
      input: t.arg({ type: SignUpInput, required: true }),
    },
    resolve: resolveSignUp,
  }),
)
