import { Box, Container, List, ListItem, ListItemText } from "@material-ui/core"
import Carregando from "../Carregando"

function Detalhe({ detalhe }) {
    return !detalhe.marca ? <Carregando /> : (
        <Box sx={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Container maxWidth="sm" sx={{ background: '#dbdbdb' }}>
                <List sx={{ width: '100%' }}>
                    <ListItem>
                        <ListItemText primary={detalhe.marca} secondary='Marca' />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary={detalhe.modelo} secondary='Modelo' />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary={detalhe.anoModelo} secondary='Ano Modelo' />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary={`R$ ${detalhe.preco.toFixed(2)}`} secondary='Preço' />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary={`${detalhe.combustivel}`} secondary='Combustível' />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary={`${detalhe.siglaCombustivel}`} secondary='Sigla Combustível' />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary={`${detalhe.codigoFipe}`} secondary='Código FIPE' />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary={`${detalhe.mesReferencia}`} secondary='Mês Referência' />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary={`${detalhe.dataConsulta}`} secondary='Data Consulta' />
                    </ListItem>
                </List>
            </Container>
        </Box>
    )
}

export default Detalhe