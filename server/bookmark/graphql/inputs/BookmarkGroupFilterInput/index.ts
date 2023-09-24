import builder from '#/graphql/builder'

export const BookmarkGroupFilterInput = builder.inputType('BookmarkGroupFilterInput', {
  description: 'Input type for filtering bookmark groups',
  fields: (t) => ({
    query: t.string({
      required: false,
      description: 'Query string to filter bookmark groups',
    }),
  }),
})

export default BookmarkGroupFilterInput
