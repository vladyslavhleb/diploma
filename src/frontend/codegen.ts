import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: process.env.REACT_APP_GRAPHQL_HOST,
  generates: {
    'src/__generated__/graphql.tsx': {
      plugins: ['typescript', 'typescript-resolvers'],
      config: {
        withHooks: true,
      },
    },
  },
};

export default config;
