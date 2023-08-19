import builder from '#/graphql/builder'

export const SignInInput = builder.inputType('SignInInput', {
  description: 'Input for signing in',
  fields: (t) => ({
    email: t.string({ required: true, validate: { email: true } }),
    password: t.string({ required: true }),
  }),
})

export default SignInInput
