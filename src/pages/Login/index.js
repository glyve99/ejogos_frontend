import React, { useState } from 'react';
import { message } from "antd";
import { FiArrowLeft } from 'react-icons/fi';
import api from "../../services/api";
import Input from '../../components/Input';
import {login} from "../../services/auth";

import './styles.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();

    message.loading({
        key: "logging",
        content: "Logando...",
        duration: 9999
    });
    try{
      const response = await api.post('login', {
        email,
        password
      });
      console.log(response);
     
      if (response.status === 200) {
        login(response.data.token);
        //setUser(response.data.user);
        message.destroy("logging");
      }  
    } catch (error){
      console.log(error);
      message.destroy("logging")
    }

  }

  return (
    <div className="login-container">
      <a href="/"><FiArrowLeft /> Voltar</a>

      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <Input
          title="Email"
          type="email"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          title="Senha"
          type="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Entrar</button>
        <a href="/register">Quero criar uma conta</a>
      </form>
    </div>
  );
}

export default Login;