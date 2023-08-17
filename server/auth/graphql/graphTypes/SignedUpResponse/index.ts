import builder from '#/graphql/builder'

import { SignedUpResponse } from '../../models/SignedUpResponse'

builder.objectType(SignedUpResponse, {
  name: 'SignedUpResponse',
  description: 'Response from a successful sign up',
  fields: (t) => ({
    id: t.exposeID('id'),
  }),
})
