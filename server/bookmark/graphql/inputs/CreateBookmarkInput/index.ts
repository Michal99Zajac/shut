import builder from '#/graphql/builder'

export const CreateBookmarkInput = builder.inputType('CreateBookmarkInput', {
  description: 'Input type for creating a bookmark',
  fields: (t) => ({
    url: t.string({
      required: true,
      description: 'URL of the bookmark',
      validate: {
        url: true,
      },
    }),
    friendlyName: t.string({
      required: true,
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
      required: true,
      description: 'ID of the bookmark group to add the bookmark to',
      validate: {
        uuid: true,
      },
    }),
  }),
})

export default CreateBookmarkInput
