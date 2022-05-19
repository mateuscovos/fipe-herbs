const { entity, field } = require('@herbsjs/gotu')
const TipoCombustivelDict = require('../dictionaries/TipoCombustivelDict')
const Combustivel = require('./Combustivel')

const AnoModelo = entity('AnoModelo', {
    ano: field(Number),
    nome: field(String),
    combustivel: field(Combustivel)
})

const fromClient = (data) => {
    const [ano, tipoCombustivel] = data.Value.split('-')
    return AnoModelo.fromJSON({
        ano: Number(ano),
        nome: data.Label,
        combustivel: Combustivel.fromJSON({ codigo: Number(tipoCombustivel), nome: TipoCombustivelDict[tipoCombustivel] })
    })
}

module.exports = AnoModelo
module.exports.fromClient = fromClient