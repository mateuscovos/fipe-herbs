import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@material-ui/core";
import ModeloIcon from "../../assets/carro.jpeg"
import Carregando from "../Carregando";

function CardModelo({ modelo, onClick }) {

    return !modelo.nome ? <Carregando /> : (
        <div style={{ padding: '10px' }}>
            <Card sx={{ maxWidth: 345, minWidth: 345 }}>
                <CardMedia
                    component="img"
                    alt={`Imagem do modelo ${modelo.nome}`}
                    height="140"
                    image={ModeloIcon}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {modelo.nome}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={onClick}>Ver ano modelo</Button>
                </CardActions>
            </Card>
        </div>
    );
}

export default CardModelo;
