const { entity, field } = require('@herbsjs/gotu')

const Combustivel = entity('Combustivel', {
    codigo: field(Number),
    nome: field(String),
})

module.exports = Combustivel