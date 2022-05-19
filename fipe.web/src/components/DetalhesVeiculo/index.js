import { Alert, Grid, Snackbar } from '@material-ui/core';
import { useLocation, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { useApolloClient } from '@apollo/client';
import { CONSULTAR_VALOR_VEICULO } from '../../infra/services/fipeService';
import Detalhe from './Detalhe';

function AnoModelo() {
    const { codigoMarca, codigoModelo, anoModelo } = useParams()
    const codigoCombustivel = new URLSearchParams(useLocation().search).get('codigoCombustivel');

    const client = useApolloClient()
    const [precoVeiculo, setPrecoVeiculo] = useState([])
    const [erroConsulta, setErroConsulta] = useState(false)

    useEffect(() => {
        client.query({
            query: CONSULTAR_VALOR_VEICULO,
            variables: {
                codigoMarca: Number(codigoMarca),
                codigoModelo: Number(codigoModelo),
                anoModelo: Number(anoModelo),
                codigoCombustivel: Number(codigoCombustivel),
            }
        })
            .then(response => setPrecoVeiculo(response.data.consultaOValorDeUmCarro))
            .catch(_ => setErroConsulta(true))
    }, [client, codigoMarca, codigoModelo, anoModelo, codigoCombustivel])

    return (
        <>
            <Grid
                container
                direction="row"
                justifyContent="left"
                alignItems="center"
            >

                <Detalhe detalhe={precoVeiculo} />

                <Snackbar open={erroConsulta} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} autoHideDuration={5000} onClose={_ => setErroConsulta(false)}>
                    <Alert onClose={_ => setErroConsulta(false)} severity="error" sx={{ width: '100%' }}>
                        Ocorreu um erro ao carregar o valor do modelo
                    </Alert>
                </Snackbar>

            </Grid>
        </>
    );
}

export default AnoModelo;
