import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { message } from 'antd';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';
import Input from '../../components/Input';

import './styles.css';

function Register() {
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [zip_code, setZip_Code] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    message.loading({
      key: "registering",
      content: "Cadastrando...",
      duration: 9999
    });
    try {
      const response = await api.post('user', {
        name,
        email,
        password,
        cpf,
        zip_code
      });
      console.log(response);
      if (response.status === 201) {
        message.destroy("registering");
        history.push("/login");
        window.location.reload();
        message.success("Usuário cadastrado com sucesso!");
      }
    } catch (error) {
      console.log(error);
      message.destroy("registering");
      message.error("Erro ao efetuar cadastro, tente novamete...");
    }
  }

  return (
    <div className="register-container">
      <a href="/login"><FiArrowLeft /> Voltar</a>

      <h1>Cadastro</h1>

      <form onSubmit={handleSubmit}>
        <Input
          title="Nome"
          id="name"
          type="text"
          masked={false}
          onChange={e => setName(e.target.value)}
          required
        />
        <Input
          title="CPF"
          id="cpf"
          type="text"
          masked={true}
          format="###.###.###-##"
          mask="_"
          onChange={e => setCpf(e.target.value)}
          required
        />
        <Input
          title="CEP"
          id="zipCode"
          type="text"
          masked={true}
          format="#####-###"
          mask="_"
          onChange={e => setZip_Code(e.target.value)}
          required
        />
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
        <button type="submit">Cadastrar</button>
        <a href="/login">Já possuo uma conta</a>
      </form>
    </div>
  );
}

export default Register;