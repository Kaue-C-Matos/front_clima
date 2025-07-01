import { BrowserRouter, Route, Routes } from "react-router-dom";
import Inicio from "./pages/Inicio/Inicio";
import Cadastro from "./pages/Cadastro/Cadastro";

function AppRoutes(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Inicio/>}/>
                <Route path="/cadastro" element={<Cadastro/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes