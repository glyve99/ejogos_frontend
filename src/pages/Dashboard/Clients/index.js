import React, { useEffect, useState } from 'react';

import api from '../../../services/api';

function Clients() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function getUsers() {
      try {
        const response = await api.get('users');
        if (response.status === 200) {
          setUsers(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    }

    getUsers();
  }, []);

  return (
    users.lenght === 0 ? (
      <p>Nenhum usuário cadastrado :(</p>
    ) : (
      users.map(user => (
        <h1 key={user.id}>{user.name}</h1>
      ))
    )
  );
}

export default Clients;

