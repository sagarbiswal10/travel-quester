import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// Get the server URL based on environment
const getServerUrl = () => {
  if (import.meta.env.DEV) {
    return 'http://localhost:5000/graphql';
  }
  // In production, use the deployed server URL
  return 'https://travel-quester-server.onrender.com/graphql'; // Update this with your actual deployed server URL
};

const httpLink = createHttpLink({
  uri: getServerUrl(),
  credentials: 'include'
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'network-only',
    },
    query: {
      fetchPolicy: 'network-only',
    },
  },
});