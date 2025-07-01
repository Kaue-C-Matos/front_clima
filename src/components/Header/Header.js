import { Menu } from "antd";
import "./Header.css"
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

function Header(){
    const location = useLocation()
    const [key, setKey] = useState('1')

    useEffect(()=>{
        const pathToKey = {
            "/": "1",
            "/cadastro": "2"
        }
        const path = location.pathname
        const key = pathToKey[path] || 1
        setKey(key)
    }, [location.pathname,])

    return(
        <header>
                <Menu
                    mode="horizontal"
                    selectedKeys={key}
                >
                    <Menu.Item key="1">
                        <Link to="/">Página inicial</Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Link to="/cadastro">Cadastrar usuário</Link>
                    </Menu.Item>
                </Menu>
                <img className="logo" src="sol.png" alt="sol" width={70}/>
        </header>
    )
}

export default Header;