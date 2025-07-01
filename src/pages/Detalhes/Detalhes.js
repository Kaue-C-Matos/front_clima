import { Image } from "antd";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Detalhes.css"

function Detalhes(){
    const {id} = useParams()
    const [user, setUser] = useState({})

    const fetchUserData = useCallback(async()=>{
        try{
            const {data} = await axios.get(`http://localhost:3100/user/${id}`)
            setUser(data)
        } catch(error){
            console.log(error)
        }
    }, [id])

    useEffect(()=>{
        fetchUserData()
    }, [fetchUserData])
    return(
        <div className="details">
            <Image src="foto_usuario.png" alt="foto do usuário"/>
            <h1>{user.name}</h1>
            <h2>{user.email}</h2>
        </div>
    )
}

export default Detalhes;