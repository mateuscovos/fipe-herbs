const { Ok, Err } = require('@herbsjs/herbs')
const { Marca, TabelaReferencia, AnoModelo, Combustivel } = require('../../entities')
const consultarAnoModeloCarro = require('./consultarAnoModeloCarro')
const { expect } = require('chai')

describe('ConsultarAnoModeloCarro', () => {

    describe('Sucesso', () => {
        it('Ao executar o caso de uso deve retornar todos os ano modelo', async () => {
            const injection = {
                FipeClient: class {
                    consultarTabelaReferencia() {
                        return Promise.resolve(Ok(TabelaReferencia.fromJSON({ codigo: 285, mes: 'maio/2022' })))
                    }

                    consultarAnoModelo() {
                        return Promise.resolve(Ok([
                            AnoModelo.fromJSON({ ano: 2022, nome: '2022 GASOLINA', combustivel: Combustivel.fromJSON({ codigo: 1, nome: 'GASOLINA' }) }),
                        ]))
                    }
                }
            }

            const parametros = { codigoMarca: 1, codigoModelo: 1 }

            const usecase = consultarAnoModeloCarro(injection)

            await usecase.authorize()

            const response = await usecase.run(parametros)

            expect(response.isOk).to.be.equal(true)
            expect(response.ok).to.have.lengthOf(1)
            expect(response.ok[0]).to.be.instanceOf(AnoModelo)
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

            const parametros = { codigoModelo: 1 }

            const usecase = consultarAnoModeloCarro(injection)

            await usecase.authorize()

            const response = await usecase.run(parametros)

            expect(response.isErr).to.be.equal(true)
            expect(response.err.sucesso).to.have.equal(false)
            expect(response.err.mensagem).to.have.equal('É necessário informar o código da marca')
        })

        it('Ao executar o caso de uso deve retornar erro caso não seja informado o código do modelo', async () => {
            const injection = {
                FipeClient: class {
                    consultarTabelaReferencia() {
                        return Promise.resolve(Err('Erro'))
                    }
                }
            }

            const parametros = { codigoMarca: 1 }

            const usecase = consultarAnoModeloCarro(injection)

            await usecase.authorize()

            const response = await usecase.run(parametros)

            expect(response.isErr).to.be.equal(true)
            expect(response.err.sucesso).to.have.equal(false)
            expect(response.err.mensagem).to.have.equal('É necessário informar o código do modelo do veículo')
        })

        it('Ao executar o caso de uso deve retornar erro caso não seja possível consultar a tabela de referência', async () => {
            const injection = {
                FipeClient: class {
                    consultarTabelaReferencia() {
                        return Promise.resolve(Err('Erro'))
                    }
                }
            }

            const parametros = { codigoMarca: 1, codigoModelo: 1 }

            const usecase = consultarAnoModeloCarro(injection)

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

                    consultarAnoModelo() {
                        return Promise.resolve(Err('Erro'))
                    }
                }
            }

            const parametros = { codigoMarca: 1, codigoModelo: 1 }

            const usecase = consultarAnoModeloCarro(injection)

            await usecase.authorize()

            const response = await usecase.run(parametros)

            expect(response.isErr).to.be.equal(true)
            expect(response.err.sucesso).to.have.equal(false)
            expect(response.err.mensagem).to.have.equal('Ocorreu um erro ao consultar os ano modelo')
        })
    })
})