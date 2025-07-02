import { Button, Drawer, Menu } from "antd";
import "./Header.css"
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { MenuOutlined } from "@ant-design/icons";

function Header(){
    const location = useLocation()
    const [key, setKey] = useState('1')
    const [visible, setVisible] = useState(false)

    useEffect(()=>{
        const pathToKey = {
            "/": "1",
            "/cadastro": "2",
            "/clima": "3"
        }
        const path = location.pathname
        const key = pathToKey[path] || 1
        setKey(key)
    }, [location.pathname,])

    const menuItems = [
        {key:"1", label: "Página inicial", path: "/"},
        {key:"2", label: "Cadastrar usuário", path: "/cadastro"},
        {key:"3", label: "Clima", path: "/clima"}
    ]

    const renderMenuItems = () =>{
        return menuItems.map((item)=>(
            <Menu.Item key={item.key}>
                <Link to={item.path}>{item.label}</Link>
            </Menu.Item>
        ))
    }

    return(
        <header>
                <Menu
                    className="menu_desktop"
                    mode="horizontal"
                    selectedKeys={key}
                >
                    {renderMenuItems()}
                </Menu>

                <Button icon={<MenuOutlined/>} className="menu_mobile" onClick={()=> setVisible(true)}/>

                <Drawer title="Menu" placement="left" onClose={()=>setVisible(false)} open={visible}>
                    <Menu mode="vertical" onClick={()=>setVisible(false)}>
                        {renderMenuItems()}
                    </Menu>
                </Drawer>
                <img className="logo" src="sol.png" alt="sol" width={70}/>
        </header>
    )
}

export default Header;