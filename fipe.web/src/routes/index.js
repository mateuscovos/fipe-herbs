import { BrowserRouter, Route, Routes as Switch } from "react-router-dom";
import history from "./history";

import Marcas from "../pages/Marcas";
import Modelos from "../pages/Modelos";
import AnoModelo from "../pages/AnoModelo";
import NotFound from "../pages/NotFound";
import PrecoVeiculo from "../pages/PrecoVeiculo";

export default function Routes() {
    return (
        <BrowserRouter history={history} basename='/'>
            <Switch>
                <Route path="/" element={<Marcas />} />
                <Route path="/marcas/:codigoMarca/modelos" element={<Modelos />} />
                <Route path="/marcas/:codigoMarca/modelos/:codigoModelo" element={<AnoModelo />} />
                <Route path="/marcas/:codigoMarca/modelos/:codigoModelo/anoModelo/:anoModelo/preco" element={<PrecoVeiculo />} />
                <Route path="*" element={<NotFound />} />
            </Switch>
        </BrowserRouter>
    )
}