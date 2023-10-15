import builder from '#/graphql/builder'

import { AccountType } from '#/auth/graphql/graphTypes/AccountType'

builder.prismaObject('User', {
  name: 'User',
  description: 'A user',
  include: {
    googleUser: true,
  },
  fields: (t) => ({
    id: t.exposeID('id'),
    email: t.exposeString('email'),
    accountType: t.field({
      type: AccountType,
      resolve: (parent) => ({
        isGoogle: !!parent.googleUser,
        isClassic: !!parent.password,
      }),
    }),
  }),
})
