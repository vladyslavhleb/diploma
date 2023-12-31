import { persistCache } from 'apollo3-cache-persist';

import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';

import { setContext } from '@apollo/client/link/context';

const cache = new InMemoryCache();

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_GRAPHQL_HOST,
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('access_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

persistCache({
  cache,
  storage: window.localStorage, // You can use sessionStorage or a custom storage provider as well
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
});

export default client;
