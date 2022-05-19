const { Ok, Err } = require('@herbsjs/herbs')
const { Marca, TabelaReferencia } = require('../../entities')
const consultarMarcasCarro = require('./consultarMarcasCarro')
const { expect } = require('chai')

describe('ConsultarMarcasCarro', () => {

    describe('Sucesso', () => {
        it('Ao executar o caso de uso deve retornar todas as marcas de carro', async () => {
            const injection = {
                FipeClient: class {
                    consultarTabelaReferencia() {
                        return Promise.resolve(Ok(TabelaReferencia.fromJSON({ codigo: 285, mes: 'maio/2022' })))
                    }

                    consultarMarcas() {
                        return Promise.resolve(Ok([
                            Marca.fromJSON({ codigo: 1, nome: 'Montadora ABC' }),
                            Marca.fromJSON({ codigo: 2, nome: 'Montadora XYZ' }),
                            Marca.fromJSON({ codigo: 3, nome: 'Montadora 123' }),
                        ]))
                    }
                }
            }

            const parametros = {}

            const usecase = consultarMarcasCarro(injection)

            await usecase.authorize()

            const response = await usecase.run(parametros)

            expect(response.isOk).to.be.equal(true)
            expect(response.ok).to.have.lengthOf(3)
            expect(response.ok[0]).to.be.instanceOf(Marca)
            expect(response.ok[0].isValid()).to.be.equal(true)
        })
    })

    describe('Falha', () => {
        it('Ao executar o caso de uso deve retornar erro caso não seja possível consultar a tabela de referência', async () => {
            const injection = {
                FipeClient: class {
                    consultarTabelaReferencia() {
                        return Promise.resolve(Err('Erro'))
                    }
                }
            }

            const parametros = {}

            const usecase = consultarMarcasCarro(injection)

            await usecase.authorize()

            const response = await usecase.run(parametros)

            expect(response.isErr).to.be.equal(true)
            expect(response.err.sucesso).to.have.equal(false)
            expect(response.err.mensagem).to.have.equal('Ocorreu um erro ao consultar a tabela de referência de carro')
        })

        it('Ao executar o caso de uso deve retornar erro caso não seja possível consultar as marcas', async () => {
            const injection = {
                FipeClient: class {
                    consultarTabelaReferencia() {
                        return Promise.resolve(Ok
                            (TabelaReferencia.fromJSON({ codigo: 285, mes: 'maio/2022' })))
                    }

                    consultarMarcas() {
                        return Promise.resolve(Err('Erro'))
                    }
                }
            }

            const parametros = {}

            const usecase = consultarMarcasCarro(injection)

            await usecase.authorize()

            const response = await usecase.run(parametros)

            expect(response.isErr).to.be.equal(true)
            expect(response.err.sucesso).to.have.equal(false)
            expect(response.err.mensagem).to.have.equal('Ocorreu um erro ao consultar as marcas de carro')
        })
    })
})