import { Alert, Grid, Snackbar } from '@material-ui/core';
import CardMarca from './CardMarca';
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { useApolloClient } from '@apollo/client';
import { CONSULTAR_MARCAS } from '../../infra/services/fipeService';

function Marcas() {
  const client = useApolloClient()
  const [marcas, setMarcas] = useState([])
  const [erroConsulta, setErroConsulta] = useState(false)

  useEffect(() => {
    client.query({
      query: CONSULTAR_MARCAS
    })
      .then(response => setMarcas(response.data.consultaTodasAsMarcasDeCarros))
      .catch(_ => setErroConsulta(true))
  }, [client])

  const navigate = useNavigate()

  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="left"
        alignItems="center"
      >
        {marcas.map(marca => <CardMarca marca={marca} onClick={() => navigate(`/marcas/${marca.codigo}/modelos`)} />)}

        <Snackbar open={erroConsulta} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} autoHideDuration={5000} onClose={_ => setErroConsulta(false)}>
          <Alert onClose={_ => setErroConsulta(false)} severity="error" sx={{ width: '100%' }}>
            Ocorreu um erro ao carregar as marcas
          </Alert>
        </Snackbar>

      </Grid>
    </>
  );
}

export default Marcas;
