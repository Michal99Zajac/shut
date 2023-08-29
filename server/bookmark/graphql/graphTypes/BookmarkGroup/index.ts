import builder from '#/graphql/builder'

builder.prismaObject('BookmarkGroup', {
  name: 'BookmarkGroup',
  description: 'A bookmark group',
  fields: (t) => ({
    id: t.exposeID('id'),
    name: t.exposeString('name'),
    description: t.exposeString('description', { nullable: true }),
    bookmarks: t.relatedConnection('bookmarks', {
      cursor: 'id',
    }),
    children: t.relatedConnection('children', {
      cursor: 'id',
    }),
    parent: t.relation('parent', { nullable: true }),
    user: t.relation('user'),
  }),
})
