import { useContext, useState } from "react";
import styled from "styled-components";
import jpLogin from '../../assets/Login.jpg'
import { AuthContext } from "../../contexts/auth";

import "./Login.css";

const BodyLogin = styled.div `
    background: url(${jpLogin});
`

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useContext(AuthContext)

  const handleSubmit = (e) => {
    e.preventDefault()
    login(email, password)
  }

  return (
    <BodyLogin>
        <div className="container">
          <div className="container-login">
            <div className="wrap-login">
              <form className="login-form" onSubmit={handleSubmit}>
                <span className="login-form-title-span">
                  <span>Nome ou icone</span>
                </span>
                <span className="login-form-title"> Bem vindo Parceiro(a) Dream!</span>
                <div className="wrap-input">
                  <input
                    className={email !== "" ? "has-val input" : "input"}
                    name="email"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label className="focus-input" data-placeholder="Email/CNPJ"></label>
                </div>
                <div className="wrap-input">
                  <input
                    className={password !== "" ? "has-val input" : "input"}
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <span className="focus-input" data-placeholder="Password"></span>
                </div>
                <div className="container-login-form-btn">
                  <button className="login-form-btn" type="submit">Login</button>
                </div>
                <div className="text-center">
                  <span className="txt1">Não possui conta? </span>
                  <a className="txt2" href="#">
                    Converse conosco
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
    </BodyLogin>
  );
}

export default Login;