import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { message } from 'antd';
import { FiEdit, FiLogOut, FiX } from 'react-icons/fi';
import api from '../../../services/api';
import { useUser } from '../../../contexts/user';
import { logout } from '../../../services/auth';
import Input from '../../../components/Input';

import './styles.css';

function Profile() {
  const { user, removeUser } = useUser();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [cpf, setCpf] = useState('');
  const [zip_code, setZip_Code] = useState('');

  const [isDisabled, setIsDisabled] = useState(true);

  const history = useHistory();

  useEffect(() => {
    setName(user.name);
    setEmail(user.email);
    setCpf(user.cpf);
    setZip_Code(user.zip_code);
  }, [user]);

  function logoutUser() {
    message.loading({
      key: "loggingOut",
      content: "Saindo...",
      duration: 9999
    });
    logout();
    removeUser();
    message.destroy("loggingOut");
    history.push("/");
    window.location.reload();
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await api.put('user', {
        name,
        email,
        oldPassword,
        password,
        cpf,
        zip_code
      });
      console.log(response);
      if (response.status === 200) {
        console.log('Informações alteradas com sucesso!');
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="profile-container">
      <h2>Perfil</h2>

      <div className="profile-actions">
        {isDisabled ? (
          <button type="button" onClick={() => setIsDisabled(!isDisabled)}>
            <FiEdit /> Editar
          </button>
        ) : (
          <button type="button" onClick={() => setIsDisabled(!isDisabled)}>
            <FiX /> Cancelar
          </button>
        )}
        <button type="button" onClick={logoutUser}><FiLogOut /> Sair</button>
      </div>

      <form onSubmit={handleSubmit}>
        <Input
          title="Nome"
          id="name"
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          disabled={isDisabled}
          required
        />
        <Input
          title="Email"
          id="email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          disabled={isDisabled}
          required
        />
        <div className="double-column">
          <Input
            title="Senha antiga"
            id="oldPassword"
            type="password"
            onChange={e => setOldPassword(e.target.value)}
            disabled={isDisabled}
            required
          />
          <Input
            title="Senha"
            id="password"
            type="password"
            onChange={e => setPassword(e.target.value)}
            disabled={isDisabled}
            required
          />
        </div>
        <div className="double-column">
          <Input
            title="CPF"
            id="cpf"
            type="text"
            value={cpf}
            onChange={e => setCpf(e.target.value)}
            disabled={isDisabled}
            required
          />
          <Input
            title="CEP"
            id="zipCode"
            type="text"
            value={zip_code}
            onChange={e => setZip_Code(e.target.value)}
            disabled={isDisabled}
            required
          />
        </div>
        <button type="submit" disabled={isDisabled}>Confirmar</button>
      </form>
    </div>
  );
}

export default Profile;