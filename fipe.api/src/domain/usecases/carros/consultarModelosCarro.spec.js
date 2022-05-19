const { Ok, Err } = require('@herbsjs/herbs')
const { TabelaReferencia, Modelo } = require('../../entities')
const consultarModelosCarro = require('./consultarModelosCarro')
const { expect } = require('chai')

describe('ConsultarModelosCarro', () => {

    describe('Sucesso', () => {
        it('Ao executar o caso de uso deve retornar todos os modelos de carro', async () => {
            const injection = {
                FipeClient: class {
                    consultarTabelaReferencia() {
                        return Promise.resolve(Ok(TabelaReferencia.fromJSON({ codigo: 285, mes: 'maio/2022' })))
                    }

                    consultarModelos() {
                        return Promise.resolve(Ok([
                            Modelo.fromJSON({ codigo: 1, nome: 'CARRO ABC' }),
                            Modelo.fromJSON({ codigo: 2, nome: 'CARRO 123' }),
                        ]))
                    }
                }
            }

            const parametros = { codigoMarca: 1 }

            const usecase = consultarModelosCarro(injection)

            await usecase.authorize()

            const response = await usecase.run(parametros)

            expect(response.isOk).to.be.equal(true)
            expect(response.ok).to.have.lengthOf(2)
            expect(response.ok[0]).to.be.instanceOf(Modelo)
            expect(response.ok[0].isValid()).to.be.equal(true)
        })
    })

    describe('Falha', () => {
        it('Ao executar o caso de uso deve retornar erro caso não seja informado o código da marca', async () => {
            const injection = {
                FipeClient: class {
                    consultarTabelaReferencia() {
                        return Promise.resolve(Err('Erro'))
                    }
                }
            }

            const parametros = {}

            const usecase = consultarModelosCarro(injection)

            await usecase.authorize()

            const response = await usecase.run(parametros)

            expect(response.isErr).to.be.equal(true)
            expect(response.err.sucesso).to.have.equal(false)
            expect(response.err.mensagem).to.have.equal('É necessário informar o código da marca')
        })

        it('Ao executar o caso de uso deve retornar erro caso não seja possível consultar a tabela de referência', async () => {
            const injection = {
                FipeClient: class {
                    consultarTabelaReferencia() {
                        return Promise.resolve(Err('Erro'))
                    }
                }
            }

            const parametros = { codigoMarca: 1 }

            const usecase = consultarModelosCarro(injection)

            await usecase.authorize()

            const response = await usecase.run(parametros)

            expect(response.isErr).to.be.equal(true)
            expect(response.err.sucesso).to.have.equal(false)
            expect(response.err.mensagem).to.have.equal('Ocorreu um erro ao consultar a tabela de referência de carro')
        })

        it('Ao executar o caso de uso deve retornar erro caso não seja possível consultar os ano modelo', async () => {
            const injection = {
                FipeClient: class {
                    consultarTabelaReferencia() {
                        return Promise.resolve(Ok
                            (TabelaReferencia.fromJSON({ codigo: 285, mes: 'maio/2022' })))
                    }

                    consultarModelos() {
                        return Promise.resolve(Err('Erro'))
                    }
                }
            }

            const parametros = { codigoMarca: 1 }

            const usecase = consultarModelosCarro(injection)

            await usecase.authorize()

            const response = await usecase.run(parametros)

            expect(response.isErr).to.be.equal(true)
            expect(response.err.sucesso).to.have.equal(false)
            expect(response.err.mensagem).to.have.equal('Ocorreu um erro ao consultar os modelos de carro')
        })
    })
})