const { entity, field } = require('@herbsjs/herbs')

const MensagemPadrao = entity('MensagemPadrao', {
    sucesso: field(Boolean, { validation: {  presence: true } }),
    mensagem: field(String)
})

const erro = (mensagem) => MensagemPadrao.fromJSON({ sucesso: false, mensagem })

module.exports = MensagemPadrao
module.exports.erro = erro
