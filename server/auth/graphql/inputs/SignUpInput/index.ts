import builder from '#/graphql/builder'

export const SignUpInput = builder.inputType('SignUpInput', {
  description: 'Input for signing up',
  fields: (t) => ({
    email: t.string({ required: true, validate: { email: true } }),
    password: t.string({ required: true, validate: { maxLength: 2048, minLength: 1 } }),
  }),
})

export default SignUpInput
