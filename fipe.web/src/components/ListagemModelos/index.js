import { Alert, Grid, Snackbar } from '@material-ui/core';
import CardModelo from './CardModelo';
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { useApolloClient } from '@apollo/client';
import { CONSULTAR_MODELOS } from '../../infra/services/fipeService';

function Modelo() {
    const { codigoMarca } = useParams()
    const client = useApolloClient()
    const [modelos, setModelos] = useState([])
    const [erroConsulta, setErroConsulta] = useState(false)

    useEffect(() => {
        client.query({
            query: CONSULTAR_MODELOS,
            variables: { codigoMarca: Number(codigoMarca) }
        })
            .then(response => setModelos(response.data.consultaTodosOsModelosDeCarrosDeUmaMarca))
            .catch(_ => setErroConsulta(true))
    }, [client, codigoMarca])

    const navigate = useNavigate()

    return (
        <>
            <Grid
                container
                direction="row"
                justifyContent="left"
                alignItems="center"
            >
                {modelos.map(modelo => <CardModelo modelo={modelo} onClick={() => navigate(`/marcas/${codigoMarca}/modelos/${modelo.codigo}`)} />)}

                <Snackbar open={erroConsulta} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} autoHideDuration={5000} onClose={_ => setErroConsulta(false)}>
                    <Alert onClose={_ => setErroConsulta(false)} severity="error" sx={{ width: '100%' }}>
                        Ocorreu um erro ao carregar os modelos
                    </Alert>
                </Snackbar>

            </Grid>
        </>
    );
}

export default Modelo;
