const { entity2type } = require('@herbsjs/herbs2gql')

const entities = [
  require('../../../domain/entities/TabelaReferencia'),
  require('../../../domain/entities/Marca'),
  require('../../../domain/entities/Modelo'),
  require('../../../domain/entities/AnoModelo'),
  require('../../../domain/entities/Combustivel'),
  require('../../../domain/entities/ValorVeiculo'),
]

const defaultSchema = [`
  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }`]

let types = [defaultSchema]
types = types.concat(entities.map(entity => [entity2type(entity)]))

/* Custom Types */
types.push(require('./custom/date'))

module.exports = types
