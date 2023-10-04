import builder from '#/graphql/builder'

import DeleteAccountInput from '../../inputs/DeleteAccountInput'
import { resolveDeleteAccount } from '../../resolvers/resolveDeleteAccount'

builder.mutationField('deleteAccount', (t) =>
  t.withAuth({ logged: true }).id({
    description: 'Delete account',
    args: {
      input: t.arg({ type: DeleteAccountInput, required: true }),
    },
    resolve: resolveDeleteAccount,
  }),
)
