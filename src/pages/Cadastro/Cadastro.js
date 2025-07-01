import { Button, Form, Input } from "antd";
import "./Cadastro.css"
import axios from "axios";

function Cadastro(){
    const [form] = Form.useForm();

    const onFinish = async(values) =>{
        try {
            const response = await axios.post("http://localhost:3100/user", values)
            console.log("Usuário cadastrado com sucesso:", response.data)
            form.resetFields();

            alert("Usuário cadastrado com sucesso")
        } catch (error) {
            alert("Erro ao cadastrar usuário", error)
        }
    }

    const onFinishFailed = (error) =>{
        console.log("falha na validação", error)
    }

    return(
        <Form name="user" onFinish={onFinish} onFinishFailed={onFinishFailed} className="formulario">
            <h1>Cadastrar novo usuário</h1>
            <Form.Item 
                name="name" 
                label="Nome completo:"
                layout="vertical"
                rules={[
                    {required: true, message: "Por favor, digite seu nome"}, 
                    {min: 5, message: "O nome deve ter no mínimo 5 caracteres"},
                    {max: 150, message: "O nome deve ter no máximo 150 caracteres"}
                ]}
            >
                <Input/>
            </Form.Item>
            <Form.Item 
                name="email"
                label="Email:"
                layout="vertical"
                rules={[
                    {required: true, message: "Por favor, digite seu email"},
                    {type: "email", message: "Por favor, digite uma email válido"},
                    {max: 200, message: "O nome deve ter no máximo 200 caracteres"}
                ]}
            >
                <Input/>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">Cadastrar</Button>
            </Form.Item>
        </Form>
    )
}

export default Cadastro;