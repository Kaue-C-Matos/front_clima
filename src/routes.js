import { BrowserRouter, Route, Routes } from "react-router-dom";
import Inicio from "./pages/Inicio/Inicio";
import Cadastro from "./pages/Cadastro/Cadastro";
import Header from "./components/Header/Header";
import Detalhes from "./pages/Detalhes/Detalhes";

function AppRoutes(){
    return(
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path="/" element={<Inicio/>}/>
                <Route path="/cadastro" element={<Cadastro/>}/>
                <Route path="/:id" element={<Detalhes/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes