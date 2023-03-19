import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
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

  function toogleConfirm(e) {
    // e.target.parentElement.classList.remove('hidden');
    const confirmClassList = e.target.parentElement.parentElement.nextSibling.classList;
    if (confirmClassList.contains('hidden')) {
      confirmClassList.remove('hidden');
    } else {
      confirmClassList.add('hidden');
    }
  }

  function hideConfirm(e) {
    e.target.parentElement.classList.add('hidden');
  }

  async function handleDelete(e, id) {
    try {
      await axios.delete(`/users/${id}`);
      toast.success('Usuário deletada');
      e.target.parentElement.parentElement.remove();
    } catch (error) {
      toast.error('Erro ao deletar usuário');
    }
  }

  return (
    <div className="main-content">
      <div className="content-header">
        <h1>USUÁRIOS</h1>
        <Link to="form/" className="add">Novo Usuário</Link>
      </div>
      {users.map((user) => (
        <div key={user.id} className="item">
          <div className="item-content">
            <div className="item-name">
              {user.name}
            </div>
            <div className="edit-item">
              <Link to={`form/${user.id}`}>Editar</Link>
              <button type="button" onClick={toogleConfirm}>Excluir</button>
            </div>
          </div>
          <div className="confirm-delete hidden">
            Tem certeza que deseja excluir o usuário
            {' '}
            &quot;
            {user.name}
            &quot;
            {' '}
            <button type="button" onClick={(e) => handleDelete(e, user.id)}>Confirmar</button>
            <button type="button" onClick={hideConfirm}>Cancelar</button>
          </div>
        </div>
      ))}
    </div>

  );
}
