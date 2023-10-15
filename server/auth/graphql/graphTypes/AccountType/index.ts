import builder from '#/graphql/builder'

export class AccountType {
  isGoogle!: boolean
  isClassic!: boolean
}

builder.objectType(AccountType, {
  name: 'AccountType',
  description: 'The type of account',
  fields: (t) => ({
    isGoogle: t.exposeBoolean('isGoogle'),
    isClassic: t.exposeBoolean('isClassic'),
  }),
})
