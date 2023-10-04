import builder from '#/graphql/builder'

import ChangePasswordInput from '../../inputs/ChangePasswordInput'
import resolveChangePassword from '../../resolvers/resolveChangePassword'

builder.mutationField('changePassword', (t) =>
  t.withAuth({ logged: true }).id({
    description: 'Change password',
    args: {
      input: t.arg({
        type: ChangePasswordInput,
        required: true,
      }),
    },
    resolve: resolveChangePassword,
  }),
)
