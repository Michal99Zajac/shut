import builder from '#/graphql/builder'

import { AuthenticatedResponse } from '../../models/AuthenticatedResponse'

builder.objectType(AuthenticatedResponse, {
  name: 'AuthenticatedResponse',
  description: 'Response from a successful authentication',
  fields: (t) => ({
    accessToken: t.exposeString('accessToken'),
    refreshToken: t.exposeString('refreshToken'),
    user: t.prismaField({
      type: 'User',
      resolve: (_, parent) => parent.user,
    }),
  }),
})
