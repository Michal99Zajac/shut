import builder from '#/graphql/builder'

export const ChangePasswordInput = builder.inputType('ChangePasswordInput', {
  description: 'Input type for changing password',
  fields: (t) => ({
    oldPassword: t.string({
      description: 'Old password',
      required: true,
    }),
    newPassword: t.string({
      description: 'New password',
      required: true,
    }),
  }),
})

export default ChangePasswordInput
