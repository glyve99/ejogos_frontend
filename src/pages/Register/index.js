import React, { useState } from 'react';

import { FiArrowLeft } from 'react-icons/fi';
import Input from '../../components/Input';

import './styles.css';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="register-container">
      <a href="/"><FiArrowLeft /> Voltar</a>

      <h1>Cadastro</h1>

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
        <button type="submit">Cadastrar</button>
        <a href="/login">Já possuo uma conta</a>
      </form>
    </div>
  );
}

export default Register;