import React, { useContext, useState } from "react";
import { AuthContext } from "../../contexts/auth";
import './LoginPage.css';


const LoginPage = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const { login } = useContext(AuthContext)

    const handleSubmit = (e)=> {
        e.preventDefault()
        login(email, password)
    }

    return (
        <div className="login">
            <h1 className="titl">Login do sistema</h1>
            <form className="form" onSubmit={handleSubmit}>
                <div className="field">
                    <label htmlFor="email">email</label>
                    <input 
                    type="email" 
                    name="email" 
                    id="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="field">
                    <label htmlFor="senha">senha</label>
                    <input 
                    type="password" 
                    name="senha" 
                    id="senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} 
                    />
                </div>
                <div className="actions">
                    <button type="submit">Entrar</button>
                </div>
            </form>
        </div>
    )
}

export default LoginPage;