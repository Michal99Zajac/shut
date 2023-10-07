import builder from '#/graphql/builder'

import OAuthCodeInput from '../../inputs/OAuthCodeInput'
import resolveDeleteAccountWithGoogle from '../../resolvers/resolveDeleteAccountWithGoogle'

builder.mutationField('deleteAccountWithGoogle', (t) =>
  t.withAuth({ googleLogged: true }).id({
    args: {
      input: t.arg({ type: OAuthCodeInput, required: true }),
    },
    resolve: resolveDeleteAccountWithGoogle,
  }),
)
