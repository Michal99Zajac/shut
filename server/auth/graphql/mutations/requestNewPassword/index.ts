import builder from '#/graphql/builder'

import { RequestNewPasswordInput } from '../../inputs/RequestNewPasswordInput'
import { resolveRequestNewPassword } from '../../resolvers/resolveRequestNewPassword'

builder.mutationField('requestNewPassword', (t) =>
  t.boolean({
    description: 'Request new password',
    args: {
      input: t.arg({ type: RequestNewPasswordInput, required: true }),
    },
    resolve: resolveRequestNewPassword,
  }),
)
