const { entity, field } = require('@herbsjs/gotu')

const TabelaReferencia = entity('TabelaReferencia', {
    codigo: field(Number),
    mes: field(String)
})

const fromClient = (data) => TabelaReferencia.fromJSON({
    codigo: Number(data.Codigo),
    mes: data.Mes
})

module.exports = TabelaReferencia
module.exports.fromClient = fromClient