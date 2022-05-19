const { usecase2query } = require('@herbsjs/herbs2gql')
const customDefaultResolver = require('./custom/customDefaultResolver')

const usecases = [
    require('../../../domain/usecases/carros/consultarMarcasCarro'),
    require('../../../domain/usecases/carros/consultarModelosCarro'),
    require('../../../domain/usecases/carros/consultarAnoModeloCarro'),
    require('../../../domain/usecases/carros/consultarValorModelo'),
]

const queries = usecases.map(usecase => usecase2query(usecase(), customDefaultResolver(usecase)))

module.exports = queries
