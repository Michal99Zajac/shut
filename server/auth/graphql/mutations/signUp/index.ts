import builder from '#/graphql/builder'

import { SignUpInput } from '../../inputs/SignUpInput'
import { SignedUpResponse } from '../../models/SignedUpResponse'
import { resolveSignUp } from '../../resolvers/resolveSignUp'

builder.mutationField('signUp', (t) =>
  t.field({
    type: SignedUpResponse,
    description: 'Sign up',
    args: {
      input: t.arg({ type: SignUpInput, required: true }),
    },
    resolve: resolveSignUp,
  }),
)
