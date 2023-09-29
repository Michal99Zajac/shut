import builder from '#/graphql/builder'

builder.prismaObject('Bookmark', {
  name: 'Bookmark',
  description: 'A bookmark',
  fields: (t) => ({
    id: t.exposeID('id'),
    url: t.exposeString('url'),
    friendlyName: t.exposeString('friendlyName'),
    description: t.exposeString('description', { nullable: true }),
    user: t.relation('user'),
    bookmarkGroup: t.relation('bookmarkGroup'),
  }),
})
