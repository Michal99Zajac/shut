import builder from '#/graphql/builder'

export const DeleteAccountInput = builder.inputType('DeleteAccountInput', {
  description: 'Input for deleting account',
  fields: (t) => ({
    password: t.string({ required: true, description: 'User password' }),
  }),
})

export default DeleteAccountInput
