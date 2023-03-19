import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../../services/axios';

export default function Index() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    async function getData() {
      const { data } = await axios.get('/users/');
      setUsers(data);
    }

    getData();
  }, []);
  return (
    <div className="main-content">
      <div className="content-header">
        <h1>USUÁRIOS</h1>
        <Link to="form/" className="add">Novo Usuário</Link>
      </div>
      {users.map((user) => (
        <div key={user.id} className="item">
          <div className="item-name">
            {user.name}
          </div>
          <div className="edit-item">
            <Link to={`edit/${user.id}`}>Editar</Link>
            <Link to={`delete/${user.id}`}>Excluir</Link>
          </div>
        </div>
      ))}
    </div>
  );
}
