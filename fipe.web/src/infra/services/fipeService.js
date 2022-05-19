import { gql } from '@apollo/client'

export const CONSULTAR_MARCAS = gql`
    query consultaTodasAsMarcasDeCarros {
        consultaTodasAsMarcasDeCarros {
            codigo
            nome
        }
    }
`

export const CONSULTAR_MODELOS = gql`
    query consultaTodosOsModelosDeCarrosDeUmaMarca($codigoMarca: Float) {
        consultaTodosOsModelosDeCarrosDeUmaMarca(codigoMarca: $codigoMarca) {
            codigo
            nome
        }
    }
`

export const CONSULTAR_ANO_MODELO = gql`
    query consultaTodosOsAnoModeloDeUmCarro($codigoMarca: Float, $codigoModelo: Float){
        consultaTodosOsAnoModeloDeUmCarro(codigoMarca: $codigoMarca, codigoModelo: $codigoModelo) {
            ano
            nome
            combustivel {
                codigo
                nome
            }
        }
    }

`


export const CONSULTAR_VALOR_VEICULO = gql`
    query consultaOValorDeUmCarro($anoModelo: Float, $codigoCombustivel: Float, $codigoMarca: Float, $codigoModelo: Float){
        consultaOValorDeUmCarro (anoModelo: $anoModelo, codigoCombustivel: $codigoCombustivel, codigoMarca: $codigoMarca, codigoModelo: $codigoModelo) {
            marca
            anoModelo
            modelo
            preco
            combustivel
            siglaCombustivel
            codigoFipe
            mesReferencia
            dataConsulta
        }
    }

`


