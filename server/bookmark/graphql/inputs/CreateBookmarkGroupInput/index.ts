import builder from '#/graphql/builder'

export const CreateBookmarkGroupInput = builder.inputType('CreateBookmarkGroupInput', {
  description: 'Input type for creating a bookmark group',
  fields: (t) => ({
    name: t.string({
      description: 'Name of the bookmark group',
      required: true,
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
  }),
})

export default CreateBookmarkGroupInput
