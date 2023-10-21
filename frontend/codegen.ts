
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  "overwrite": true,
  "schema": "http://localhost/graphql",
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
