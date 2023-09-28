import builder from '#/graphql/builder'

export const BookmarkFilterInputGroupField = builder.inputType('BookmarkFilterInputGroupField', {
  fields: (t) => ({
    id: t.id({
      required: true,
      description: 'Id of the bookmark group to filter bookmarks',
      validate: {
        uuid: true,
      },
    }),
    depth: t.int({
      required: true,
      description: 'Depth of the bookmark group to filter bookmarks',
      defaultValue: 0,
      validate: {
        min: 0,
        max: 10,
      },
    }),
  }),
})

export const BookmarkFilterInput = builder.inputType('BookmarkFilterInput', {
  description: 'Input type for filtering bookmarks',
  fields: (t) => ({
    query: t.string({
      required: false,
      description: 'Query string to filter bookmarks',
    }),
    group: t.field({
      type: BookmarkFilterInputGroupField,
      required: false,
      description: 'Bookmark group to filter bookmarks',
    }),
  }),
})

export default BookmarkFilterInput
