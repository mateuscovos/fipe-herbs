const { Ok, Err } = require('@herbsjs/herbs')
const { TabelaReferencia, ValorVeiculo } = require('../../entities')
const consultarValorModelo = require('./consultarValorModelo')
const { expect } = require('chai')

describe('ConsultarValorModelo', () => {

    describe('Sucesso', () => {
        it('Ao executar o caso de uso deve retornar todos os ano modelo', async () => {
            const injection = {
                FipeClient: class {
                    consultarTabelaReferencia() {
                        return Promise.resolve(Ok(TabelaReferencia.fromJSON({ codigo: 285, mes: 'maio/2022' })))
                    }

                    consultarValorModelo() {
                        return Promise.resolve(Ok([
                            ValorVeiculo.fromJSON({
                                marca: "MARCA ABC",
                                anoModelo: 2022,
                                modelo: "MODELO 123",
                                preco: 35000,
                                combustivel: "Gasolina",
                                siglaCombustivel: "G",
                                codigoFipe: "000001-0",
                                mesReferencia: "maio de 2022",
                                dataConsulta: "quarta-feira, 17 de maio de 2022 18:00"
                            }),
                        ]))
                    }
                }
            }

            const parametros = { codigoMarca: 1, codigoModelo: 1, codigoCombustivel: 1, anoModelo: 2022 }

            const usecase = consultarValorModelo(injection)

            await usecase.authorize()

            const response = await usecase.run(parametros)

            expect(response.isOk).to.be.equal(true)
            expect(response.ok).to.have.lengthOf(1)
            expect(response.ok[0]).to.be.instanceOf(ValorVeiculo)
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

            const parametros = { }

            const usecase = consultarValorModelo(injection)

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

            const parametros = { codigoMarca: 1, codigoCombustivel: 1, anoModelo: 2022 }

            const usecase = consultarValorModelo(injection)

            await usecase.authorize()

            const response = await usecase.run(parametros)

            expect(response.isErr).to.be.equal(true)
            expect(response.err.sucesso).to.have.equal(false)
            expect(response.err.mensagem).to.have.equal('É necessário informar o código do modelo do veículo')
        })

        it('Ao executar o caso de uso deve retornar erro caso não seja informado o tipo de combustível', async () => {
            const injection = {
                FipeClient: class {
                    consultarTabelaReferencia() {
                        return Promise.resolve(Err('Erro'))
                    }
                }
            }

            const parametros = { codigoMarca: 1, codigoModelo: 1, anoModelo: 2022 }

            const usecase = consultarValorModelo(injection)

            await usecase.authorize()

            const response = await usecase.run(parametros)

            expect(response.isErr).to.be.equal(true)
            expect(response.err.sucesso).to.have.equal(false)
            expect(response.err.mensagem).to.have.equal('É necessário informar o tipo de combustível do veículo')
        })

        it('Ao executar o caso de uso deve retornar erro caso não seja informado o ano modelo', async () => {
            const injection = {
                FipeClient: class {
                    consultarTabelaReferencia() {
                        return Promise.resolve(Err('Erro'))
                    }
                }
            }

            const parametros = { codigoMarca: 1, codigoModelo: 1, codigoCombustivel: 1 }

            const usecase = consultarValorModelo(injection)

            await usecase.authorize()

            const response = await usecase.run(parametros)

            expect(response.isErr).to.be.equal(true)
            expect(response.err.sucesso).to.have.equal(false)
            expect(response.err.mensagem).to.have.equal('É necessário informar o ano modelo do veículo')
        })

        it('Ao executar o caso de uso deve retornar erro caso não seja possível consultar a tabela de referência', async () => {
            const injection = {
                FipeClient: class {
                    consultarTabelaReferencia() {
                        return Promise.resolve(Err('Erro'))
                    }
                }
            }

            const parametros = { codigoMarca: 1, codigoModelo: 1, codigoCombustivel: 1, anoModelo: 2022 }

            const usecase = consultarValorModelo(injection)

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

                    consultarValorModelo() {
                        return Promise.resolve(Err('Erro'))
                    }
                }
            }

            const parametros = { codigoMarca: 1, codigoModelo: 1, codigoCombustivel: 1, anoModelo: 2022 }

            const usecase = consultarValorModelo(injection)

            await usecase.authorize()

            const response = await usecase.run(parametros)

            expect(response.isErr).to.be.equal(true)
            expect(response.err.sucesso).to.have.equal(false)
            expect(response.err.mensagem).to.have.equal('Ocorreu um erro ao consultar o valor do modelo')
        })
    })
})