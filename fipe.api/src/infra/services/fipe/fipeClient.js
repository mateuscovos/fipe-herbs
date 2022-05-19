const axios = require('axios')
const FormData = require('form-data');
const { TabelaReferencia, Marca, Modelo, AnoModelo } = require('../../../domain/entities');
const { Err, Ok } = require('@herbsjs/herbs');
const ValorVeiculo = require('../../../domain/entities/ValorVeiculo');

class FipeClient {
    constructor({ config }) {
        const { baseURL } = config
        this.client = axios.create({
            baseURL,
            timeout: 5000,
        });
    }

    consultarTabelaReferencia() {
        return this.client
            .post('veiculos/ConsultarTabelaDeReferencia')
            .then(response => {
                const tabelasReferencia = response.data
                if (!tabelasReferencia.length) return Err('Nenhuma tabela de referência foi encontrada.')

                const tabelaReferenciaMaisRecente = tabelasReferencia.sort((a,b) => a.Codigo - b.Codigo).slice(-1)[0]

                return Ok(TabelaReferencia.fromClient(tabelaReferenciaMaisRecente))
            })
            .catch(error => console.log(error))
    }

    consultarMarcas(codigoTabelaReferencia, tipoVeiculo) {
        const formData = new FormData();
        formData.append("codigoTabelaReferencia", codigoTabelaReferencia);
        formData.append("codigoTipoVeiculo", tipoVeiculo);

        return this.client
            .post('veiculos/ConsultarMarcas', formData, { headers: formData.getHeaders() })
            .then(response => {
                return Ok(response.data.map(marca => Marca.fromClient(marca)))
            })
            .catch(error => Err(error))
    }


    consultarModelos(codigoMarca, codigoTabelaReferencia, tipoVeiculo) {
        const formData = new FormData();
        formData.append("codigoMarca", codigoMarca);
        formData.append("codigoTabelaReferencia", codigoTabelaReferencia);
        formData.append("codigoTipoVeiculo", tipoVeiculo);
        
        return this.client
            .post('veiculos/ConsultarModelos', formData, { headers: formData.getHeaders() })
            .then(response => {
                return Ok(response.data.Modelos.map(modelo => Modelo.fromClient(modelo)))
            })
            .catch(error => Err(error))
    }

    consultarAnoModelo(codigoModeloVeiculo, codigoMarca, codigoTabelaReferencia, tipoVeiculo) {
        const formData = new FormData();
        formData.append("codigoModelo", codigoModeloVeiculo);
        formData.append("codigoMarca", codigoMarca);
        formData.append("codigoTabelaReferencia", codigoTabelaReferencia);
        formData.append("codigoTipoVeiculo", tipoVeiculo);
        
        return this.client
            .post('veiculos/ConsultarAnoModelo', formData, { headers: formData.getHeaders() })
            .then(response => {
                return Ok(response.data.map(anoModelo => AnoModelo.fromClient(anoModelo)))
            })
            .catch(error => Err(error))
    }

    consultarValorModelo(codigoModeloVeiculo, codigoMarca, anoModelo, codigoCombustivel, codigoTabelaReferencia, tipoVeiculo) {
        const formData = new FormData();
        formData.append("codigoTabelaReferencia", codigoTabelaReferencia);
        formData.append("codigoMarca", codigoMarca);
        formData.append("codigoModelo", codigoModeloVeiculo);
        formData.append("codigoTipoVeiculo", tipoVeiculo);
        formData.append("anoModelo", anoModelo);
        formData.append("codigoTipoCombustivel", codigoCombustivel);
        formData.append("tipoConsulta", 'tradicional');
        
        return this.client
            .post('veiculos/ConsultarValorComTodosParametros', formData, { headers: formData.getHeaders() })
            .then(response => Ok(ValorVeiculo.fromClient(response.data)))
            .catch(error => Err(error))
    }
}

module.exports = FipeClient