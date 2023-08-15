import builder from '#/graphql/builder'
import { Book } from '#/books/models/Book'

const books: Book[] = [
  {
    title: 'The Awakening',
    author: 'Kate Chopin',
  },
  {
    title: 'City of Glass',
    author: 'Paul Auster',
  },
]

builder.queryField('books', (t) =>
  t.field({
    type: [Book],
    resolve: () => books,
  }),
)
