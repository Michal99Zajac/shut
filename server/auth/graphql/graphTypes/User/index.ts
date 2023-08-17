import builder from '#/graphql/builder'

builder.prismaObject('User', {
  name: 'User',
  description: 'A user',
  fields: (t) => ({
    id: t.exposeID('id'),
    email: t.exposeString('email'),
  }),
})
