const { entity, field } = require('@herbsjs/gotu')

const Modelo = entity('Modelo', {
    codigo: field(Number),
    nome: field(String)
})

const fromClient = (data) => Modelo.fromJSON({
    codigo: Number(data.Value),
    nome: data.Label
})

module.exports = Modelo
module.exports.fromClient = fromClient