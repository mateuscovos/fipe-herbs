const { usecase, step, Ok, Err } = require('@herbsjs/herbs')
const { ValorVeiculo } = require('../../entities')
const MensagemPadrao = require('../../entities/response/MensagemPadrao')
const TipoVeiculo = require('../../valueObjects/TipoVeiculo')

const dependecy = {
    FipeClient: require('../../../infra/services').FipeClient,
    fipeConfig: require('../../../../config/fipeConfig')
}

const ConsultarValorModelo = injection => usecase('Consulta o valor de um carro', {

    request: {
        codigoMarca: Number,
        codigoModelo: Number,
        codigoCombustivel: Number,
        anoModelo: Number
    },
    response: ValorVeiculo,

    setup: ctx => {
        ctx.di = { ...dependecy, ...injection }
        ctx.data = { tabelaReferencia: {} }
    },

    authorize: async _ => Ok(),

    'Verifica se todos os parâmetros foram informados': step(ctx => {
        if (!ctx.req.codigoMarca)
            return Err(MensagemPadrao.erro('É necessário informar o código da marca'))

        if (!ctx.req.codigoModelo)
            return Err(MensagemPadrao.erro('É necessário informar o código do modelo do veículo'))

        if (!ctx.req.anoModelo)
            return Err(MensagemPadrao.erro('É necessário informar o ano modelo do veículo'))

        if (!ctx.req.codigoCombustivel)
            return Err(MensagemPadrao.erro('É necessário informar o tipo de combustível do veículo'))

        return Ok()
    }),

    'Consulta a tabela de referência mais recente': step(async ctx => {
        const { FipeClient, fipeConfig } = ctx.di

        const client = new FipeClient({ config: fipeConfig })

        const tabelaReferencia = await client.consultarTabelaReferencia()

        if (tabelaReferencia.isErr) return Err(MensagemPadrao.erro('Ocorreu um erro ao consultar a tabela de referência de carro'))

        ctx.data.tabelaReferencia = tabelaReferencia.ok

        return Ok()
    }),

    'Consulta o valor do modelo de carros informado': step(async ctx => {
        const { codigoMarca, codigoModelo, codigoCombustivel, anoModelo } = ctx.req
        const { FipeClient, fipeConfig } = ctx.di
        const { tabelaReferencia } = ctx.data

        const client = new FipeClient({ config: fipeConfig })

        const marcas = await client.consultarValorModelo(codigoModelo, codigoMarca, anoModelo, codigoCombustivel, tabelaReferencia.codigo, TipoVeiculo.CARRO)

        if (marcas.isErr) return Err(MensagemPadrao.erro('Ocorreu um erro ao consultar o valor do modelo'))

        ctx.ret = marcas.ok

        return Ok()
    }),
})

module.exports = ConsultarValorModelo