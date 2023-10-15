import builder from '#/graphql/builder'

import { AccountType } from '#/auth/graphql/graphTypes/AccountType'

import { resolveProfileUrl } from '../../resolvers/resolveProfileUrl'

builder.prismaObject('User', {
  name: 'User',
  description: 'A user',
  include: {
    googleUser: true,
  },
  fields: (t) => ({
    id: t.exposeID('id'),
    email: t.exposeString('email'),
    profileUrl: t.string({
      description: 'The user profile url',
      nullable: true,
      resolve: resolveProfileUrl,
    }),
    accountType: t.field({
      type: AccountType,
      resolve: (parent) => ({
        isGoogle: !!parent.googleUser,
        isClassic: !!parent.password,
      }),
    }),
  }),
})
