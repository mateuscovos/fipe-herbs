const { gql } = require('apollo-server-express')
const types = require('./types')
const queries = require('./queries')

const graphQLDef = [].concat(types, queries)

/* Type Defs (Schemas) */
const typeDefs = graphQLDef.map(i => gql(i[0]))

/* Resolvers */
const resolvers = graphQLDef.map(i => i[1]).filter(i => i !== undefined)

module.exports = [typeDefs, resolvers]