import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'

const httpLink = new HttpLink({ uri: `http://localhost:5001/graphql` })

export const Client = new ApolloClient({
    cache: new InMemoryCache(),
    link: httpLink
})