import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@material-ui/core";
import ModeloIcon from "../../assets/carro.jpeg"
import Carregando from "../Carregando";

function CardAnoModelo({ anoModelo, onClick }) {

    return !anoModelo.nome ? <Carregando /> : (
        <div style={{ padding: '10px' }}>
            <Card sx={{ maxWidth: 345, minWidth: 345 }}>
                <CardMedia
                    component="img"
                    alt={`Imagem do modelo ${anoModelo.nome}`}
                    height="140"
                    image={ModeloIcon}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {anoModelo.nome}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={onClick}>Ver preço</Button>
                </CardActions>
            </Card>
        </div>
    );
}

export default CardAnoModelo;
