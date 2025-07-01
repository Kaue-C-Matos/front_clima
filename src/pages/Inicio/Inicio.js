import { Input, Pagination } from "antd";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import UserCard from "../../components/UserCard/UserCard";
import "./Inicio.css"
import { useNavigate } from "react-router-dom";

function Inicio(){
    const [userData, setUserData] = useState([])
    const [page, setPage] = useState(1)
    const itemsPerPage = 15
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [total, setTotal] = useState()

    const navigate = useNavigate()

    const fetchUserData = useCallback(async() =>{
        try{
            const {data} = await axios.get("http://localhost:3100/user", {
                params:{
                    name: name,
                    email: email,
                    page: page,
                    limit: itemsPerPage
                }
            })
            setUserData(data.users)
            setTotal(data.total)
        }
        catch(error){
            console.log(error)
        }
    }, [page, name, email])

    useEffect(()=>{
        fetchUserData()
    }, [fetchUserData])

    return(
        <div>
            <session className="search">
                <div>
                    <h3>Pesquise por nome</h3>
                    <Input
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                    />
                </div>
                <div>
                    <h3>Pesquise por e-mail</h3>
                    <Input 
                        value={email}
                        onChange={(e)=> setEmail(e.target.value)}
                    />
                </div>
            </session>
            <ul className="list">
                {userData.map((user)=>(
                    <UserCard key={user.id} name={user.name} email={user.email} onClick={()=>navigate(`/${user.id}`)}/>
                ))}
            </ul>
            <Pagination
                align="center" 
                defaultCurrent={1} 
                total={total}
                onChange={(e)=>setPage(e)} 
                showSizeChanger={false}
                current={page}
                pageSize={itemsPerPage}
                showQuickJumper
            />
        </div>
    )
}

export default Inicio;