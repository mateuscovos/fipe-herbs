const { entity, field } = require('@herbsjs/gotu')

const ValorVeiculo = entity('ValorVeiculo', {
    marca: field(String),
    modelo: field(String),
    anoModelo: field(Number),
    combustivel: field(String),
    siglaCombustivel: field(String),
    codigoFipe: field(String),
    mesReferencia: field(String),
    preco: field(Number),
    dataConsulta: field(String),
})

const fromClient = (data) => {
    return ValorVeiculo.fromJSON({
        marca: data.Marca,
        modelo: data.Modelo,
        anoModelo: Number(data.AnoModelo),
        combustivel: data.Combustivel,
        siglaCombustivel: data.SiglaCombustivel,
        codigoFipe: data.CodigoFipe,
        mesReferencia: data.MesReferencia,
        preco: Number(data.Valor.replace('R$ ', '').replace('.', '').replace(',', '.')),
        dataConsulta: data.DataConsulta
    })
}

module.exports = ValorVeiculo
module.exports.fromClient = fromClient