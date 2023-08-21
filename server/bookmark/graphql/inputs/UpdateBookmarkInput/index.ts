import builder from '#/graphql/builder'

export const UpdateBookmarkInput = builder.inputType('UpdateBookmarkInput', {
  description: 'Input type for updating a bookmark',
  fields: (t) => ({
    url: t.string({
      description: 'URL of the bookmark',
      validate: {
        url: true,
      },
    }),
    friendlyName: t.string({
      description: 'Friendly name of the bookmark',
      validate: {
        maxLength: 255,
      },
    }),
    description: t.string({
      description: 'Description of the bookmark',
      validate: {
        maxLength: 255,
      },
    }),
    bookmarkGroupId: t.id({
      description: 'ID of the bookmark group to add the bookmark to',
      validate: {
        uuid: true,
      },
    }),
  }),
})

export default UpdateBookmarkInput
