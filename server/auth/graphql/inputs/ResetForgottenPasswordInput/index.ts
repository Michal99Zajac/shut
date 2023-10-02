import builder from '#/graphql/builder'

export const ResetForgottenPasswordInput = builder.inputType('ResetForgottenPasswordInput', {
  description: 'Input for resetting forgotten password',
  fields: (t) => ({
    password: t.string({ required: true }),
    token: t.string({ required: true }),
  }),
})

export default ResetForgottenPasswordInput
