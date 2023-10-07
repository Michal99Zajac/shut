import builder from '#/graphql/builder'

export const OAuthCodeInput = builder.inputType('OAuthCodeInput', {
  description: 'Input for OAuth code',
  fields: (t) => ({
    code: t.string({ required: true, description: 'OAuth code' }),
  }),
})

export default OAuthCodeInput
