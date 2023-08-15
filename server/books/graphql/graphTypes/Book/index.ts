import builder from '#/graphql/builder'
import { Book } from '#/books/models/Book'

builder.objectType(Book, {
  name: 'Book',
  description: 'A book',
  fields: (t) => ({
    id: t.exposeID('author'),
    title: t.exposeString('title'),
  }),
})
