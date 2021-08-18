import React, { useState } from 'react';

import { FiArrowLeft } from 'react-icons/fi';
import Input from '../../components/Input';

import './styles.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="login-container">
      <a href="/"><FiArrowLeft /> Voltar</a>

      <h1>Login</h1>

      <form>
        <Input
          title="Email"
          type="email"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          title="Senha"
          type="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Entrar</button>
        <a href="/register">Quero criar uma conta</a>
      </form>
    </div>
  );
}

export default Login;