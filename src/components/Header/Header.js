import { Layout, Menu } from "antd";
import styles from "./Header.css"


function Header(){
    return(
        <header>
                <Menu
                    mode="horizontal"
                    defaultSelectedKeys={'1'}
                >
                    <Menu.Item key="1">Página inicial</Menu.Item>
                    <Menu.Item key="2">Cadastrar usuário</Menu.Item>
                </Menu>
                <img src="sol.png" alt="sol" width={50}/>
        </header>
    )
}

export default Header;