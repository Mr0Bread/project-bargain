import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client'

const httpLink = createHttpLink({
  uri: process.env.GRAPHQL_ENDPOINT || process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
  credentials: 'include',
})

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: httpLink,
})

export default client
