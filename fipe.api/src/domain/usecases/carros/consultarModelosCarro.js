const { usecase, step, Ok, Err } = require('@herbsjs/herbs')
const Modelo = require('../../entities/Modelo')
const MensagemPadrao = require('../../entities/response/MensagemPadrao')
const TipoVeiculo = require('../../valueObjects/TipoVeiculo')

const dependecy = {
    FipeClient: require('../../../infra/services').FipeClient,
    fipeConfig: require('../../../../config/fipeConfig')
}

const ConsultarModelosCarro = injection => usecase('Consulta todos os modelos de carros de uma marca', {

    request: { codigoMarca: Number },
    response: [Modelo],

    setup: ctx => {
        ctx.di = { ...dependecy, ...injection }
        ctx.data = { tabelaReferencia: {} }
    },

    authorize: async _ => Ok(),

    'Verifica se todos os parâmetros foram informados': step(ctx => {
        if(!ctx.req.codigoMarca) 
            return Err(MensagemPadrao.erro('É necessário informar o código da marca'))

        return Ok()
    }),

    'Consulta a tabela de referência mais recente': step(async ctx => {
        const { FipeClient, fipeConfig } = ctx.di

        const client = new FipeClient({ config: fipeConfig })

        const tabelaReferencia = await client.consultarTabelaReferencia()
        
        if(tabelaReferencia.isErr) return Err(MensagemPadrao.erro('Ocorreu um erro ao consultar a tabela de referência de carro'))

        ctx.data.tabelaReferencia = tabelaReferencia.ok

        return Ok()
    }),

    'Consulta todos os modelos de carros de uma marca disponível na fipe': step(async ctx => {
        const { codigoMarca } = ctx.req
        const { FipeClient, fipeConfig } = ctx.di
        const { tabelaReferencia } = ctx.data

        const client = new FipeClient({ config: fipeConfig })

        const marcas = await client.consultarModelos(codigoMarca, tabelaReferencia.codigo, TipoVeiculo.CARRO)

        if(marcas.isErr) return Err(MensagemPadrao.erro('Ocorreu um erro ao consultar os modelos de carro'))

        ctx.ret = marcas.ok

        return Ok()
    }),
})

module.exports = ConsultarModelosCarro