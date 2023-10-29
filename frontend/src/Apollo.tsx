import { persistCache } from 'apollo3-cache-persist';

import { ApolloClient, InMemoryCache } from '@apollo/client';

const cache = new InMemoryCache();

persistCache({
  cache,
  storage: window.localStorage, // You can use sessionStorage or a custom storage provider as well
});

const client = new ApolloClient({
  uri: 'http://localhost/graphql', // Replace with your GraphQL server URL
  cache,
});

export default client;
