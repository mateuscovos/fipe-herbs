import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@material-ui/core";
import MarcasIcon from "../../assets/marcas.jpg"
import Carregando from "../Carregando";

function CardMarca({ marca, onClick }) {
    return !marca.nome ? <Carregando /> : (
        <div style={{ padding: '10px' }}>
            <Card sx={{ maxWidth: 345, minWidth: 345 }}>
                <CardMedia
                    component="img"
                    alt={`Logo da ${marca.nome}`}
                    height="140"
                    image={MarcasIcon}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {marca.nome}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={onClick}>Ver modelos</Button>
                </CardActions>
            </Card>
        </div>
    );
    
}

export default CardMarca;
