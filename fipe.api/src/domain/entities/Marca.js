const { entity, field } = require('@herbsjs/gotu')

const Marca = entity('Marca', {
    codigo: field(Number),
    nome: field(String)
})

const fromClient = (data) => Marca.fromJSON({
    codigo: Number(data.Value),
    nome: data.Label
})

module.exports = Marca
module.exports.fromClient = fromClient