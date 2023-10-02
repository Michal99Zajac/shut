import builder from '#/graphql/builder'

import { ResetForgottenPasswordInput } from '../../inputs/ResetForgottenPasswordInput'
import { resolveResetForgottenPassword } from '../../resolvers/resolveResetForgottenPassword'

builder.mutationField('resetForgottenPassword', (t) =>
  t.boolean({
    description: 'Reset forgotten password',
    args: {
      input: t.arg({ type: ResetForgottenPasswordInput, required: true }),
    },
    resolve: resolveResetForgottenPassword,
  }),
)
