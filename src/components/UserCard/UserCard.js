import { Card } from "antd";
import "./UserCard.css"

function UserCard({name, email, onClick}){
    return(
        <Card onClick={onClick}>
            <img className="profile" src="foto_usuario.png" alt="foto do usuário" width={50}/>
            <div className="data">
                <h2>{name}</h2>
                <h3>{email}</h3>
            </div>
        </Card>
    )
}

export default UserCard;