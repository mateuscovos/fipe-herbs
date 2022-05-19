import { Alert, Grid, Snackbar } from '@material-ui/core';
import CardAnoModelo from './CardAnoModelo';
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { useApolloClient } from '@apollo/client';
import { CONSULTAR_ANO_MODELO } from '../../infra/services/fipeService';

function AnoModelo() {
    const { codigoMarca, codigoModelo } = useParams()
    const client = useApolloClient()
    const [modelos, setModelos] = useState([])
    const [erroConsulta, setErroConsulta] = useState(false)

    useEffect(() => {
        client.query({
            query: CONSULTAR_ANO_MODELO,
            variables: { 
                codigoMarca: Number(codigoMarca),
                codigoModelo: Number(codigoModelo)
            }
        })
            .then(response => setModelos(response.data.consultaTodosOsAnoModeloDeUmCarro))
            .catch(_ => setErroConsulta(true))
    }, [client, codigoMarca, codigoModelo])

    const navigate = useNavigate()

    return (
        <>
            <Grid
                container
                direction="row"
                justifyContent="left"
                alignItems="center"
            >
                {modelos.map(anoModelo => <CardAnoModelo anoModelo={anoModelo} onClick={() => navigate(`/marcas/${codigoMarca}/modelos/${codigoModelo}/anoModelo/${anoModelo.ano}/preco?codigoCombustivel=${anoModelo.combustivel.codigo}`)} />)}

                <Snackbar open={erroConsulta} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} autoHideDuration={5000} onClose={_ => setErroConsulta(false)}>
                    <Alert onClose={_ => setErroConsulta(false)} severity="error" sx={{ width: '100%' }}>
                        Ocorreu um erro ao carregar o ano modelo
                    </Alert>
                </Snackbar>

            </Grid>
        </>
    );
}

export default AnoModelo;
