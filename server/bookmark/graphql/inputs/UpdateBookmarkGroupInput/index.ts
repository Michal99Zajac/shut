import builder from '#/graphql/builder'

export const UpdateBookmarkGroupInput = builder.inputType('UpdateBookmarkGroupInput', {
  description: 'Input type for updating a bookmark group',
  fields: (t) => ({
    name: t.string({
      description: 'Name of the bookmark group',
      validate: {
        maxLength: 255,
      },
    }),
    description: t.string({
      description: 'Description of the bookmark group',
      validate: {
        maxLength: 255,
      },
    }),
    parentId: t.id({
      description: 'ID of the parent bookmark group',
      validate: {
        uuid: true,
      },
    }),
  }),
})

export default UpdateBookmarkGroupInput
