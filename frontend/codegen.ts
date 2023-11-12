
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  "overwrite": true,
  "schema": "http://localhost:4000/graphql",
  "generates": {
    "src/__generated__/graphql.tsx": {
      "plugins": [
        "typescript",
        "typescript-resolvers"
      ],
      "config": {
        "withHooks": true
      }
    }
  }
};

export default config;
