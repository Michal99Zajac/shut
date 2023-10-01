import builder from '#/graphql/builder'

export const RequestNewPasswordInput = builder.inputType('RequestNewPasswordInput', {
  description: 'Input for requesting new password',
  fields: (t) => ({
    email: t.string({ required: true, validate: { email: true } }),
  }),
})

export default RequestNewPasswordInput
