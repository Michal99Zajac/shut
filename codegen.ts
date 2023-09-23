import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: 'http://localhost:3000/graphql',
  documents: 'client/api/graphql/**/*.ts',
  generates: {
    'client/graphql/generated/index.ts': {
      plugins: [
        'typescript',
        'typescript-react-apollo',
        'typescript-operations',
        'named-operations-object',
        'typescript-validation-schema',
      ],
      config: {
        schema: 'zod',
        strictScalars: true,
        withHooks: true,
      },
    },
  },
}

export default config
