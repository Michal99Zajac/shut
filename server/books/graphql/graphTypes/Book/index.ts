import builder from '@/server/graphql/builder'
import { Book } from '@/server/books/models/Book'

builder.objectType(Book, {
  name: 'Book',
  description: 'A book',
  fields: (t) => ({
    id: t.exposeID('author'),
    title: t.exposeString('title'),
  }),
})
