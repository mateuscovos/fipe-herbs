const { usecase, step, Ok, Err } = require('@herbsjs/herbs')
const Marca = require('../../entities/Marca')
const MensagemPadrao = require('../../entities/response/MensagemPadrao')
const TipoVeiculo = require('../../valueObjects/TipoVeiculo')

const dependecy = {
    FipeClient: require('../../../infra/services/').FipeClient,
    fipeConfig: require('../../../../config/fipeConfig')
}

const ConsultarMarcasCarro = injection => usecase('Consulta todas as marcas de carros', {

    request: {},
    response: [Marca],

    setup: ctx => {
        ctx.di = { ...dependecy, ...injection }
        ctx.data = { tabelaReferencia: {} }
    },

    authorize: async _ => Ok(),

    'Consulta a tabela de referência mais recente': step(async ctx => {
        const { FipeClient, fipeConfig } = ctx.di

        const client = new FipeClient({ config: fipeConfig })

        const tabelaReferencia = await client.consultarTabelaReferencia()
        
        if(tabelaReferencia.isErr) return Err(MensagemPadrao.erro('Ocorreu um erro ao consultar a tabela de referência de carro'))

        ctx.data.tabelaReferencia = tabelaReferencia.ok

        return Ok()
    }),

    'Consulta todas as marcas de carros disponível na fipe': step(async ctx => {
        const { FipeClient, fipeConfig } = ctx.di
        const { tabelaReferencia } = ctx.data

        const client = new FipeClient({ config: fipeConfig })

        const marcas = await client.consultarMarcas(tabelaReferencia.codigo, TipoVeiculo.CARRO)

        if(marcas.isErr) return Err(MensagemPadrao.erro('Ocorreu um erro ao consultar as marcas de carro'))

        ctx.ret = marcas.ok

        return Ok()
    }),
})

module.exports = ConsultarMarcasCarro